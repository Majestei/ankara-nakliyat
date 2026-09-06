import { mkdir, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const runDate = new Date().toISOString().slice(0, 10);
const outputDir = resolve(`docs/seo/stage2/${runDate}`);
const targets = [
    { source: "live organic", url: "https://www.anadolunakliyat.gen.tr/" },
    { source: "live organic", url: "https://www.ankaraevdenevenakliyat.com.tr/" },
    { source: "live organic", url: "https://www.protrans.com.tr/" },
    { source: "live organic", url: "https://www.dehanakliyat.com.tr/" },
    { source: "related commercial SERP", url: "https://www.expernakliyat.com/" },
    { source: "related commercial SERP", url: "https://otasnakliyat.com.tr/" },
    { source: "related commercial SERP", url: "https://ankaraasansorlunakliyat.com/" },
    { source: "live paid competitor", url: "https://www.movernakliyat.com.tr/hizmetler/ankara-evden-eve-nakliyat" },
    { source: "live paid competitor", url: "https://www.ankaraasyanakliyat.com.tr/ankara/ankara/" },
    { source: "live local pack", url: "https://luxvipnakliyat.com.tr/" },
];

const rows = await Promise.all(targets.map(inspect));
await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "competitor-snapshot.json"), `${JSON.stringify({ generatedAt: new Date().toISOString(), rows }, null, 2)}\n`);
await writeCsv(join(outputDir, "competitor-snapshot.csv"), rows.map(({ headings, ...row }) => ({ ...row, headings: headings.join(" | ") })));
console.log(JSON.stringify(rows, null, 2));

async function inspect(target) {
    const started = performance.now();
    try {
        const response = await fetch(target.url, {
            redirect: "follow",
            headers: { "user-agent": "Mozilla/5.0 (compatible; NakliyeSEOResearch/1.0)" },
            signal: AbortSignal.timeout(30_000),
        });
        const html = await response.text();
        const finalUrl = response.url;
        const origin = new URL(finalUrl).origin;
        const text = stripHtml(html);
        const links = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"'#]+)["']/giu)]
            .map((match) => {
                try { return new URL(decodeHtml(match[1]), finalUrl); } catch { return null; }
            })
            .filter(Boolean);
        const schemaTypes = [...html.matchAll(/["']@type["']\s*:\s*["']([^"']+)["']/giu)].map((match) => match[1]);
        const headings = [...html.matchAll(/<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/giu)].map((match) => `${match[1]}:${stripHtml(match[2])}`).filter((item) => item.length > 2);
        return {
            source: target.source,
            requestedUrl: target.url,
            finalUrl,
            status: response.status,
            fetchMs: Math.round(performance.now() - started),
            title: extract(html, /<title\b[^>]*>([\s\S]*?)<\/title>/iu),
            description: extract(html, /<meta\b(?=[^>]*\bname=["']description["'])(?=[^>]*\bcontent=["']([^"']*)["'])[^>]*>/iu),
            h1: headings.find((item) => item.startsWith("1:"))?.slice(2) || "",
            h2Count: headings.filter((item) => item.startsWith("2:")).length,
            wordCount: words(text).length,
            internalLinks: new Set(links.filter((url) => url.origin === origin).map((url) => `${url.origin}${url.pathname}`)).size,
            externalLinks: new Set(links.filter((url) => url.origin !== origin).map((url) => url.origin)).size,
            schemaTypes: [...new Set(schemaTypes)].join(" | "),
            hasFaqText: /sıkça sorulan|sss|frequently asked/iu.test(text),
            hasPriceText: /\bfiyat(?:lar|ları|landırma)?\b|\bTL\b/iu.test(text),
            hasReviewText: /müşteri yorum|referans|değerlendirme|review/iu.test(text),
            hasTrustEvidenceText: /K3|poliçe|sigorta|kuruluş|yıl(?:dır|lık)?|adres/iu.test(text),
            headings: headings.slice(0, 30),
        };
    } catch (error) {
        return { source: target.source, requestedUrl: target.url, status: 0, fetchMs: Math.round(performance.now() - started), error: error.message, headings: [] };
    }
}

function stripHtml(html) {
    return decodeHtml(html
        .replace(/<(script|style|noscript|svg)\b[^>]*>[\s\S]*?<\/\1>/giu, " ")
        .replace(/<[^>]+>/gu, " "))
        .replace(/\s+/gu, " ")
        .trim();
}

function extract(html, pattern) {
    return stripHtml(html.match(pattern)?.[1] || "");
}

function decodeHtml(value) {
    return value
        .replace(/&#(\d+);/gu, (_, number) => String.fromCodePoint(Number(number)))
        .replace(/&#x([\da-f]+);/giu, (_, number) => String.fromCodePoint(Number.parseInt(number, 16)))
        .replaceAll("&nbsp;", " ")
        .replaceAll("&amp;", "&")
        .replaceAll("&lt;", "<")
        .replaceAll("&gt;", ">")
        .replaceAll("&quot;", '"')
        .replaceAll("&#39;", "'");
}

function words(value) {
    return value.normalize("NFKC").split(/[^\p{L}\p{N}%+]+/u).filter(Boolean);
}

async function writeCsv(path, rows) {
    const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];
    const csv = [columns.join(","), ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(","))].join("\n");
    await writeFile(path, `${csv}\n`);
}

function csvCell(value) {
    const text = value == null ? "" : String(value);
    return /[",\r\n]/u.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
