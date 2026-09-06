import puppeteer from 'puppeteer-core';
import { config, chromePath, targetOrigin, save, errorSummary } from './common.mjs';

const origin = targetOrigin();
const report = { generatedAt: new Date().toISOString(), origin, pages: [], checks: [] };
let browser;
try {
  browser = await puppeteer.launch({ executablePath: chromePath(), headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  for (const [index, route] of config.criticalPaths.entries()) {
    const runtimeErrors = [];
    const onError = error => runtimeErrors.push({ name: error.name || 'PageError', message: String(error.message || '').slice(0, 600) });
    page.on('pageerror', onError);
    try {
      const response = await page.goto(new URL(route, origin).href, { waitUntil: 'networkidle2', timeout: 45000 });
      const dom = await page.evaluate(() => ({
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content || null,
        canonical: [...document.querySelectorAll('link[rel="canonical"]')].map(e => e.href),
        robots: [...document.querySelectorAll('meta[name="robots"],meta[name="googlebot"]')].map(e => e.content),
        headings: [...document.querySelectorAll('h1')].map(e => e.textContent.trim()),
        schemas: [...document.querySelectorAll('script[type="application/ld+json"]')].map(e => {
          try { const data = JSON.parse(e.textContent); return { valid: true, type: data['@type'] || '@graph' }; }
          catch { return { valid: false }; }
        }),
        internalLinks: [...document.querySelectorAll('a[href]')].filter(e => e.origin === location.origin).length,
        phoneLinks: [...document.querySelectorAll('a[href^="tel:"]')].map(e => e.getAttribute('href')),
        horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 2
      }));
      const expectedCanonical = new URL(route, config.origin).href;
      const issues = [];
      if (response.status() !== 200) issues.push('HTTP_STATUS');
      if (!dom.title || !dom.description) issues.push('METADATA_MISSING');
      if (dom.headings.length !== 1 || !dom.headings[0]) issues.push('PRIMARY_H1');
      if (dom.canonical.length !== 1 || dom.canonical[0] !== expectedCanonical) issues.push('CANONICAL');
      if (dom.robots.some(r => /noindex|none/i.test(r))) issues.push('UNEXPECTED_NOINDEX');
      if (dom.schemas.some(s => !s.valid)) issues.push('INVALID_JSON_LD');
      if (!dom.internalLinks) issues.push('NO_INTERNAL_LINKS');
      if (dom.horizontalOverflow) issues.push('MOBILE_OVERFLOW');
      if (runtimeErrors.length) issues.push('RUNTIME_ERRORS');
      report.pages.push({ route, status: response.status(), result: issues.length ? 'FAIL' : 'PASS',
        issues, runtimeErrors, ...dom });
      if (index === 0) {
        const screenshot = await page.screenshot({ fullPage: true });
        const { writeFile } = await import('node:fs/promises');
        const destination = await save('mobile-home.png', '');
        await writeFile(destination, screenshot);
      }
    } catch (error) { report.pages.push({ route, result: 'FAIL', error: errorSummary(error) }); }
    finally { page.off('pageerror', onError); }
  }
  for (const route of ['/robots.txt', '/sitemap.xml']) {
    const response = await fetch(new URL(route, origin), { signal: AbortSignal.timeout(20000) });
    const text = await response.text();
    const valid = response.status === 200 && (route.endsWith('.xml')
      ? text.includes('<urlset') && text.includes(config.origin)
      : /User-agent:/i.test(text) && text.includes(config.origin + '/sitemap.xml'));
    report.checks.push({ route, httpStatus: response.status, result: valid ? 'PASS' : 'FAIL' });
  }
  const missing = await fetch(new URL('/seo-team-verification-missing-20260906', origin), { signal: AbortSignal.timeout(20000) });
  report.checks.push({ route: 'nonexistent URL', httpStatus: missing.status, result: missing.status === 404 ? 'PASS' : 'FAIL' });
  for (const redirect of config.redirectChecks) {
    const response = await fetch(new URL(redirect.from, origin), { redirect: 'manual', signal: AbortSignal.timeout(20000) });
    const location = response.headers.get('location');
    const target = location ? new URL(location, origin) : null;
    report.checks.push({ route: redirect.from, httpStatus: response.status, location,
      result: [301, 308].includes(response.status) && target?.pathname === redirect.to ? 'PASS' : 'FAIL' });
  }
} catch (error) {
  report.error = errorSummary(error);
  process.exitCode = 2;
} finally {
  if (browser) await browser.close();
  if ([...report.pages, ...report.checks].some(r => r.result === 'FAIL')) process.exitCode = 1;
  console.log(await save('smoke.json', report));
  console.log(JSON.stringify({ pages: report.pages.length, failedPages: report.pages.filter(r => r.result === 'FAIL').length,
    checks: report.checks.length, failedChecks: report.checks.filter(r => r.result === 'FAIL').length }));
}
