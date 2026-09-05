const fullAudit = process.argv.includes("--full");
const timeoutMs = 20_000;
const concurrency = 12;

const sites = [
    {
        name: "Ankara Özdemir Nakliyat",
        origin: "https://ankaraozdemirnakliyat.com",
        alternateOrigin: "https://www.ankaraozdemirnakliyat.com",
        criticalPaths: ["/", "/evden-eve-nakliyat", "/hizmetler", "/islemler", "/blog", "/iletisim"],
    },
    {
        name: "Akif Nakliyat",
        origin: "https://www.ankaraakifnakliyat.com",
        alternateOrigin: "https://ankaraakifnakliyat.com",
        criticalPaths: ["/", "/evden-eve-nakliyat/", "/hizmetler/", "/islemler/", "/blog/", "/iletisim/"],
    },
];

const errors = [];
const warnings = [];
const summaries = [];

function normalizeUrl(value) {
    const url = new URL(value);
    url.hash = "";
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/, "");
    return url.toString();
}

function decodeXml(value) {
    return value
        .replaceAll("&amp;", "&")
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">");
}

async function fetchText(url, redirect = "manual") {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const response = await fetch(url, {
            redirect,
            signal: controller.signal,
            headers: { "user-agent": "NakliyeSeoMonitor/1.0 (+technical SEO audit)" },
        });
        return { response, text: await response.text() };
    } finally {
        clearTimeout(timer);
    }
}

function extractCanonical(html) {
    const tags = html.match(/<link\b[^>]*>/gi) || [];
    for (const tag of tags) {
        if (!/\brel=["'][^"']*canonical[^"']*["']/i.test(tag)) continue;
        const href = tag.match(/\bhref=["']([^"']+)["']/i);
        if (href) return href[1];
    }
    return null;
}

function hasMetaRobotsNoindex(html) {
    const tags = html.match(/<meta\b[^>]*>/gi) || [];
    return tags.some((tag) =>
        /\bname=["'](?:robots|googlebot)["']/i.test(tag) &&
        /\bcontent=["'][^"']*noindex[^"']*["']/i.test(tag)
    );
}

function addError(site, message) {
    errors.push(`[${site.name}] ${message}`);
}

function addWarning(site, message) {
    warnings.push(`[${site.name}] ${message}`);
}

async function checkCanonicalHost(site) {
    try {
        const { response } = await fetchText(`${site.alternateOrigin}/`);
        const location = response.headers.get("location");
        if (![301, 308].includes(response.status)) {
            addError(site, `${site.alternateOrigin}/ kalıcı yönlendirme yerine HTTP ${response.status} döndürüyor.`);
            return;
        }
        if (!location || new URL(location, site.alternateOrigin).origin !== site.origin) {
            addError(site, `${site.alternateOrigin}/ kanonik hosta yönlenmiyor (${location || "Location yok"}).`);
        }
    } catch (error) {
        addError(site, `${site.alternateOrigin}/ erişilemiyor: ${error.message}`);
    }
}

async function inspectPage(site, url) {
    try {
        const { response, text } = await fetchText(url);
        if (response.status !== 200) {
            addError(site, `${url} HTTP ${response.status} döndürüyor.`);
            return;
        }

        if (!/<title>[^<]+<\/title>/i.test(text)) addError(site, `${url} title etiketi içermiyor.`);
        if (!/<meta\b[^>]*\bname=["']description["'][^>]*>/i.test(text) &&
            !/<meta\b[^>]*\bcontent=["'][^"']+["'][^>]*\bname=["']description["'][^>]*>/i.test(text)) {
            addWarning(site, `${url} meta description içermiyor.`);
        }
        if (!/<h1\b[^>]*>/i.test(text)) addError(site, `${url} ilk HTML yanıtında H1 içermiyor.`);

        const canonical = extractCanonical(text);
        if (!canonical) {
            addError(site, `${url} canonical etiketi içermiyor.`);
        } else if (normalizeUrl(canonical) !== normalizeUrl(url)) {
            addError(site, `${url} canonical uyuşmazlığı: ${canonical}`);
        }

        if (hasMetaRobotsNoindex(text)) addError(site, `${url} sitemap içinde olmasına rağmen noindex.`);
    } catch (error) {
        addError(site, `${url} denetlenemedi: ${error.message}`);
    }
}

async function mapConcurrent(items, worker) {
    let cursor = 0;
    await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
        while (cursor < items.length) {
            const item = items[cursor++];
            await worker(item);
        }
    }));
}

async function auditSite(site) {
    await checkCanonicalHost(site);

    let robotsText = "";
    try {
        const { response, text } = await fetchText(`${site.origin}/robots.txt`);
        robotsText = text;
        if (response.status !== 200) addError(site, `/robots.txt HTTP ${response.status} döndürüyor.`);
        if (!new RegExp(`Sitemap:\\s*${site.origin.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/sitemap\\.xml`, "i").test(text)) {
            addError(site, `/robots.txt kanonik sitemap adresini belirtmiyor.`);
        }
    } catch (error) {
        addError(site, `/robots.txt denetlenemedi: ${error.message}`);
    }

    let sitemapUrls = [];
    try {
        const { response, text } = await fetchText(`${site.origin}/sitemap.xml`);
        if (response.status !== 200) addError(site, `/sitemap.xml HTTP ${response.status} döndürüyor.`);
        sitemapUrls = [...text.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeXml(match[1].trim()));
        if (sitemapUrls.length === 0) addError(site, `/sitemap.xml URL içermiyor.`);

        const normalized = sitemapUrls.map(normalizeUrl);
        const duplicateCount = normalized.length - new Set(normalized).size;
        if (duplicateCount) addError(site, `/sitemap.xml ${duplicateCount} yinelenen URL içeriyor.`);

        const wrongHost = sitemapUrls.filter((url) => new URL(url).origin !== site.origin);
        if (wrongHost.length) addError(site, `/sitemap.xml farklı hostta ${wrongHost.length} URL içeriyor.`);
    } catch (error) {
        addError(site, `/sitemap.xml denetlenemedi: ${error.message}`);
    }

    const urlsToInspect = fullAudit
        ? sitemapUrls
        : site.criticalPaths.map((path) => new URL(path, site.origin).toString());

    await mapConcurrent(urlsToInspect, (url) => inspectPage(site, url));
    summaries.push(`${site.name}: sitemap ${sitemapUrls.length} URL, sayfa kontrolü ${urlsToInspect.length} URL`);

    if (!robotsText.trim()) addWarning(site, `robots.txt boş görünüyor.`);
}

for (const site of sites) await auditSite(site);

console.log(`SEO AUDIT — ${new Date().toISOString()} — ${fullAudit ? "FULL" : "QUICK"}`);
for (const summary of summaries) console.log(`OK  ${summary}`);
for (const warning of warnings) console.log(`WARN ${warning}`);
for (const error of errors) console.log(`ERROR ${error}`);
console.log(`RESULT errors=${errors.length} warnings=${warnings.length}`);

if (errors.length) process.exitCode = 1;
