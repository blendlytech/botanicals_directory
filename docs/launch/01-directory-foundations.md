# Directory foundations and Stripe rollout
Date: 2026-10-24
Status: first implementation slice, review branch; not deployed.

## Current direction
A free, accurate vendor directory leads into a focused expo reservation pilot.
Test Vendor Pro at $24.99/month or $249/year after one event. Collector participation
is planned to be free during the pilot. Deposits are credited to the seller's plant
price. Organizer compensation comes from RPV revenue, not customer deposits.
CultivarID remains a separate nursery provenance-record pilot, without genetic
authentication or regulatory-document replacement promises.

This direction supersedes the older marketing recommendations in the V2 blueprint,
outreach dossier, implementation_plan.md and TODO.md. Those files remain historical
context. Existing customer contracts and paid benefits must be reconciled individually.

## Delivered in this slice
- Free email sign-in and ownership-review request, replacing the paid claim pitch.
- Durable claim queue, owner-read-only permissions, trusted review functions,
  duplicate-request protection, and safe ownership assignment.
- New ownership-reviewed timestamp, independent of membership or legacy is_verified.
- Payment no longer sets is_verified.
- Random profile views removed; unimplemented shipping selector hidden.
- Main vendor/collector pricing pages describe the upcoming pilot instead of selling
  the unimplemented recurring offer. Existing account access is retained.
- Vendor sales page no longer advertises lifetime scarcity or unsupported testimonials.
- Public profile hardcoded endorsements/lab/genetic/identity claims removed.
- Auth callback retains safe local return paths, including claim and password-reset pages.

## Scope limits
This is not a Stripe implementation or a complete transaction security remediation.
Legacy onboarding, old direct checkout URLs, PayPal payment APIs, and existing
premium reservation access remain. The new public pricing pages do not link into
new paid checkout. Do not announce a full payment cutover from this commit.
Other historical product/marketing routes need a final copy sweep before broad launch.
There is no claim-review dashboard yet: use the operator procedure below.

## Deploy prerequisites and verification
1. Apply apps/web/supabase/migrations/20261024_vendor_claims.sql in staging first.
   New directory queries depend on ownership_verified_at; deploy database before app.
2. Configure Supabase email delivery and redirect allowlist for the staging and
   production /auth/callback URLs. Exercise email link creation and redemption
   in the same browser. Do not claim mail delivery works without this test.
3. Test free claim, repeated submit, rejected claim, another account claiming an
   owned listing, and two reviewers racing to approve different claims.
4. As authenticated/anon roles, verify direct claim INSERT/UPDATE/DELETE and
   request/review function execution are denied. Verify changing vendor user_id
   or ownership_verified_at is denied, while normal profile edits still work.
5. Confirm existing free and paid dashboards work after an approved claim. The review
   function updates contact_email to the approved account email because legacy
   dashboard queries use it. Confirm that contact change with the business.
6. Test mobile layout, error/retry states, external redirect rejection, and password reset.
7. Run full install, typecheck and production build in a network-enabled checkout.
   This workspace cannot fetch GitHub/npm hosts. Local checks use installed TypeScript
   for syntax and Node's test runner for input/redirect policy; they are not a full build.
8. Backfill ownership_verified_at only from actual documented reviews. Never derive
   it from legacy is_verified, paid tier, or user_id alone.

## Operator claim review
Use the Supabase SQL editor or a trusted server with the service role, never a browser key.
List pending requests:
```sql
select r.id, r.created_at, r.evidence, u.email, v.name, v.slug
from public.vendor_claim_requests r
join public.vendors v on v.id = r.vendor_id
join auth.users u on u.id = r.user_id
where r.status = 'pending' order by r.created_at;
```
Independently locate an established business website/social account. Verify the
requester through that channel; do not trust only the URL they supplied. Record
the method/date and consent to update the business contact email. Do not collect
passwords or sensitive ID documents in the claim text.
Approve or reject using the actual request UUID:
```sql
select public.review_vendor_claim(
  '<actual-request-uuid>'::uuid,
  true, -- false to reject
  'Record the independently verified ownership evidence and contact-email consent.'
);
```
Approval is transactional, rejects reassignment of owned listings, and closes
competing pending claims. Repeated approval fails safely. Review notes are visible
to the requester through own-row reads: do not include secrets or other claimants'
personal information. Contact the requester manually after the decision.
No notifications have been sent by this implementation.

## Next slice: Stripe subscriptions and Connect reservations
Before implementation, obtain business/account country, currency, seller geography,
and an inventory of existing purchases/founding benefits/open deposits. Never put
keys in source or chat; configure deployment secrets.

Membership work: server-created Checkout sessions with price IDs; customer/subscription
mapping; webhook signature verification and event deduplication; paid-through entitlement;
renewal failure, cancellation, refunds; Customer Portal; explicit founder benefit migration.

Reservation work: one seller/specimen per reservation; decide charge type and seller of
record; Connect onboarding; server eligibility and event-time checks; short stock holds;
payment/reservation IDs; atomic DB stock transitions; reconciliation; refund queue; pickup
confirmation; cancellation and no-show terms. No host share of the customer's deposit.
Retain historical PayPal refund/reconciliation capability. Do not bill twice.

Release gates: replayed webhooks, concurrent buyers, expired holds, late payment success,
lost-network retries, failed refunds, event cancellation, subscription expiry,
unauthorized financial writes, correct fee/balance receipts, and complete reconciliation.

## Pilot
Target one organizer-supported event, 10–15 vendors and 50–100 accurate listings.
Measure activation, completed pickups, support time and paid conversion. These are
recruitment targets, not market traction. No vendor/organizer outreach is authorized
or sent merely by publishing this code.

## Validation recorded for this draft
- Node policy and mocked claim-route checks: 11 passed, 0 failed.
- TypeScript transpilation syntax checks: 14 TS/TSX files, no syntax errors.
- Full application typecheck/build, browser smoke test, Supabase migration/RLS tests,
  and email delivery remain unverified. This PR is draft until those checks pass.
- Tests run with Node 24; route tests require TypeScript (workspace dependency).
  Command: node --experimental-strip-types --test tests/claim-policy.test.mjs tests/claim-route.test.mjs
  RPV_TYPESCRIPT_PATH may point to an installed TypeScript package when workspace
  dependencies cannot be installed.
