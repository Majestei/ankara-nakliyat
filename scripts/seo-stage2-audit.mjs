import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, extname, join, relative, resolve, sep } from "node:path";

const runDate = new Date().toISOString().slice(0, 10);
const outputDir = resolve(`docs/seo/stage2/${runDate}`);
const concurrency = Number(process.env.SEO_AUDIT_CONCURRENCY || 16);
const timeoutMs = Number(process.env.SEO_AUDIT_TIMEOUT_MS || 30_000);

const sites = [
    {
        key: "ozdemir",
        name: "Ankara Özdemir Nakliyat",
        origin: "https://ankaraozdemirnakliyat.com",
        repo: resolve("."),
    },
    {
        key: "akif",
        name: "Akif Nakliyat",
        origin: "https://www.ankaraakifnakliyat.com",
        repo: resolve(process.env.AKIF_REPO || "../Nakliyev5/Nakliye"),
    },
];

const knownClaims = [
    ["10.000+", /10[.,]000\+/giu],
    ["10K+", /10K\+/giu],
    ["15+ yıl", /15\+\s*yıl/giu],
    ["4.9 Google", /4[.,]9\s*Google/giu],
    ["10+ araç", /10\+\s*araç/giu],
    ["K3", /\bK3\b/giu],
    ["HDI", /\bHDI\b/giu],
    ["sertifikalı ekip", /sertifikalı\s+ekip/giu],
];

const trustClaimPattern = /(\d[\d.,]*\s*(?:\+|%|yıl|araç|müşteri|taşınma|iş)|\bK3\b|\bHDI\b|sertifikalı|belgeli|sigortalı|garanti|güvence|sıfır risk|en iyi|lider|kesintisiz|profesyonel ekip)/iu;
const stopWords = new Set("ve veya ile için bu bir de da en çok her tüm olarak olan ise mi mı mu mü ama ancak gibi daha hem ne kadar sonra önce çünkü tarafından göre kendi biz siz onlar o şu burada hizmet firma nakliyat taşıma taşımacılık ankara istanbul özdemir akif".split(/\s+/u));
const sourceExtensions = new Set([".js", ".jsx", ".ts", ".tsx", ".json", ".md", ".mjs", ".cjs"]);

function decodeHtml(value) {
    return value
        .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
        .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(Number.parseInt(n, 16)))
        .replaceAll("&nbsp;", " ")
        .replaceAll("&amp;", "&")
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">")
        .replaceAll("&quot;", '"')
        .replaceAll("&#39;", "'");
}

function stripHtml(html) {
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/iu)?.[1] || html;
    return decodeHtml(main
        .replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/giu, " ")
        .replace(/<br\s*\/?\s*>/giu, ". ")
        .replace(/<\/p>|<\/li>|<\/h[1-6]>|<\/section>|<\/article>/giu, ". ")
        .replace(/<[^>]+>/g, " "))
        .replace(/\s+/gu, " ")
        .trim();
}

function normalizeText(value) {
    return value
        .normalize("NFKC")
        .toLocaleLowerCase("tr-TR")
        .replace(/[^\p{L}\p{N}%+]+/gu, " ")
        .replace(/\s+/gu, " ")
        .trim();
}

function normalizeUrl(value) {
    const url = new URL(value);
    url.hash = "";
    url.search = "";
    if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/+$/u, "");
    return url.toString();
}

function hash(value) {
    return createHash("sha256").update(value).digest("hex");
}

function extractTag(html, tag) {
    return stripHtml(html.match(new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, "iu"))?.[1] || "");
}

function extractCanonical(html) {
    const tags = html.match(/<link\b[^>]*>/giu) || [];
    for (const tag of tags) {
        if (!/\brel=["'][^"']*canonical[^"']*["']/iu.test(tag)) continue;
        return decodeHtml(tag.match(/\bhref=["']([^"']+)["']/iu)?.[1] || "");
    }
    return "";
}

function extractRobots(html) {
    const tags = html.match(/<meta\b[^>]*>/giu) || [];
    const values = [];
    for (const tag of tags) {
        if (!/\bname=["'](?:robots|googlebot)["']/iu.test(tag)) continue;
        values.push(tag.match(/\bcontent=["']([^"']*)["']/iu)?.[1] || "");
    }
    return values.join(", ");
}

function extractLinks(html, origin) {
    const result = new Set();
    for (const match of html.matchAll(/<a\b[^>]*\bhref=["']([^"'#]+)["']/giu)) {
        try {
            const url = new URL(decodeHtml(match[1]), origin);
            if (url.origin === origin) result.add(normalizeUrl(url));
        } catch {
            // Ignore malformed or non-HTTP links.
        }
    }
    return [...result];
}

function sentences(text) {
    return text
        .split(/(?<=[.!?])\s+|\s*[|•]\s*/u)
        .map((item) => item.trim())
        .filter((item) => item.split(/\s+/u).length >= 5);
}

function words(text) {
    return normalizeText(text).split(/\s+/u).filter(Boolean);
}

function contentTokens(page) {
    const removable = new Set([
        ...page.pathSegments,
        ...page.pathSegments.flatMap((segment) => segment.split("-")),
        "ankaraakifnakliyat",
        "ankaraozdemirnakliyat",
    ]);
    return words(page.mainText).filter((token) => !stopWords.has(token) && !removable.has(token));
}

function shingles(tokens, size = 5) {
    const result = new Set();
    const limit = Math.min(tokens.length - size + 1, 1_200);
    for (let index = 0; index < limit; index += 1) {
        let value = 2166136261;
        for (const character of tokens.slice(index, index + size).join(" ")) {
            value ^= character.codePointAt(0);
            value = Math.imul(value, 16777619) >>> 0;
        }
        result.add(value);
    }
    return result;
}

function jaccard(left, right) {
    if (!left.size && !right.size) return 1;
    const smaller = left.size <= right.size ? left : right;
    const larger = left.size <= right.size ? right : left;
    let intersection = 0;
    for (const value of smaller) if (larger.has(value)) intersection += 1;
    return intersection / (left.size + right.size - intersection || 1);
}

function routeFamily(pathname) {
    const segments = pathname.split("/").filter(Boolean);
    if (!segments.length) return "home";
    if (segments[0] === "blog" && segments.length > 1) return "blog_post";
    if (segments[0] === "makaleler" && segments.length > 1) return "article_post";
    if (segments[0] === "islemler" && ["ankara", "istanbul"].includes(segments[1]) && segments.length >= 4) return `${segments[1]}_district_service`;
    if (segments[0] === "islemler" && ["ankara", "istanbul"].includes(segments[1]) && segments.length === 3) return `${segments[1]}_district`;
    if (segments[0] === "islemler" && segments.length === 2) return "city_page";
    if (segments[0] === "hizmetler" && segments.length === 2) return "service_page";
    return `static_${segments[0]}`;
}

function csvCell(value) {
    const text = value == null ? "" : String(value);
    return /[",\r\n]/u.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows, columns) {
    return [columns.join(","), ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(","))].join("\n");
}

async function fetchText(url, redirect = "follow") {
    let lastError;
    for (let attempt = 0; attempt < 3; attempt += 1) {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), timeoutMs);
        try {
            const response = await fetch(url, {
                redirect,
                signal: controller.signal,
                headers: { "user-agent": "NakliyeSeoStage2Audit/1.0 (+quality audit)" },
            });
            return { response, text: await response.text() };
        } catch (error) {
            lastError = error;
        } finally {
            clearTimeout(timer);
        }
        await new Promise((resolveDelay) => setTimeout(resolveDelay, 250 * (attempt + 1)));
    }
    throw lastError;
}

async function mapConcurrent(items, worker) {
    let cursor = 0;
    const results = new Array(items.length);
    await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, async () => {
        while (cursor < items.length) {
            const index = cursor++;
            results[index] = await worker(items[index], index);
        }
    }));
    return results;
}

async function getSitemapUrls(site) {
    const { response, text } = await fetchText(`${site.origin}/sitemap.xml`);
    if (!response.ok) throw new Error(`${site.name} sitemap HTTP ${response.status}`);
    return [...text.matchAll(/<loc>([\s\S]*?)<\/loc>/giu)].map((match) => decodeHtml(match[1].trim()));
}

async function crawlPage(site, url) {
    try {
        const { response, text: html } = await fetchText(url, "manual");
        const normalized = normalizeUrl(url);
        const pathname = new URL(normalized).pathname;
        const mainText = stripHtml(html);
        return {
            site: site.key,
            siteName: site.name,
            url: normalized,
            pathname,
            pathSegments: pathname.split("/").filter(Boolean),
            family: routeFamily(pathname),
            status: response.status,
            redirectLocation: response.headers.get("location") || "",
            title: extractTag(html, "title"),
            h1: extractTag(html, "h1"),
            canonical: extractCanonical(html),
            robots: extractRobots(html),
            mainText,
            wordCount: words(mainText).length,
            outboundInternalLinks: extractLinks(html, site.origin),
            html,
        };
    } catch (error) {
        const normalized = normalizeUrl(url);
        const pathname = new URL(normalized).pathname;
        return {
            site: site.key,
            siteName: site.name,
            url: normalized,
            pathname,
            pathSegments: pathname.split("/").filter(Boolean),
            family: routeFamily(pathname),
            status: 0,
            error: error.message,
            redirectLocation: "",
            title: "",
            h1: "",
            canonical: "",
            robots: "",
            mainText: "",
            wordCount: 0,
            outboundInternalLinks: [],
            html: "",
        };
    }
}

async function walkFiles(root, predicate, ignored = new Set(["node_modules", ".git"])) {
    const output = [];
    async function walk(directory) {
        for (const entry of await readdir(directory, { withFileTypes: true })) {
            if (entry.isDirectory() && ignored.has(entry.name)) continue;
            const path = join(directory, entry.name);
            if (entry.isDirectory()) await walk(path);
            else if (predicate(path)) output.push(path);
        }
    }
    if (existsSync(root)) await walk(root);
    return output;
}

function generatedPathFromFile(repo, file) {
    let path = relative(join(repo, ".next", "server", "app"), file).split(sep).join("/");
    if (!path.endsWith(".html")) return null;
    path = path.slice(0, -5);
    if (path === "index") return "/";
    if (path.endsWith("/index")) path = path.slice(0, -6);
    return `/${path}`.replace(/\/$/u, "") || "/";
}

async function loadGenerated(site) {
    const generatedRoot = join(site.repo, ".next", "server", "app");
    const files = await walkFiles(generatedRoot, (path) => path.endsWith(".html"), new Set([]));
    const map = new Map();
    for (const file of files) {
        const pathname = generatedPathFromFile(site.repo, file);
        if (!pathname) continue;
        const html = await readFile(file, "utf8");
        map.set(pathname, {
            file,
            title: extractTag(html, "title"),
            h1: extractTag(html, "h1"),
            mainText: stripHtml(html),
            html,
        });
    }
    return map;
}

async function scanSourceClaims(site) {
    const excludedRoots = new Set([".git", ".next", "node_modules", "out", "docs"]);
    const auditScript = resolve(import.meta.dirname, "seo-stage2-audit.mjs");
    const sourceFiles = (await walkFiles(
        site.repo,
        (path) => sourceExtensions.has(extname(path).toLowerCase()),
        excludedRoots,
    )).filter((path) => resolve(path) !== auditScript);
    const generatedFiles = await walkFiles(join(site.repo, ".next", "server", "app"), (path) => path.endsWith(".html"), new Set([]));
    const scan = async (files) => {
        const result = Object.fromEntries(knownClaims.map(([label]) => [label, { files: 0, matches: 0, samples: [] }]));
        for (const file of files) {
            const text = await readFile(file, "utf8");
            for (const [label, pattern] of knownClaims) {
                pattern.lastIndex = 0;
                const matches = [...text.matchAll(pattern)];
                if (!matches.length) continue;
                result[label].files += 1;
                result[label].matches += matches.length;
                if (result[label].samples.length < 8) result[label].samples.push(relative(site.repo, file).split(sep).join("/"));
            }
        }
        return result;
    };
    return { source: await scan(sourceFiles), generated: await scan(generatedFiles) };
}

function applyQualityMetrics(pages) {
    const byFamily = new Map();
    for (const page of pages) {
        const familyKey = `${page.site}:${page.family}`;
        if (!byFamily.has(familyKey)) byFamily.set(familyKey, []);
        byFamily.get(familyKey).push(page);
        page.sentences = sentences(page.mainText);
        page.normalizedSentences = page.sentences.map(normalizeText).filter(Boolean);
        page.shingles = shingles(contentTokens(page));
    }

    for (const familyPages of byFamily.values()) {
        const sentenceFrequency = new Map();
        for (const page of familyPages) {
            for (const sentence of new Set(page.normalizedSentences)) {
                sentenceFrequency.set(sentence, (sentenceFrequency.get(sentence) || 0) + 1);
            }
        }
        const templateThreshold = Math.max(2, Math.ceil(familyPages.length * 0.6));
        for (const page of familyPages) {
            const totalTokens = page.normalizedSentences.reduce((sum, sentence) => sum + words(sentence).length, 0) || 1;
            const templateTokens = page.normalizedSentences
                .filter((sentence) => (sentenceFrequency.get(sentence) || 0) >= templateThreshold)
                .reduce((sum, sentence) => sum + words(sentence).length, 0);
            const uniqueTokens = page.normalizedSentences
                .filter((sentence) => (sentenceFrequency.get(sentence) || 0) === 1)
                .reduce((sum, sentence) => sum + words(sentence).length, 0);
            page.templateRatio = templateTokens / totalTokens;
            page.uniqueSentenceRatio = uniqueTokens / totalTokens;
        }

        for (let leftIndex = 0; leftIndex < familyPages.length; leftIndex += 1) {
            const left = familyPages[leftIndex];
            left.nearestSimilarity = 0;
            left.nearestUrl = "";
            for (let rightIndex = leftIndex + 1; rightIndex < familyPages.length; rightIndex += 1) {
                const right = familyPages[rightIndex];
                const similarity = jaccard(left.shingles, right.shingles);
                if (similarity > left.nearestSimilarity) {
                    left.nearestSimilarity = similarity;
                    left.nearestUrl = right.url;
                }
                if (similarity > (right.nearestSimilarity || 0)) {
                    right.nearestSimilarity = similarity;
                    right.nearestUrl = left.url;
                }
            }
        }
    }

    const inbound = new Map(pages.map((page) => [page.url, 0]));
    for (const page of pages) {
        for (const target of page.outboundInternalLinks) {
            if (inbound.has(target)) inbound.set(target, inbound.get(target) + 1);
        }
    }

    for (const page of pages) {
        page.inboundInternalLinks = inbound.get(page.url) || 0;
        page.indexableOnPage = page.status === 200 && !/noindex/iu.test(page.robots) && normalizeUrl(page.canonical || page.url) === page.url;
        const programmatic = /_(?:district_service|district|page)$/u.test(page.family) || page.family === "city_page";
        page.duplicateRisk = page.nearestSimilarity >= 0.94;
        page.doorwayRisk = programmatic && (
            page.templateRatio >= 0.68 ||
            page.nearestSimilarity >= 0.88 ||
            page.uniqueSentenceRatio <= 0.14
        );
        page.thinRisk = page.wordCount < 220;

        if (page.status >= 300 && page.status < 400) page.classification = "REDIRECT";
        else if (page.status === 404 || page.status === 410) page.classification = "REMOVE";
        else if (page.status === 0) page.classification = "MANUAL_REVIEW";
        else if (!page.indexableOnPage) page.classification = "NOINDEX";
        else if (page.duplicateRisk && !page.family.startsWith("static_") && page.family !== "home") page.classification = "MERGE";
        else if (page.doorwayRisk) page.classification = "MANUAL_REVIEW";
        else if (page.thinRisk || page.wordCount < 450) page.classification = "IMPROVE";
        else page.classification = "KEEP";
    }
}

function crossSiteOverlap(pages) {
    const left = pages.filter((page) => page.site === "ozdemir");
    const rightByPath = new Map(pages.filter((page) => page.site === "akif").map((page) => [page.pathname, page]));
    const rows = [];
    for (const leftPage of left) {
        const rightPage = rightByPath.get(leftPage.pathname);
        if (!rightPage) continue;
        const bodySimilarity = jaccard(leftPage.shingles, rightPage.shingles);
        const titleSimilarity = jaccard(shingles(words(leftPage.title), 2), shingles(words(rightPage.title), 2));
        rows.push({
            intentPath: leftPage.pathname,
            ozdemirUrl: leftPage.url,
            akifUrl: rightPage.url,
            ozdemirTitle: leftPage.title,
            akifTitle: rightPage.title,
            bodySimilarity,
            titleSimilarity,
            likelySameQueryIntent: titleSimilarity >= 0.3 || bodySimilarity >= 0.35,
            gscQueryOverlap: "UNKNOWN",
            evidenceLevel: "on_page_only",
        });
    }
    return rows.sort((a, b) => Number(b.likelySameQueryIntent) - Number(a.likelySameQueryIntent) || b.bodySimilarity - a.bodySimilarity);
}

function productionDiff(site, pages, generated) {
    return pages.map((page) => {
        const local = generated.get(page.pathname);
        if (!local) return { site: site.key, url: page.url, localGenerated: false, titleMatch: false, h1Match: false, bodySimilarity: 0, mismatch: true };
        const bodySimilarity = jaccard(shingles(words(page.mainText)), shingles(words(local.mainText)));
        const titleMatch = normalizeText(page.title) === normalizeText(local.title);
        const h1Match = normalizeText(page.h1) === normalizeText(local.h1);
        return {
            site: site.key,
            url: page.url,
            localGenerated: true,
            localFile: relative(site.repo, local.file).split(sep).join("/"),
            titleMatch,
            h1Match,
            bodySimilarity,
            mismatch: !titleMatch || !h1Match || bodySimilarity < 0.985,
        };
    });
}

function collectLiveClaims(pages) {
    const predefined = {};
    for (const [label, pattern] of knownClaims) {
        const matchedPages = pages.filter((page) => {
            pattern.lastIndex = 0;
            return pattern.test(page.mainText);
        });
        predefined[label] = {
            pages: matchedPages.length,
            homepage: matchedPages.filter((page) => page.pathname === "/").map((page) => page.site),
            samples: matchedPages.slice(0, 10).map((page) => page.url),
        };
    }

    const candidates = new Map();
    for (const page of pages) {
        for (const sentence of page.sentences) {
            if (!trustClaimPattern.test(sentence)) continue;
            const normalized = normalizeText(sentence);
            if (normalized.length < 20 || normalized.length > 500) continue;
            if (!candidates.has(normalized)) candidates.set(normalized, { text: sentence, pages: new Set(), sites: new Set() });
            candidates.get(normalized).pages.add(page.url);
            candidates.get(normalized).sites.add(page.site);
        }
    }
    const general = [...candidates.values()]
        .map((item) => ({ text: item.text, pageCount: item.pages.size, sites: [...item.sites], samples: [...item.pages].slice(0, 8) }))
        .sort((a, b) => b.pageCount - a.pageCount || a.text.localeCompare(b.text, "tr"));
    return { predefined, general };
}

await mkdir(outputDir, { recursive: true });

const allPages = [];
const generatedBySite = new Map();
const sourceClaims = {};
for (const site of sites) {
    if (!existsSync(site.repo)) throw new Error(`Repository bulunamadı: ${site.repo}`);
    const urls = await getSitemapUrls(site);
    console.log(`${site.name}: ${urls.length} sitemap URL taranıyor...`);
    const pages = await mapConcurrent(urls, (url) => crawlPage(site, url));
    allPages.push(...pages);
    generatedBySite.set(site.key, await loadGenerated(site));
    sourceClaims[site.key] = await scanSourceClaims(site);
}

applyQualityMetrics(allPages);

const diffs = sites.flatMap((site) => productionDiff(site, allPages.filter((page) => page.site === site.key), generatedBySite.get(site.key)));
const liveClaims = collectLiveClaims(allPages);
const overlap = crossSiteOverlap(allPages);

const classificationCounts = Object.fromEntries(["KEEP", "IMPROVE", "MERGE", "NOINDEX", "REDIRECT", "REMOVE", "MANUAL_REVIEW"].map((key) => [key, allPages.filter((page) => page.classification === key).length]));
const siteSummaries = Object.fromEntries(sites.map((site) => {
    const pages = allPages.filter((page) => page.site === site.key);
    const siteDiffs = diffs.filter((item) => item.site === site.key);
    return [site.key, {
        name: site.name,
        origin: site.origin,
        sitemapUrls: pages.length,
        indexableOnPage: pages.filter((page) => page.indexableOnPage).length,
        doorwayRisk: pages.filter((page) => page.doorwayRisk).length,
        duplicateRisk: pages.filter((page) => page.duplicateRisk).length,
        thinRisk: pages.filter((page) => page.thinRisk).length,
        generatedMapped: siteDiffs.filter((item) => item.localGenerated).length,
        productionMismatches: siteDiffs.filter((item) => item.mismatch).length,
        classifications: Object.fromEntries(Object.keys(classificationCounts).map((key) => [key, pages.filter((page) => page.classification === key).length])),
    }];
}));

const summary = {
    generatedAt: new Date().toISOString(),
    methodology: {
        searchConsole: "not_connected",
        serpProvider: "not_connected",
        classificationRule: "Conservative technical/content heuristic; programmatic risks are MANUAL_REVIEW without Search Console evidence.",
    },
    totalUrls: allPages.length,
    classificationCounts,
    riskCounts: {
        doorway: allPages.filter((page) => page.doorwayRisk).length,
        duplicate: allPages.filter((page) => page.duplicateRisk).length,
        thin: allPages.filter((page) => page.thinRisk).length,
    },
    productionDiff: {
        mapped: diffs.filter((item) => item.localGenerated).length,
        mismatch: diffs.filter((item) => item.mismatch).length,
        missingGenerated: diffs.filter((item) => !item.localGenerated).length,
    },
    crossSiteOverlap: {
        exactPathPairs: overlap.length,
        likelySameQueryIntent: overlap.filter((item) => item.likelySameQueryIntent).length,
        gscQueryEvidence: "not_connected",
    },
    sites: siteSummaries,
};

const urlRows = allPages.map((page) => ({
    site: page.site,
    url: page.url,
    family: page.family,
    classification: page.classification,
    status: page.status,
    indexable_on_page: page.indexableOnPage,
    word_count: page.wordCount,
    template_ratio: page.templateRatio.toFixed(4),
    unique_sentence_ratio: page.uniqueSentenceRatio.toFixed(4),
    nearest_similarity: page.nearestSimilarity.toFixed(4),
    nearest_url: page.nearestUrl,
    doorway_risk: page.doorwayRisk,
    duplicate_risk: page.duplicateRisk,
    thin_risk: page.thinRisk,
    internal_links_in: page.inboundInternalLinks,
    internal_links_out: page.outboundInternalLinks.length,
    title: page.title,
    h1: page.h1,
    canonical: page.canonical,
    gsc_clicks_28d: "UNKNOWN",
    gsc_impressions_28d: "UNKNOWN",
    gsc_ctr_28d: "UNKNOWN",
    gsc_position_28d: "UNKNOWN",
    gsc_index_status: "UNKNOWN",
    protected: false,
}));

const csvColumns = Object.keys(urlRows[0]);
await Promise.all([
    writeFile(join(outputDir, "summary.json"), `${JSON.stringify(summary, null, 2)}\n`),
    writeFile(join(outputDir, "url-quality.csv"), `${toCsv(urlRows, csvColumns)}\n`),
    writeFile(join(outputDir, "url-quality.json"), `${JSON.stringify(urlRows, null, 2)}\n`),
    writeFile(join(outputDir, "production-diff.json"), `${JSON.stringify(diffs, null, 2)}\n`),
    writeFile(join(outputDir, "claims.json"), `${JSON.stringify({ sourceClaims, liveClaims }, null, 2)}\n`),
    writeFile(join(outputDir, "cross-site-overlap.json"), `${JSON.stringify(overlap, null, 2)}\n`),
]);

console.log(JSON.stringify(summary, null, 2));
console.log(`Rapor verileri: ${outputDir}`);
