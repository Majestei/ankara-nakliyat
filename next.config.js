/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    compress: true,
    async redirects() {
        return [
            {
                source: '/makaleler',
                destination: '/blog',
                permanent: true,
            },
            {
                source: '/makaleler/:path*',
                destination: '/blog',
                permanent: true,
            },
            {
                source: '/hizmetler/evden-eve-nakliyat',
                destination: '/islemler/ankara/evden-eve-nakliyat',
                permanent: true,
            },
            {
                source: '/islemler/sancaktepe/:path*',
                destination: '/islemler', // Redirect obsolete Istanbul links
                permanent: true,
            },
            {
                source: '/islemler/istanbul/:ilce/:slug((?!evden-eve-nakliyat|ofis-tasima|asansorlu-tasima|parca-esya-tasima|esya-depolama|sehir-ici-nakliyat|sigortali-tasima|nakliyat-fiyatlari$).*)',
                destination: '/islemler/istanbul/:ilce',
                permanent: true,
            }
        ];
    },
    async headers() {
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
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://formsubmit.co https://www.google-analytics.com;",
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