/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    compress: true,
    async redirects() {
        return [
            {
                source: '/blog/:path*',
                destination: '/makaleler/:path*',
                permanent: true,
            },
            {
                source: '/hizmetler/evden-eve-nakliyat',
                destination: '/islemler/ankara/evden-eve-nakliyat',
                permanent: true,
            },
            {
                source: '/islemler/sancaktepe/:path*',
                destination: '/islemler', // Or wherever is appropriate, maybe redirecting obsolete Istanbul links to main islemler page
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