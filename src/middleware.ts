import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import redirectsData from '@/data/redirects.json';

// Create a Map for O(1) lookups
const redirectMap = new Map<string, string>();
redirectsData.forEach((r: { source: string; destination: string }) => {
    redirectMap.set(r.source, r.destination);
});

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    
    // Check if the current pathname is in our redirects map
    if (redirectMap.has(pathname)) {
        const destination = redirectMap.get(pathname)!;
        return NextResponse.redirect(new URL(destination, request.url), 301);
    }

    return NextResponse.next();
}

export const config = {
    // Match paths that could potentially be redirected
    matcher: [
        '/makaleler/:path*',
        '/blog/:path*'
    ],
};
