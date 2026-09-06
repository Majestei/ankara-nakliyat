# Two-domain SEO operations

Baseline date: 2026-09-05 (Europe/Istanbul)

## Production inventory

| Site | Canonical origin | Source workspace | Live sitemap | Local build |
| --- | --- | --- | ---: | ---: |
| Ankara Özdemir Nakliyat | `https://ankaraozdemirnakliyat.com` | `C:\Users\suley\Desktop\Projeler\Nakliye` | 966 URLs | 993 pages |
| Akif Nakliyat | `https://www.ankaraakifnakliyat.com` | `C:\Users\suley\Desktop\Projeler\Nakliyev5\Nakliye` | 500 URLs | 507 pages |

The first production crawl checked all 1,466 sitemap URLs and received direct HTTP 200 responses for every URL. Both sitemaps contained unique URLs on their intended canonical host.

## First-run findings and decisions

1. **Akif initial HTML:** 344 of 501 generated HTML documents had no H1 or primary content because four client components returned an empty shell until `useEffect` ran. The gate was removed; the verified local build now has an H1 in all 501 HTML documents. This is the highest-confidence first-run fix.
2. **Akif duplicate titles:** the root metadata template appended the brand to page titles that already contained it. The local build went from 336 duplicate-brand titles to zero.
3. **Canonical hosts:** Özdemir's `www` host returned 200 instead of redirecting to the apex; the permanent host redirect is now live. Akif's bare apex still fails TLS hostname validation because an obsolete AAAA record (`2a06:41c0:1:2e::269`) competes with the correct Vercel A record (`76.76.21.21`). Delete that AAAA record at the authoritative Güzel Hosting DNS zone, then configure the bare domain to redirect permanently to `www` in Vercel.
4. **Structured data integrity:** unverified ratings, review counts, founding dates, headcounts, payment data, price range, copied address/coordinates, and superlatives were removed from JSON-LD. Review pages now publish no named review unless its source and permission are verifiable, and are temporarily `noindex`.
5. **Sitemap dates:** Akif used the build time as `lastmod` for nearly every URL. Unknown dates are now omitted; dated blog entries retain their declared publication date.
6. **Title/content scope:** no bulk title rewrite, URL removal, redirect migration, or mass deindexing was performed without Search Console evidence. Existing routes and internal architecture were preserved.

## Access gaps

- No Google Search Console credential or authenticated API configuration was available in either workspace. The property placeholders are in `search-console.env.example`; secrets must remain outside Git.
- The PageSpeed Insights API returned HTTP 429 during the baseline, so no synthetic performance number is recorded as fact.
- Akif is linked to the Vercel project `akif-nakliyat-seo`, but no usable non-interactive deployment session was confirmed during the baseline.
- Akif has a local Git baseline but no remote configured.

Until Search Console read access exists, the following are deliberately reported as **unknown**: query winners, pages losing clicks, CTR opportunities, device/country splits, index coverage, crawl exclusions, Core Web Vitals field data, and safe candidates for consolidation or deindexing.

## Business-fact verification queue

Before reintroducing any claim, obtain a durable source for each brand separately:

- legal/trading name and exact public address;
- operating hours and service coverage;
- founding year, employee count, vehicle count, and completed-job totals;
- insurance scope, exclusions, licences, certifications, and written guarantees;
- review platform URL, review author consent, rating total, and observation date;
- prices, price ranges, promotions, and expiry dates.

Legacy marketing copy still contains some unsupported numerical and guarantee-style statements outside JSON-LD. Treat these as a cleanup queue, not as verified facts. Do not copy facts, reviews, addresses, or statistics between the two domains.

## Competitive baseline

The initial Ankara search sample showed competitors such as Otaş, Exper, Garantili, EVVE, and EKOTAŞ. This sample is discovery evidence, not a rank report. The clearest useful-content gap is Otaş's task-specific planning tools (volume, distance, lift suitability, price planning, and moving checklist). The two sites should not mirror each other:

- Özdemir should earn trust with locally specific process proof and verifiable Ankara/Sincan operational detail.
- Akif should differentiate through useful move-planning tools and transparent quote preparation, then add intercity coverage only where the business confirms it.

## Operating commands

From the Özdemir workspace:

```powershell
npm run seo:audit
npm run seo:audit:full
```

The quick audit checks both live sites' canonical hosts, robots, sitemap integrity, and critical pages. The full audit fetches every sitemap URL and validates status, title, description, H1, canonical, and sitemap/noindex conflicts. Any critical error produces a non-zero exit code.

## Scheduled cadence

The active thread heartbeat, **Two-site SEO operations**, runs daily at 08:30 in the local app schedule. It performs the quick health check every day, the full sitemap crawl every third calendar day beginning 2026-09-08, and the evidence-led growth review each Monday. It stays quiet when nothing meaningful changes and reports only fixes, failures, material findings, or required user action.

## Change log

| Date | Scope | Change | Verification |
| --- | --- | --- | --- |
| 2026-09-05 | Both | Baseline source/build/live crawl and competitor discovery | 1,466/1,466 sitemap URLs returned 200 |
| 2026-09-05 | Akif | Restored meaningful server-rendered HTML on service, city, district-service, and reference templates | 501/501 built HTML documents contain H1 |
| 2026-09-05 | Akif | Removed duplicate brand-title template and false build-time sitemap dates | zero duplicate-brand titles in local build |
| 2026-09-05 | Both | Removed unverified structured trust claims and source-less published review listings | both local builds pass |
| 2026-09-05 | Özdemir | Added `www` to apex permanent redirect | pending production deployment check |
| 2026-09-06 | Both | Daily canonical-host, robots, sitemap and critical-page health check | Özdemir 966 and Akif 499 sitemap URLs; errors=0, warnings=0 |
| 2026-09-06 | Özdemir | Removed duplicate hidden text from the homepage H1 introduced by the accessibility label | 993-page build passed; production H1 verified as a single phrase; commit `4fce28d` |

## Next evidence-led work

1. Connect read-only Search Console access for both domain properties and export at least 16 months of page/query/device/country data.
2. At Güzel Hosting DNS, delete the Akif apex AAAA record `2a06:41c0:1:2e::269` and keep the apex A record `76.76.21.21`; then verify bare-apex HTTP and HTTPS both permanently redirect to `www`.
3. Confirm business facts and scrub or substantiate the remaining legacy numeric/guarantee claims.
4. Segment Search Console pages into protect, improve CTR, expand, consolidate, and investigate-indexing groups before changing mass-generated routes.
5. Build one genuinely useful planning asset per domain with distinct positioning; measure impressions, qualified leads, and assisted conversions rather than raw page count.
