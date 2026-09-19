import { mkdir, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { existsSync } from 'node:fs';

// Read-only representative UI checks. Never submits a form or follows contact links.
const require = createRequire(new URL('../.agents/seo-tools/package.json', import.meta.url));
const puppeteer = require('puppeteer-core');
const args = process.argv.slice(2);
const argument = (key, fallback) => args.includes(key) ? args[args.indexOf(key) + 1] : fallback;
const origin = argument('--origin', 'http://127.0.0.1:3101');
const out = resolve(argument('--out', 'docs/seo/recovery/2026-09-16/ui-qa'));
const widths = argument('--widths', '375,390,768,1440').split(',').map(Number);
const routes = argument('--paths', '/,/evden-eve-nakliyat,/islemler/ankara/sincan,/islemler/ankara/golbasi/incek,/blog,/iletisim').split(',');
const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p => p && existsSync(p));
if (!chrome) throw new Error('CHROME_NOT_FOUND');
await mkdir(out, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const report = { generatedAt: new Date().toISOString(), origin, node: process.version, browser: await browser.version(), widths, pages: [], interactions: [], limitations: ['No form submission, customer calls or WhatsApp launches.', 'Viewport checks are lab evidence; field CWV and real-user INP are not measured.'] };
try {
  for (const width of widths) {
    const page = await browser.newPage();
    await page.setCacheEnabled(false);
    await page.setViewport({ width, height: width >= 1024 ? 1000 : 844, deviceScaleFactor: 1, isMobile: width < 768, hasTouch: width < 1024 });
    for (const route of routes) {
      const runtimeErrors = [];
      const consoleErrors = [];
      const failedRequests = [];
      const onError = error => runtimeErrors.push(String(error.message || error).slice(0, 600));
      const onConsole = message => { if (message.type() === 'error') consoleErrors.push(message.text().slice(0, 1200)); };
      const onFailed = request => failedRequests.push({ url: request.url().split('?')[0], reason: request.failure()?.errorText });
      page.on('pageerror', onError);
      page.on('console', onConsole);
      page.on('requestfailed', onFailed);
      try {
        const response = await page.goto(new URL(route, origin).href, { waitUntil: 'networkidle2', timeout: 45000 });
        await page.evaluate(() => document.fonts.ready);
        const dom = await page.evaluate(() => {
          const visible = el => {
            let node = el;
            while (node && node instanceof Element) {
              const style = getComputedStyle(node);
              if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
              node = node.parentElement;
            }
            return el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0;
          };
          const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => {
            try { const value = JSON.parse(el.textContent); return { valid: true, type: value['@type'] || '@graph' }; }
            catch { return { valid: false }; }
          });
          const outOfBounds = [...document.querySelectorAll('main h1,main h2,main h3,main p,main a,main button,main input,main select,main textarea')]
            .filter(el => visible(el) && (el.getBoundingClientRect().left < -3 || el.getBoundingClientRect().right > innerWidth + 3))
            .map(el => ({ tag: el.tagName, text: (el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 120), left: Math.round(el.getBoundingClientRect().left), right: Math.round(el.getBoundingClientRect().right), classes: el.className }));
          return {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.content,
            canonical: [...document.querySelectorAll('link[rel="canonical"]')].map(el => el.href),
            robots: [...document.querySelectorAll('meta[name="robots"],meta[name="googlebot"]')].map(el => el.content),
            headings: [...document.querySelectorAll('h1')].map(el => ({ text: el.textContent.trim(), visible: visible(el) })),
            schemas,
            overflow: document.documentElement.scrollWidth > innerWidth + 2,
            outOfBounds,
            mainTextLength: document.querySelector('main')?.textContent.length || 0,
            phoneLinks: [...new Set([...document.querySelectorAll('a[href^="tel:"]')].map(el => el.getAttribute('href')))],
            whatsappLinks: [...new Set([...document.querySelectorAll('a[href*="wa.me"]')].map(el => el.href))],
            forms: [...document.forms].map(form => ({ action: form.action, method: form.method, fields: [...form.elements].map(el => ({ name: el.name, type: el.type })) })),
            internalLinkCount: [...document.querySelectorAll('a[href]')].filter(el => el.origin === location.origin).length,
          };
        });
        const issues = [];
        if (response.status() !== 200) issues.push('HTTP_STATUS');
        if (dom.headings.length !== 1 || !dom.headings[0]?.visible) issues.push('PRIMARY_H1');
        if (dom.canonical.length !== 1) issues.push('CANONICAL_COUNT');
        if (!dom.description || !dom.title) issues.push('METADATA');
        if (dom.schemas.some(schema => !schema.valid)) issues.push('SCHEMA_SYNTAX');
        if (dom.overflow) issues.push('PAGE_OVERFLOW');
        if (runtimeErrors.length) issues.push('RUNTIME_ERRORS');
        const screenFile = `${width}-${route.replaceAll('/', '_') || 'home'}.png`;
        await page.screenshot({ path: resolve(out, screenFile), fullPage: false });
        report.pages.push({ route, width, status: response.status(), finalUrl: page.url(), result: issues.length ? 'FAIL' : 'PASS', issues, ...dom, runtimeErrors, consoleErrors: [...new Set(consoleErrors)], failedRequests, screenshot: screenFile });
        if (route === '/' && width < 1024) {
          const button = await page.$('button[aria-label="Menü"]');
          if (button) {
            await button.click();
            await page.waitForSelector('nav[aria-label="Mobil Menü"]', { visible: true, timeout: 5000 });
            const opened = await page.$eval('button[aria-label="Menü"]', el => el.getAttribute('aria-expanded') === 'true');
            const links = await page.$$eval('nav[aria-label="Mobil Menü"] a', els => els.map(el => el.getAttribute('href')));
            await page.click('button[aria-label="Menüyü Kapat"]');
            const closed = await page.$eval('button[aria-label="Menü"]', el => el.getAttribute('aria-expanded') === 'false');
            report.interactions.push({ route, width, kind: 'mobile-menu-open-close', result: opened && closed && links.length ? 'PASS' : 'FAIL', links });
          } else report.interactions.push({ route, width, kind: 'mobile-menu-open-close', result: 'FAIL', reason: 'Missing menu control' });
        }
        console.log(JSON.stringify({ route, width, status: response.status(), issues, clippedElementsToReview: dom.outOfBounds.length, consoleErrors: consoleErrors.length }));
      } catch (error) {
        report.pages.push({ route, width, result: 'FAIL', error: String(error.message || error).slice(0, 600), runtimeErrors });
        process.exitCode = 1;
      } finally {
        page.off('pageerror', onError);
        page.off('console', onConsole);
        page.off('requestfailed', onFailed);
      }
    }
    await page.close();
  }
} finally {
  await browser.close();
  if ([...report.pages, ...report.interactions].some(row => row.result === 'FAIL')) process.exitCode = 1;
  await writeFile(resolve(out, 'summary.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(resolve(out, 'summary.json'));
}
