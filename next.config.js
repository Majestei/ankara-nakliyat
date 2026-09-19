/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    // Middleware combines historical, host and slash normalization in one hop.
    skipTrailingSlashRedirect: true,
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
    async headers() {
        // Explicit hosts used by the existing Google Ads tag and Cloudflare Web Analytics.
        // Keep the policy scoped; no new analytics service or script is introduced here.
        const cspHeader = `
          default-src 'self';
          script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com https://www.googleadservices.com https://www.google.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://static.cloudflareinsights.com;
          style-src 'self' 'unsafe-inline';
          img-src 'self' data: https:;
          font-src 'self' data:;
          connect-src 'self' https://formsubmit.co https://www.google-analytics.com https://*.google-analytics.com https://stats.g.doubleclick.net https://www.googleadservices.com https://googleads.g.doubleclick.net https://ad.doubleclick.net https://www.google.com https://google.com https://pagead2.googlesyndication.com https://cloudflareinsights.com;
          frame-src 'self' https://www.googletagmanager.com;
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
