import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redirectsData from '@/data/redirects.json';

// Create a Map for O(1) lookups
const redirectMap = new Map<string, string>();
redirectsData.forEach((r: { source: string; destination: string }) => {
    redirectMap.set(r.source, r.destination);
});

const ilceHizmetSlugs = new Set([
    "evden-eve-nakliyat", "ofis-tasima", "asansorlu-tasima", 
    "parca-esya-tasima", "esya-depolama", "sehir-ici-nakliyat", 
    "sigortali-tasima", "nakliyat-fiyatlari"
]);

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // Check if the current pathname is in our redirects map
    if (redirectMap.has(pathname)) {
        const destination = redirectMap.get(pathname)!;
        return NextResponse.redirect(new URL(destination, request.url), 301);
    }

    // Istanbul neighborhood pages redirect to parent district page (301)
    if (pathname.startsWith('/islemler/istanbul/')) {
        const parts = pathname.split('/').filter(Boolean); // ['islemler', 'istanbul', 'ilce', 'slug']
        if (parts.length >= 4) {
            const ilce = parts[2];
            const sub = parts[3];
            if (!ilceHizmetSlugs.has(sub)) {
                return NextResponse.redirect(new URL(`/islemler/istanbul/${ilce}`, request.url), 301);
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    // Match paths that could potentially be redirected
    matcher: [
        '/makaleler/:path*',
        '/blog/:path*',
        '/islemler/istanbul/:path*'
    ],
};
