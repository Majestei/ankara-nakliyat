/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    compress: true,
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    experimental: {
        optimizePackageImports: ['react-icons', 'framer-motion'],
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [{ type: 'host', value: 'www.ankaraozdemirnakliyat.com' }],
                destination: 'https://ankaraozdemirnakliyat.com/:path*',
                permanent: true,
            },
            {
                source: '/hizmetler/evden-eve-nakliyat',
                destination: '/evden-eve-nakliyat',
                permanent: true,
            },
            {
                source: '/hizmetler/sigorta',
                destination: '/hizmetler/nakliyat-sigortasi',
                permanent: true,
            },
            {
                source: '/sitemap-2.xml',
                destination: '/sitemap.xml',
                permanent: true,
            },
            {
                source: '/sitemap-3.xml',
                destination: '/sitemap.xml',
                permanent: true,
            }
        ];
    },
    async headers() {
        const cspHeader = `
          default-src 'self';
          script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com;
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: https:;
          font-src 'self' data:;
          connect-src 'self' https://formsubmit.co https://www.google-analytics.com https://*.google-analytics.com https://stats.g.doubleclick.net;
          object-src 'none';
          base-uri 'self';
          frame-ancestors 'self';
        `.replace(/\s{2,}/g, ' ').trim();

        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader,
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=()',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
