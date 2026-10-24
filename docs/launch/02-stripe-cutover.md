# Stripe cutover requirements
Date: 2026-10-24
Status: implementation specification only. Stripe code and account configuration have not been changed.

## Confirmed decisions
- Owner confirms business/account registration in the United States.
- Owner reports no existing customers through PayPal.
- Stripe replaces PayPal for future paid purchases.
- No PayPal customer, subscription, or founding-benefit migration is planned.
- Preserve free accounts, vendor listings, ownership records, and historical records.

US registration is owner-provided information, not verification of a connected Stripe
account or its activation. USD is the proposed launch currency. Vendor Pro pricing
remains a pilot hypothesis: $24.99/month or $249/year, to be validated after one event.
Do not charge for promised functionality before that functionality is ready.

## First release: vendor membership
Use Stripe Checkout subscriptions and Customer Portal for RPV's own membership.
Do not use this release to collect plant deposits or distribute vendor proceeds.
Keep purchase creation behind a server-side launch flag, disabled by default.

Required deployment configuration:
- Stripe secret key and webhook signing secret, stored only as deployment secrets.
- Separate monthly and annual recurring Price IDs in USD, selected on the server.
- Canonical application URL and explicit checkout/portal return paths.
- A server-only launch flag, with test and live configurations kept separate.

Do not request secret keys in chat or commit them. Validate Price currency, interval,
product and amount against the approved offer before opening checkout.

## Implementation acceptance criteria
1. Require a signed-in, confirmed account and authorized vendor ownership.
2. Accept only a known plan identifier; never trust client-supplied prices, customer
   IDs, entitlement status or vendor ownership.
3. Persist account-to-Stripe customer/subscription mappings with restricted writes.
   Guard concurrent checkout attempts and existing subscriptions against duplicate billing.
4. Verify webhook signatures against the raw request body. Persist event IDs and
   safely handle duplicate deliveries, retries and out-of-order events.
5. Reconcile authoritative subscription state. Checkout redirects must never grant
   paid access. Define paid-through expiry, cancellation, failed-payment/grace policy,
   refunds and reactivation before implementation is considered complete.
6. Keep paid entitlement separate from ownership verification and client-editable
   profile fields. Paying must never create a verified-ownership badge.
7. Create Customer Portal sessions on the server for the authenticated customer's
   own billing account.
8. Remove or disable every legacy purchase entry point, including old onboarding,
   direct checkout URLs and PayPal upgrade/presale APIs. Updating pricing buttons
   alone is not a completed cutover.
9. Do not recreate lifetime/founding offers for new buyers. Preserve historical data.
   Check payment records for unexpected transactions before retiring PayPal credentials.
10. Keep a reconciliation procedure for missed webhooks and inconsistent entitlements.
    Closing the launch flag stops new purchases; webhook processing must continue
    for subscriptions already created.

## Verification before launch
- Full application typecheck/build and staging database permission checks.
- Test-mode monthly and annual checkout, retries and concurrent purchase attempts.
- Invalid signatures, duplicate events, out-of-order events and webhook downtime.
- Renewal success/failure, cancellation at period end, expiry, refund and reactivation.
- Portal ownership isolation and attempts to modify entitlement directly.
- Direct calls to retired PayPal endpoints fail without charging or granting access.
- Staging smoke tests for free claims, listing edits and existing account access.
- Documented entitlement policy and verified readiness of each paid feature.

## Later release: plant reservations
Seller geography, seller-of-record responsibilities, charge type, Connect account
configuration and supported payout countries remain unresolved. Implement this as
a separate release with atomic inventory holds, pickup confirmation, refund and
event-cancellation handling, and payout reconciliation. Credit the full deposit
against the vendor's plant price. Fund organizer rewards from RPV revenue.

## Current execution limitation
The coding environment disconnected before Stripe implementation began. The current
draft PR contains directory-foundation changes and this specification, not a working
Stripe integration. Resume in a working checkout, run the checks above, and keep the
PR in draft until required validation passes. Nothing has been merged or deployed.

## Implementation references
- https://docs.stripe.com/api/checkout/sessions/create
- https://docs.stripe.com/webhooks
- https://docs.stripe.com/billing/subscriptions/webhooks
- https://docs.stripe.com/api/billing_portal/sessions/create
