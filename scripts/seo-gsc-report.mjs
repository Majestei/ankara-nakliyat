import { createSign } from "node:crypto";
import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const runDate = new Date().toISOString().slice(0, 10);
const outputDir = resolve(`docs/seo/stage2/${runDate}`);
const qualityPath = join(outputDir, "url-quality.json");
const readonlyScope = "https://www.googleapis.com/auth/webmasters.readonly";

await loadEnv(resolve(".env.seo.local"));

const properties = {
    ozdemir: process.env.GSC_OZDEMIR_PROPERTY || "https://ankaraozdemirnakliyat.com/",
    akif: process.env.GSC_AKIF_PROPERTY || "https://www.ankaraakifnakliyat.com/",
};

const endDate = shiftDate(new Date(), -3);
const periods = [7, 14, 28, 90].map((days) => ({
    days,
    current: { start: dateString(shiftDate(endDate, -(days - 1))), end: dateString(endDate) },
    previous: { start: dateString(shiftDate(endDate, -(days * 2 - 1))), end: dateString(shiftDate(endDate, -days)) },
}));

if (!existsSync(qualityPath)) {
    throw new Error(`Önce npm run seo:stage2 çalıştırılmalı: ${qualityPath}`);
}

const inventory = JSON.parse(await readFile(qualityPath, "utf8"));
const output = { generatedAt: new Date().toISOString(), finalizedThrough: dateString(endDate), properties: {} };

for (const [site, property] of Object.entries(properties)) {
    const auth = await getAccessToken(site);
    console.log(`${site}: Search Console performans pencereleri alınıyor...`);
    const siteRows = inventory.filter((row) => row.site === site);
    const windows = {};

    for (const period of periods) {
        const current = await searchAnalytics(auth, property, period.current);
        const previous = await searchAnalytics(auth, property, period.previous);
        windows[`${period.days}d`] = {
            dates: { current: period.current, previous: period.previous },
            current,
            previous,
        };
    }

    const pageStates = classifyPages(siteRows, windows);
    const queryStates = classifyQueries(windows["28d"].current, windows["28d"].previous);
    const topQueries = aggregateQueries(windows["28d"].current)
        .sort((left, right) => right.clicks - left.clicks || right.impressions - left.impressions)
        .slice(0, 20);
    const inspection = process.env.GSC_INSPECT === "1"
        ? await inspectUrls(auth, property, siteRows.map((row) => row.url))
        : [];

    output.properties[site] = {
        property,
        windows: Object.fromEntries(Object.entries(windows).map(([key, value]) => [key, {
            dates: value.dates,
            currentTotals: totals(value.current),
            previousTotals: totals(value.previous),
            returnedCurrentRows: value.current.length,
            returnedPreviousRows: value.previous.length,
        }])),
        topQueries,
        fastestDecliningQueries: queryStates.filter((row) => ["DECLINING", "CRITICAL"].includes(row.state)).sort((a, b) => a.clickChange - b.clickChange || a.positionChange - b.positionChange).slice(0, 20),
        positionOpportunities: queryStates.filter((row) => row.position >= 4 && row.position <= 20).sort((a, b) => b.impressions - a.impressions).slice(0, 20),
        queryStates,
        stateCounts: countBy(pageStates, (row) => row.state),
        pageStates,
        urlInspection: inspection,
    };

    await writeCsv(join(outputDir, `gsc-${site}-page-states.csv`), pageStates);
    await writeCsv(join(outputDir, `gsc-${site}-query-states.csv`), queryStates);
    await writeCsv(join(outputDir, `gsc-${site}-top-queries.csv`), topQueries);
    if (inspection.length) await writeCsv(join(outputDir, `gsc-${site}-url-inspection.csv`), inspection);
}

output.crossSiteQueryOverlap = findCrossSiteQueryOverlap(output.properties);

await mkdir(outputDir, { recursive: true });
await writeFile(join(outputDir, "gsc-summary.json"), `${JSON.stringify(output, null, 2)}\n`);
console.log(`GSC raporu: ${join(outputDir, "gsc-summary.json")}`);

async function loadEnv(path) {
    if (!existsSync(path)) return;
    const text = await readFile(path, "utf8");
    for (const line of text.split(/\r?\n/u)) {
        const match = line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*?)\s*$/u);
        if (!match || match[2] === "" || process.env[match[1]]) continue;
        process.env[match[1]] = match[2].replace(/^(["'])(.*)\1$/u, "$2");
    }
}

async function getAccessToken(site) {
    const sitePrefix = `GSC_${site.toUpperCase()}`;
    if (process.env[`${sitePrefix}_ACCESS_TOKEN`]) return { accessToken: process.env[`${sitePrefix}_ACCESS_TOKEN`], quotaProject: "" };
    if (process.env.GSC_ACCESS_TOKEN) return { accessToken: process.env.GSC_ACCESS_TOKEN, quotaProject: "" };
    const candidates = [
        process.env[`${sitePrefix}_CREDENTIALS_PATH`],
        process.env.GSC_CREDENTIALS_PATH,
        process.env.GOOGLE_APPLICATION_CREDENTIALS,
        process.env.APPDATA ? join(process.env.APPDATA, "gcloud", "application_default_credentials.json") : "",
    ].filter(Boolean);
    const path = candidates.find((candidate) => existsSync(candidate));
    if (!path) {
        throw new Error(`${site} için Search Console OAuth/servis hesabı kimliği yok. .env.seo.local içine ${sitePrefix}_CREDENTIALS_PATH, ${sitePrefix}_ACCESS_TOKEN veya ortak GSC_CREDENTIALS_PATH/GSC_ACCESS_TOKEN ekleyin.`);
    }
    const credentials = JSON.parse(await readFile(path, "utf8"));
    if (credentials.type === "service_account") return {
        accessToken: await serviceAccountToken(credentials),
        quotaProject: credentials.quota_project_id || credentials.project_id || "",
    };
    if (credentials.type === "authorized_user" && credentials.refresh_token) return {
        accessToken: await refreshUserToken(credentials),
        quotaProject: credentials.quota_project_id || "",
    };
    throw new Error("Kimlik dosyası desteklenmiyor; service_account veya refresh_token içeren authorized_user gerekir.");
}

async function serviceAccountToken(credentials) {
    const now = Math.floor(Date.now() / 1000);
    const assertion = `${base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${base64url(JSON.stringify({
        iss: credentials.client_email,
        scope: readonlyScope,
        aud: credentials.token_uri || "https://oauth2.googleapis.com/token",
        iat: now,
        exp: now + 3600,
    }))}`;
    const signer = createSign("RSA-SHA256");
    signer.update(assertion);
    signer.end();
    const jwt = `${assertion}.${signer.sign(credentials.private_key, "base64url")}`;
    return requestToken(credentials.token_uri || "https://oauth2.googleapis.com/token", {
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
    });
}

async function refreshUserToken(credentials) {
    return requestToken(credentials.token_uri || "https://oauth2.googleapis.com/token", {
        grant_type: "refresh_token",
        client_id: credentials.client_id,
        ...(credentials.client_secret ? { client_secret: credentials.client_secret } : {}),
        refresh_token: credentials.refresh_token,
    });
}

async function requestToken(url, fields) {
    const response = await fetch(url, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(fields),
    });
    const body = await response.json();
    if (!response.ok || !body.access_token) throw new Error(`OAuth token hatası (${response.status}): ${JSON.stringify(body)}`);
    return body.access_token;
}

async function searchAnalytics(auth, property, range) {
    const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(property)}/searchAnalytics/query`, {
        method: "POST",
        headers: {
            authorization: `Bearer ${auth.accessToken}`,
            "content-type": "application/json",
            ...(auth.quotaProject ? { "x-goog-user-project": auth.quotaProject } : {}),
        },
        body: JSON.stringify({
            startDate: range.start,
            endDate: range.end,
            dimensions: ["page", "query"],
            type: "web",
            aggregationType: "auto",
            dataState: "final",
            rowLimit: 25_000,
            startRow: 0,
        }),
    });
    const body = await response.json();
    if (!response.ok) throw new Error(`GSC ${property} ${range.start}..${range.end} (${response.status}): ${JSON.stringify(body)}`);
    return (body.rows || []).map((row) => ({
        page: row.keys?.[0] || "",
        query: row.keys?.[1] || "",
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0,
    }));
}

function aggregatePages(rows) {
    const pages = new Map();
    for (const row of rows) {
        const item = pages.get(row.page) || { clicks: 0, impressions: 0, weightedPosition: 0, queries: [] };
        item.clicks += row.clicks;
        item.impressions += row.impressions;
        item.weightedPosition += row.position * row.impressions;
        item.queries.push(row);
        pages.set(row.page, item);
    }
    for (const item of pages.values()) {
        item.ctr = item.impressions ? item.clicks / item.impressions : 0;
        item.position = item.impressions ? item.weightedPosition / item.impressions : 0;
        delete item.weightedPosition;
    }
    return pages;
}

function aggregateQueries(rows) {
    const queries = new Map();
    for (const row of rows) {
        const item = queries.get(row.query) || { query: row.query, clicks: 0, impressions: 0, weightedPosition: 0, pages: new Set() };
        item.clicks += row.clicks;
        item.impressions += row.impressions;
        item.weightedPosition += row.position * row.impressions;
        item.pages.add(row.page);
        queries.set(row.query, item);
    }
    return [...queries.values()].map((item) => ({
        query: item.query,
        clicks: item.clicks,
        impressions: item.impressions,
        ctr: item.impressions ? item.clicks / item.impressions : 0,
        position: item.impressions ? item.weightedPosition / item.impressions : 0,
        rankingPages: item.pages.size,
    }));
}

function classifyPages(siteRows, windows) {
    const current28 = aggregatePages(windows["28d"].current);
    const previous28 = aggregatePages(windows["28d"].previous);
    const current90 = aggregatePages(windows["90d"].current);
    return siteRows.map((page) => {
        const current = current28.get(page.url) || zeroMetrics();
        const previous = previous28.get(page.url) || zeroMetrics();
        const long = current90.get(page.url) || zeroMetrics();
        const clickChange = ratioChange(current.clicks, previous.clicks);
        const impressionChange = ratioChange(current.impressions, previous.impressions);
        const positionChange = previous.position && current.position ? previous.position - current.position : 0;
        let state = "WATCH";
        if ((previous.clicks >= 10 && clickChange <= -0.5) || positionChange <= -7) state = "CRITICAL";
        else if ((previous.clicks >= 5 && clickChange <= -0.2) || (previous.impressions >= 100 && impressionChange <= -0.25) || positionChange <= -3) state = "DECLINING";
        else if (current.clicks >= 10 && current.position > 0 && current.position <= 3 && clickChange >= -0.1) state = "WINNING";
        else if ((current.clicks >= 5 && clickChange >= 0.2) || (current.impressions >= 100 && positionChange >= 2)) state = "GROWING";
        else if (long.impressions && Math.abs(clickChange) < 0.15 && Math.abs(positionChange) < 1.5) state = "STABLE";
        return {
            site: page.site,
            url: page.url,
            heuristicClassification: page.classification,
            state,
            clicks28: current.clicks,
            clicksPrevious28: previous.clicks,
            clickChange,
            impressions28: current.impressions,
            impressionsPrevious28: previous.impressions,
            impressionChange,
            ctr28: current.ctr,
            position28: current.position,
            positionChange,
            clicks90: long.clicks,
            impressions90: long.impressions,
            visibility: long.impressions ? "RANKED" : "NEVER_RANKED",
            protected: state === "WINNING",
            topQueries28: current.queries.slice().sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions).slice(0, 10).map((row) => row.query).join(" | "),
        };
    });
}

function classifyQueries(currentRows, previousRows) {
    const current = new Map(aggregateQueries(currentRows).map((row) => [row.query, row]));
    const previous = new Map(aggregateQueries(previousRows).map((row) => [row.query, row]));
    return [...new Set([...current.keys(), ...previous.keys()])].map((query) => {
        const now = current.get(query) || { query, clicks: 0, impressions: 0, ctr: 0, position: 0, rankingPages: 0 };
        const before = previous.get(query) || { clicks: 0, impressions: 0, ctr: 0, position: 0, rankingPages: 0 };
        const clickChange = ratioChange(now.clicks, before.clicks);
        const impressionChange = ratioChange(now.impressions, before.impressions);
        const positionChange = before.position && now.position ? before.position - now.position : 0;
        let state = "WATCH";
        if ((before.clicks >= 10 && clickChange <= -0.5) || positionChange <= -7) state = "CRITICAL";
        else if ((before.clicks >= 5 && clickChange <= -0.2) || (before.impressions >= 100 && impressionChange <= -0.25) || positionChange <= -3) state = "DECLINING";
        else if (now.clicks >= 10 && now.position > 0 && now.position <= 3 && clickChange >= -0.1) state = "WINNING";
        else if ((now.clicks >= 5 && clickChange >= 0.2) || (now.impressions >= 100 && positionChange >= 2)) state = "GROWING";
        else if (now.impressions && Math.abs(clickChange) < 0.15 && Math.abs(positionChange) < 1.5) state = "STABLE";
        return {
            query,
            state,
            clicks: now.clicks,
            previousClicks: before.clicks,
            clickChange,
            impressions: now.impressions,
            previousImpressions: before.impressions,
            impressionChange,
            ctr: now.ctr,
            previousCtr: before.ctr,
            position: now.position,
            previousPosition: before.position,
            positionChange,
            rankingPages: now.rankingPages,
        };
    });
}

function findCrossSiteQueryOverlap(propertiesOutput) {
    const left = new Map((propertiesOutput.ozdemir?.queryStates || []).filter((row) => row.impressions > 0).map((row) => [row.query, row]));
    const right = new Map((propertiesOutput.akif?.queryStates || []).filter((row) => row.impressions > 0).map((row) => [row.query, row]));
    return [...left.keys()].filter((query) => right.has(query)).map((query) => {
        const ozdemir = left.get(query);
        const akif = right.get(query);
        const idealOwner = ozdemir.clicks !== akif.clicks
            ? (ozdemir.clicks > akif.clicks ? "ozdemir" : "akif")
            : (ozdemir.position <= akif.position ? "ozdemir" : "akif");
        return { query, idealOwner, ozdemirClicks: ozdemir.clicks, ozdemirImpressions: ozdemir.impressions, ozdemirPosition: ozdemir.position, akifClicks: akif.clicks, akifImpressions: akif.impressions, akifPosition: akif.position };
    }).sort((a, b) => (b.ozdemirImpressions + b.akifImpressions) - (a.ozdemirImpressions + a.akifImpressions));
}

async function inspectUrls(auth, property, urls) {
    const results = [];
    let cursor = 0;
    const workers = Array.from({ length: 4 }, async () => {
        while (cursor < urls.length) {
            const url = urls[cursor++];
            const response = await fetch("https://searchconsole.googleapis.com/v1/urlInspection/index:inspect", {
                method: "POST",
                headers: {
                    authorization: `Bearer ${auth.accessToken}`,
                    "content-type": "application/json",
                    ...(auth.quotaProject ? { "x-goog-user-project": auth.quotaProject } : {}),
                },
                body: JSON.stringify({ inspectionUrl: url, siteUrl: property, languageCode: "tr-TR" }),
            });
            const body = await response.json();
            const index = body.inspectionResult?.indexStatusResult || {};
            results.push({
                url,
                httpStatus: response.status,
                verdict: index.verdict || "",
                coverageState: index.coverageState || "",
                indexingState: index.indexingState || "",
                pageFetchState: index.pageFetchState || "",
                lastCrawlTime: index.lastCrawlTime || "",
                googleCanonical: index.googleCanonical || "",
                userCanonical: index.userCanonical || "",
                crawledAs: index.crawledAs || "",
                error: response.ok ? "" : JSON.stringify(body),
            });
        }
    });
    await Promise.all(workers);
    return results.sort((left, right) => left.url.localeCompare(right.url));
}

function totals(rows) {
    const byPage = aggregatePages(rows);
    const values = [...byPage.values()];
    const impressions = values.reduce((sum, row) => sum + row.impressions, 0);
    const clicks = values.reduce((sum, row) => sum + row.clicks, 0);
    return { clicks, impressions, ctr: impressions ? clicks / impressions : 0, rankingPages: values.length };
}

function zeroMetrics() {
    return { clicks: 0, impressions: 0, ctr: 0, position: 0, queries: [] };
}

function ratioChange(current, previous) {
    if (!previous) return current ? 1 : 0;
    return (current - previous) / previous;
}

function countBy(items, selector) {
    return items.reduce((result, item) => {
        const key = selector(item);
        result[key] = (result[key] || 0) + 1;
        return result;
    }, {});
}

function shiftDate(date, days) {
    const result = new Date(date);
    result.setUTCDate(result.getUTCDate() + days);
    return result;
}

function dateString(date) {
    return date.toISOString().slice(0, 10);
}

function base64url(value) {
    return Buffer.from(value).toString("base64url");
}

async function writeCsv(path, rows) {
    await mkdir(outputDir, { recursive: true });
    if (!rows.length) return writeFile(path, "\n");
    const columns = Object.keys(rows[0]);
    const csv = [columns.join(","), ...rows.map((row) => columns.map((column) => csvCell(row[column])).join(","))].join("\n");
    await writeFile(path, `${csv}\n`);
}

function csvCell(value) {
    const text = value == null ? "" : String(value);
    return /[",\r\n]/u.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
