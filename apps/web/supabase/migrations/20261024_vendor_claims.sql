-- Apply before deploying the free-claim pages. Existing paid benefits are preserved.
ALTER TABLE public.vendors ADD COLUMN IF NOT EXISTS ownership_verified_at timestamptz;

CREATE TABLE IF NOT EXISTS public.vendor_claim_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id uuid NOT NULL REFERENCES public.vendors(id),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  evidence text NOT NULL CHECK (length(trim(evidence)) BETWEEN 20 AND 2000),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  review_note text,
  UNIQUE (vendor_id, user_id)
);
CREATE UNIQUE INDEX IF NOT EXISTS one_pending_vendor_claim_per_user
  ON public.vendor_claim_requests(user_id) WHERE status = 'pending';
ALTER TABLE public.vendor_claim_requests ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.vendor_claim_requests FROM anon, authenticated;
GRANT SELECT ON public.vendor_claim_requests TO authenticated;
GRANT ALL ON public.vendor_claim_requests TO service_role;
DROP POLICY IF EXISTS "Read own vendor claims" ON public.vendor_claim_requests;
CREATE POLICY "Read own vendor claims" ON public.vendor_claim_requests
  FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.request_vendor_claim(
  p_vendor_id uuid, p_user_id uuid, p_evidence text
) RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
  v_owner uuid;
  v_claim public.vendor_claim_requests%ROWTYPE;
  v_id uuid;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtextextended(p_user_id::text, 0));
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = p_user_id AND email_confirmed_at IS NOT NULL) THEN
    RAISE EXCEPTION 'Confirm your email before requesting a listing.';
  END IF;
  IF p_evidence IS NULL OR length(trim(p_evidence)) NOT BETWEEN 20 AND 2000 THEN
    RAISE EXCEPTION 'Provide 20–2,000 characters of ownership details.';
  END IF;
  SELECT user_id INTO v_owner FROM public.vendors WHERE id = p_vendor_id FOR UPDATE;
  IF NOT FOUND THEN RAISE EXCEPTION 'This listing is unavailable.'; END IF;
  IF v_owner IS NOT NULL THEN RAISE EXCEPTION 'This listing already has an account manager.'; END IF;
  IF EXISTS (SELECT 1 FROM public.vendors WHERE user_id = p_user_id) THEN
    RAISE EXCEPTION 'You already manage a listing. Contact support to manage another business.';
  END IF;
  SELECT * INTO v_claim FROM public.vendor_claim_requests
    WHERE vendor_id = p_vendor_id AND user_id = p_user_id;
  IF FOUND THEN
    IF v_claim.status = 'pending' THEN RETURN v_claim.id; END IF;
    RAISE EXCEPTION 'This claim has already been reviewed. Contact support if you need help.';
  END IF;
  IF EXISTS (SELECT 1 FROM public.vendor_claim_requests WHERE user_id = p_user_id AND status = 'pending') THEN
    RAISE EXCEPTION 'You already have a listing claim awaiting review.';
  END IF;
  INSERT INTO public.vendor_claim_requests(vendor_id, user_id, evidence)
    VALUES (p_vendor_id, p_user_id, trim(p_evidence)) RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;
REVOKE ALL ON FUNCTION public.request_vendor_claim(uuid, uuid, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.request_vendor_claim(uuid, uuid, text) TO service_role;

-- Operator-only approval. Review ownership through an independently located
-- business contact before invoking. Email confirmation alone is insufficient.
CREATE OR REPLACE FUNCTION public.review_vendor_claim(
  p_claim_id uuid, p_approve boolean, p_note text
) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
  v_claim public.vendor_claim_requests%ROWTYPE;
  v_owner uuid;
  v_email text;
BEGIN
  IF p_approve IS NULL OR p_note IS NULL OR length(trim(p_note)) < 10 THEN
    RAISE EXCEPTION 'Record the review decision and ownership evidence.';
  END IF;
  SELECT * INTO v_claim FROM public.vendor_claim_requests WHERE id = p_claim_id;
  IF NOT FOUND THEN RAISE EXCEPTION 'Claim not found.'; END IF;
  PERFORM pg_advisory_xact_lock(hashtextextended(v_claim.user_id::text, 0));
  SELECT user_id INTO v_owner FROM public.vendors WHERE id = v_claim.vendor_id FOR UPDATE;
  SELECT * INTO v_claim FROM public.vendor_claim_requests WHERE id = p_claim_id FOR UPDATE;
  IF v_claim.status <> 'pending' THEN RAISE EXCEPTION 'Claim already reviewed.'; END IF;
  IF p_approve THEN
    IF v_owner IS NOT NULL THEN RAISE EXCEPTION 'Listing already managed; do not overwrite ownership.'; END IF;
    IF EXISTS (SELECT 1 FROM public.vendors WHERE user_id = v_claim.user_id) THEN
      RAISE EXCEPTION 'This account already manages another listing.';
    END IF;
    SELECT email INTO v_email FROM auth.users WHERE id = v_claim.user_id AND email_confirmed_at IS NOT NULL;
    IF v_email IS NULL THEN RAISE EXCEPTION 'Confirmed email required.'; END IF;
    -- Legacy dashboard queries use contact_email. Align it with the approved
    -- account; the reviewer must confirm this contact update with the owner.
    UPDATE public.vendors SET user_id = v_claim.user_id, contact_email = v_email,
      ownership_verified_at = now() WHERE id = v_claim.vendor_id;
    UPDATE public.vendor_claim_requests SET status = 'rejected', reviewed_at = now(),
      review_note = 'Another ownership claim was approved.'
      WHERE vendor_id = v_claim.vendor_id AND id <> p_claim_id AND status = 'pending';
  END IF;
  UPDATE public.vendor_claim_requests
    SET status = CASE WHEN p_approve THEN 'approved' ELSE 'rejected' END,
        reviewed_at = now(), review_note = trim(p_note)
    WHERE id = p_claim_id;
END;
$$;
REVOKE ALL ON FUNCTION public.review_vendor_claim(uuid, boolean, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.review_vendor_claim(uuid, boolean, text) TO service_role;

-- Neither a claim nor a membership payment establishes biological authenticity.
COMMENT ON COLUMN public.vendors.ownership_verified_at IS
  'Operator-reviewed control of the business listing; not plant or genetic authentication.';

-- Existing vendor self-edit policies must not permit self-certification or transfers.
CREATE OR REPLACE FUNCTION public.protect_vendor_ownership()
RETURNS trigger LANGUAGE plpgsql SET search_path = '' AS $$
BEGIN
  IF current_user IN ('anon', 'authenticated') THEN
    IF TG_OP = 'INSERT' THEN
      IF NEW.ownership_verified_at IS NOT NULL OR NEW.user_id IS DISTINCT FROM auth.uid() THEN
        RAISE EXCEPTION 'Ownership must be assigned through the claim review.';
      END IF;
    ELSIF NEW.ownership_verified_at IS DISTINCT FROM OLD.ownership_verified_at
       OR NEW.user_id IS DISTINCT FROM OLD.user_id THEN
      RAISE EXCEPTION 'Ownership must be changed through the claim review.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
DROP TRIGGER IF EXISTS protect_vendor_ownership ON public.vendors;
CREATE TRIGGER protect_vendor_ownership BEFORE INSERT OR UPDATE ON public.vendors
  FOR EACH ROW EXECUTE FUNCTION public.protect_vendor_ownership();
