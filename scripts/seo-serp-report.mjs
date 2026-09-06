import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const runDate = new Date().toISOString().slice(0, 10);
const outputDir = resolve(`docs/seo/stage2/${runDate}`);
await loadEnv(resolve(".env.seo.local"));

const apiKey = process.env.SERPAPI_API_KEY;
if (!apiKey) throw new Error("SERPAPI_API_KEY yok. Anahtarı yalnızca .env.seo.local içinde saklayın.");

const location = process.env.SERP_LOCATION || "Ankara,Turkey";
const device = process.env.SERP_DEVICE || "mobile";
const queries = (process.env.SERP_QUERIES || [
    "ankara evden eve nakliyat",
    "ankara nakliyat",
    "ankara nakliye firmaları",
    "asansörlü nakliyat ankara",
    "ofis taşıma ankara",
    "şehirler arası nakliyat ankara",
    "sincan evden eve nakliyat",
    "çankaya evden eve nakliyat",
    "keçiören evden eve nakliyat",
    "yenimahalle evden eve nakliyat",
].join("|")).split("|").map((item) => item.trim()).filter(Boolean);

const trackedDomains = ["ankaraozdemirnakliyat.com", "ankaraakifnakliyat.com"];
const snapshot = [];
for (const query of queries) {
    console.log(`SERP: ${query}`);
    const url = new URL("https://serpapi.com/search.json");
    for (const [key, value] of Object.entries({
        engine: "google",
        q: query,
        location,
        google_domain: "google.com.tr",
        gl: "tr",
        hl: "tr",
        device,
        num: "20",
        pws: "0",
        api_key: apiKey,
    })) url.searchParams.set(key, value);
    const response = await fetch(url);
    const body = await response.json();
    if (!response.ok || body.error) throw new Error(`SerpApi (${response.status}): ${body.error || JSON.stringify(body)}`);
    const organic = (body.organic_results || []).map((row) => ({
        position: row.position,
        title: row.title || "",
        link: row.link || "",
        domain: hostname(row.link),
        snippet: row.snippet || "",
    }));
    snapshot.push({
        query,
        capturedAt: body.search_metadata?.created_at || new Date().toISOString(),
        locationRequested: body.search_parameters?.location || location,
        locationUsed: body.search_parameters?.location_used || "",
        device: body.search_parameters?.device || device,
        organic,
        tracked: Object.fromEntries(trackedDomains.map((domain) => {
            const result = organic.find((row) => row.domain === domain || row.domain.endsWith(`.${domain}`));
            return [domain, result ? { position: result.position, url: result.link } : { position: null, url: "" }];
        })),
        relatedSearches: (body.related_searches || []).map((row) => row.query).filter(Boolean),
    });
}

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "serp-mobile-ankara.json"), `${JSON.stringify(snapshot, null, 2)}\n`);
await writeCsv(join(outputDir, "serp-mobile-ankara.csv"), snapshot.flatMap((item) => item.organic.map((row) => ({ query: item.query, ...row }))));
console.log(`SERP raporu: ${join(outputDir, "serp-mobile-ankara.json")}`);

function hostname(value) {
    try { return new URL(value).hostname.replace(/^www\./u, ""); } catch { return ""; }
}

async function loadEnv(path) {
    if (!existsSync(path)) return;
    const text = await readFile(path, "utf8");
    for (const line of text.split(/\r?\n/u)) {
        const match = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*?)\s*$/u);
        if (!match || match[2] === "" || process.env[match[1]]) continue;
        process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/u, "$2");
    }
}

async function writeCsv(path, rows) {
    if (!rows.length) return writeFile(path, "\n");
    const columns = Object.keys(rows[0]);
    const csv = [columns.join(","), ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(","))].join("\n");
    await writeFile(path, `${csv}\n`);
}

function csvCell(value) {
    const text = value == null ? "" : String(value);
    return /[",\r\n]/u.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
