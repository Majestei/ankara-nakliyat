import puppeteer from 'puppeteer-core';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import { config, local, chromePath, targetOrigin, save, errorSummary } from './common.mjs';

const psi = process.argv.includes('--pagespeed');
const origin = targetOrigin();
const results = { generatedAt: new Date().toISOString(), origin,
  source: psi ? 'PageSpeed Insights API' : 'local Lighthouse',
  fieldData: 'NOT_TESTED: use CrUX API or Search Console for real-user CWV and INP.', pages: [] };
let browser;
try {
  if (!psi) browser = await puppeteer.launch({ executablePath: chromePath(), headless: true });
  for (const [i, path] of config.performancePaths.entries()) {
    for (const strategy of ['mobile', 'desktop']) {
      const url = new URL(path, origin).href;
      try {
        let lhr;
        if (psi) {
          const endpoint = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
          endpoint.searchParams.set('url', url);
          endpoint.searchParams.set('strategy', strategy);
          for (const category of ['performance', 'accessibility', 'best-practices', 'seo']) endpoint.searchParams.append('category', category);
          const key = process.env.PAGESPEED_API_KEY || local.pagespeedApiKey;
          if (key) endpoint.searchParams.set('key', key);
          const response = await fetch(endpoint, { signal: AbortSignal.timeout(90000) });
          if (!response.ok) {
            const failure = { url, strategy, status: 'BLOCKED', httpStatus: response.status };
            results.pages.push(failure);
            // Do not repeat calls against a blocked/quota-limited API.
            if ([401, 403, 429].includes(response.status)) throw new Error('PAGESPEED_ACCESS_BLOCKED');
            process.exitCode = 2;
            continue;
          }
          lhr = (await response.json()).lighthouseResult;
        } else {
          const audit = await lighthouse(url, { port: Number(new URL(browser.wsEndpoint()).port),
            output: ['json', 'html'], logLevel: 'error',
            onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
            maxWaitForLoad: 45000 }, strategy === 'desktop' ? desktopConfig : undefined);
          lhr = audit.lhr;
          await save(`lighthouse-${i}-${strategy}.html`, audit.report[1]);
        }
        if (!lhr || lhr.runtimeError) throw new Error('LIGHTHOUSE_RUNTIME_ERROR');
        await save(`${psi ? 'pagespeed' : 'lighthouse'}-${i}-${strategy}.json`, lhr);
        const scores = Object.fromEntries(Object.entries(lhr.categories).map(([key, value]) => [key,
          typeof value.score === 'number' ? Math.round(value.score * 100) : null]));
        results.pages.push({ url, finalUrl: lhr.finalDisplayedUrl || lhr.finalUrl, strategy,
          status: 'MEASURED', lighthouseVersion: lhr.lighthouseVersion, scores,
          metrics: Object.fromEntries(['largest-contentful-paint', 'cumulative-layout-shift',
            'total-blocking-time', 'first-contentful-paint', 'speed-index'].map(id => [id,
            { value: lhr.audits[id]?.numericValue ?? null, unit: lhr.audits[id]?.numericUnit ?? null }])),
          warnings: lhr.runWarnings || [] });
        console.log(JSON.stringify({ url, strategy, scores }));
      } catch (error) {
        if (error.message === 'PAGESPEED_ACCESS_BLOCKED') throw error;
        results.pages.push({ url, strategy, status: 'FAIL', error: errorSummary(error) });
        process.exitCode = 2;
      }
    }
  }
} catch (error) {
  results.error = errorSummary(error);
  process.exitCode = 2;
} finally {
  if (browser) await browser.close();
  console.log(await save(psi ? 'pagespeed-summary.json' : 'lighthouse-summary.json', results));
}
