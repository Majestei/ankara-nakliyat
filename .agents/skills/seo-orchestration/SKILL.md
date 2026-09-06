---
name: seo-orchestration
description: Coordinates multi-agent SEO audits and implementation. Use for full-site SEO work, broad SEO fixes, migrations, re-audits, or requests to maximize a website's technical, local, content and performance SEO quality.
---

# SEO Orchestration

Use specialist subagents rather than performing every deep audit in one context.

## Parallel first-pass

Delegate independent passes for:
1. technical SEO
2. local SEO
3. content/search intent
4. performance/verification

Do not let the first agent's opinion bias all subsequent audits.

## Evidence requirement

A finding should point to at least one:
- file/path
- route/URL
- rendered observation
- command/test result
- externally researched source when public research is required

## Implementation rule

Prefer small, reversible, high-confidence edits.

Before restructuring many URLs:
- identify existing URLs
- identify link/canonical/sitemap consequences
- preserve valuable established routes when possible
- create permanent redirects for intentional migrations
- update internal references

## Re-audit loop

After implementation:
1. build
2. run relevant tests
3. inspect rendered priority pages
4. re-run technical verification
5. re-run performance verification
6. fix reproducible Critical/High regressions
7. report remaining uncertainty

## Project workflow

Run .agents/seo-tools verification and GSC checks using INTEGRATION.md. Serialize shared-file edits and builds. Do not treat an API access block as an excuse to skip independent audits. Report blockers without endless retries.
