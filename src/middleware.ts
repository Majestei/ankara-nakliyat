import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redirectsData from '@/data/redirects.json';
import recoveryRedirects from '@/data/recoveryRedirects.json';

// Create a Map for O(1) lookups
const redirectMap = new Map<string, string>();
const existingAliases = [
    { source: '/hizmetler/evden-eve-nakliyat', destination: '/evden-eve-nakliyat' },
    { source: '/hizmetler/sigorta', destination: '/hizmetler/nakliyat-sigortasi' },
    { source: '/sitemap-2.xml', destination: '/sitemap.xml' },
    { source: '/sitemap-3.xml', destination: '/sitemap.xml' },
    { source: '/islemler/ankara', destination: '/islemler' },
];
[...redirectsData, ...existingAliases, ...recoveryRedirects].forEach((r: { source: string; destination: string }) => {
    redirectMap.set(r.source, r.destination);
});

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const normalized = pathname.replace(/\/+$/, '') || '/';
    let destination = normalized;
    const visited = new Set<string>();
    while (redirectMap.has(destination) && !visited.has(destination)) {
        visited.add(destination);
        destination = redirectMap.get(destination)!;
    }
    const host = request.headers.get('host') || request.nextUrl.host;
    const isAlternateHost = host.split(':')[0] === 'www.ankaraozdemirnakliyat.com';
    if (destination !== pathname || isAlternateHost) {
        // A plain URL drops NextURL's retained trailingSlash state, avoiding loops.
        const target = new URL(destination, request.url);
        target.host = host;
        target.search = request.nextUrl.search;
        if (isAlternateHost) {
            target.hostname = 'ankaraozdemirnakliyat.com';
            target.protocol = 'https:';
            target.port = '';
        }
        return NextResponse.redirect(target, 301);
    }

    return NextResponse.next();
}

export const config = {
    // Match paths that could potentially be redirected
    matcher: ['/((?!api/|_next/).*)'],
};
