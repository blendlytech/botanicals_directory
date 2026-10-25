# Directory homepage and vendor landing page
Date: 2026-10-25
Status: review branch; not merged or deployed.

The homepage now serves collectors searching for businesses and events. Vendor
outreach should link to a business profile or /for-vendors.

## Delivered
- Collector homepage with vendor search, researched Florida business cards,
  upcoming event cards, specialty links and listing-status explanations.
- Dedicated /for-vendors page with a free-listing offer, business-name lookup,
  a labeled researched-profile example, three-step ownership process and FAQs.
- Navigation: Find Vendors, Find Events, For Vendors, Vendor Sign In.
- Footer and shared metadata no longer promote unsupported elite/verified claims,
  fictional prestige positioning or dead Blog/Contact anchors.
- Event list replaces the global map and hardcoded May 2026 cutoff. It includes
  ongoing and future dated events, GET name/location filters, database error
  messaging, and honest empty states.
- Singular Hoya/Begonia search terms match singular and plural specialty entries.
- Existing PermitLeads navigation/footer branches are preserved.

## Offer boundaries
Free claiming is the primary offer. Ownership review remains manual. No customer
counts, results, testimonials, guaranteed traffic or current paid service are invented.
The example is editorial and does not imply the vendor endorses RPV.
New-listing intake and public correction/removal intake remain unfinished and are
described as unavailable instead of linking into legacy paid onboarding.
Do not start a broad campaign until these intake paths and the claim process work.

## Validation and release work
Three event behavior tests cover expiration, ongoing events, ordering, incomplete
records, reversed ranges, missing routes and calendar-day formatting.
Run the existing claim and researched-profile tests with these tests.
Transpile the changed TS/TSX files and typecheck the event helper.
A full application build and browser/device validation remain required. The local
workspace is a partial snapshot without app dependencies; prior browser preview was
blocked by local network and browser URL restrictions.
Apply the earlier ownership migration before deploying the draft PR. Test database
queries and six profile links in staging. Confirm manual claims and email callbacks.
Event dates are interpreted at UTC calendar-day precision because the current schema
does not provide a reliable event timezone; no precise timed expiry is promised.
Event information is from the existing database and has not received a new organizer
verification pass. Detail pages and other legacy sales routes still need review.

Recorded results: 20 tests passed, 0 failed. Nine changed TS/TSX files passed
transpilation syntax checks. These checks are not a full Next.js build/typecheck.
