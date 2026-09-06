---
name: performance-verification
description: Verifies production builds, rendered SEO output and web performance. Use after SEO implementation or when auditing Core Web Vitals, JavaScript, images, fonts, layout shifts and runtime errors.
---

# Performance & Verification Protocol

## Never infer a pass

A check is:
- PASS: directly verified
- FAIL: directly reproduced
- NOT TESTED: not executed/observable

## Performance priorities

Prioritize changes likely to improve real user experience:
- LCP resource delivery
- interaction responsiveness
- layout stability
- unnecessary JS execution
- image delivery
- font delivery
- third-party cost

Do not remove important functionality merely to improve a metric.

## Regression gate

After SEO edits verify representative pages for:
- production build
- rendered metadata
- canonical
- primary heading
- structured data syntax
- internal navigation
- mobile layout
- console/runtime failures

## Project workflow

Use the executable smoke, lighthouse and pagespeed commands in .agents/INTEGRATION.md. Keep lab data separate from field CWV. Lighthouse TBT does not measure real-user INP. Record environment, date, URL, device and failed/unavailable measurements.
