---
name: technical-seo-audit
description: Performs rigorous technical SEO analysis covering crawlability, indexation, canonicalization, redirects, sitemaps, robots directives, rendering, metadata, structured data and internal link integrity.
---

# Technical SEO Audit Protocol

## Priority order

1. Can search engines reach the page?
2. Can/should it be indexed?
3. Is the intended URL canonical?
4. Can the important content be rendered/discovered?
5. Do sitemap, redirects, canonicals and internal links agree?
6. Is structured data truthful and syntactically valid?
7. Are important pages internally discoverable?

## Check for contradictions

Examples:
- sitemap uses URL A but canonical points to B
- internal links point to redirected variants
- canonical URL is noindexed
- indexable page blocked by robots
- service page canonicalizes to home without a strong reason
- multiple hostname variants serve 200 responses

## Do not over-optimize

Technical SEO is not adding tags for their own sake.
Only recommend changes with a clear crawl/index/discovery/understanding benefit.

## Project workflow

Use smoke for rendered priority pages and JSON-LD syntax, then inspect HTTP and generated output. Unknown review/insurance/company claims are not verified simply because they appear in code. Preserve existing redirects and user changes.
