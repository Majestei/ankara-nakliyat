import fs from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';
import { chromePath } from '../.agents/seo-tools/common.mjs';

const require = createRequire(new URL('../.agents/seo-tools/package.json', import.meta.url));
const puppeteer = require('puppeteer-core');

const origin = process.env.HERO_QA_ORIGIN || 'http://127.0.0.1:3101';
const label = process.env.HERO_QA_LABEL || 'candidate';
const output = path.resolve('.agents/reports/recovery-2026-09-16/phase2/performance', label);
await fs.mkdir(output, { recursive: true });
const browser = await puppeteer.launch({ executablePath: chromePath(), headless: true });
const results = [];
const pause = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

async function snapshot(page) {
    return page.evaluate(() => {
        const hero = document.querySelector('main > section');
        const image = hero?.querySelector('img[data-nimg="fill"]');
        const h1 = hero?.querySelector('h1');
        const decorations = hero ? [...hero.querySelectorAll('[class*="blur-[150px]"], [class*="backdrop-blur-3xl"]')] : [];
        return {
            title: document.title,
            canonical: document.querySelector('link[rel="canonical"]')?.href,
            h1: h1?.innerText,
            h1Count: document.querySelectorAll('h1').length,
            h1Opacity: h1 ? getComputedStyle(h1).opacity : null,
            heroOpacity: hero ? getComputedStyle(hero).opacity : null,
            overflow: document.documentElement.scrollWidth > innerWidth + 1,
            image: { currentSrc: image?.currentSrc, complete: image?.complete },
            backgroundTransform: image?.parentElement?.style.transform || 'none',
            decorations: decorations.map(element => ({ transform: element.style.transform, opacity: element.style.opacity })),
            contactHref: hero?.querySelector('a[href="/iletisim"]')?.getAttribute('href'),
            phoneHref: hero?.querySelector('a[href^="tel:"]')?.getAttribute('href'),
        };
    });
}

try {
    for (const width of [375, 1440]) {
        for (const reducedMotion of [false, true]) {
            const page = await browser.newPage();
            const errors = [];
            page.on('pageerror', error => errors.push(error.message));
            await page.setViewport({ width, height: width === 375 ? 812 : 900, deviceScaleFactor: 1 });
            await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: reducedMotion ? 'reduce' : 'no-preference' }]);
            await page.goto(origin, { waitUntil: 'networkidle0', timeout: 45000 });
            await pause(300);
            const first = await snapshot(page);
            await page.screenshot({ path: path.join(output, `${width}-${reducedMotion ? 'reduced' : 'normal'}.png`) });
            await pause(650);
            const second = await snapshot(page);
            await page.evaluate(() => window.scrollTo(0, 400));
            await pause(200);
            const scrolled = await snapshot(page);
            await page.evaluate(() => window.scrollTo(0, 0));
            // Dismiss the first-visit banner before operating the slider below it.
            // This only changes this isolated test browser's consent state.
            const reject = await page.$('#cookie-decline');
            if (reject) await reject.click();
            await page.$eval('button[aria-label="Slayt 2\'e git"]', button => button.scrollIntoView({ block: 'center', behavior: 'instant' }));
            await pause(500);
            await page.click('button[aria-label="Slayt 2\'e git"]');
            await pause(1000);
            const manualSlide = await snapshot(page);
            const changed = JSON.stringify(first.decorations) !== JSON.stringify(second.decorations);
            const expectsStatic = width < 768 || reducedMotion;
            const failures = [
                !first.h1?.includes('Ankara Evden Eve') && 'initial_h1',
                first.h1Count !== 1 && 'h1_count',
                first.overflow && 'horizontal_overflow',
                first.h1Opacity !== '1' && 'h1_opacity',
                !first.contactHref && 'contact_link',
                !first.phoneHref && 'phone_link',
                !manualSlide.h1?.includes('Asansörlü ve') && 'manual_slider',
                expectsStatic && changed && 'hidden_or_reduced_decorations_animated',
                expectsStatic && !['none', 'translateY(0px)'].includes(scrolled.backgroundTransform) && 'mobile_or_reduced_parallax',
                !expectsStatic && !changed && 'desktop_decorations_inactive',
                errors.length > 0 && 'runtime_errors',
            ].filter(Boolean);
            results.push({ width, reducedMotion, status: failures.length ? 'FAIL' : 'PASS', failures, first, scrolled, manualSlide, errors });
            await page.close();
        }
    }
    const page = await browser.newPage();
    await page.setViewport({ width: 375, height: 812 });
    await page.setJavaScriptEnabled(false);
    await page.goto(origin, { waitUntil: 'networkidle0', timeout: 45000 });
    const ssr = await snapshot(page);
    const failures = [!ssr.h1?.includes('Ankara Evden Eve') && 'ssr_h1', ssr.h1Count !== 1 && 'ssr_h1_count', ssr.h1Opacity !== '1' && 'ssr_h1_hidden'].filter(Boolean);
    results.push({ javaScript: false, status: failures.length ? 'FAIL' : 'PASS', failures, ssr });
    await page.close();
} finally {
    await browser.close();
}

const report = { generatedAt: new Date().toISOString(), origin, label, results };
await fs.writeFile(path.join(output, 'hero-qa.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ output, checks: results.length, failures: results.filter(result => result.status === 'FAIL').map(({ width, reducedMotion, failures }) => ({ width, reducedMotion, failures })) }));
if (results.some(result => result.status === 'FAIL')) process.exitCode = 1;
