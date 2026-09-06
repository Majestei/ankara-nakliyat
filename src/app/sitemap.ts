import { MetadataRoute } from 'next';
import { ankaraIlceleri, hizmetler } from '@/data/siteData';

const BASE_URL = 'https://ankaraozdemirnakliyat.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const urls: MetadataRoute.Sitemap = [];
    const today = '2026-09-06';

    // 1. Core High-Value Landing Pages
    const staticUrls = [
      { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
      { path: '/evden-eve-nakliyat', priority: 0.95, changeFrequency: 'daily' as const },
      { path: '/hizmetler', priority: 0.85, changeFrequency: 'weekly' as const },
      { path: '/islemler', priority: 0.85, changeFrequency: 'weekly' as const },
      { path: '/hakkimizda', priority: 0.7, changeFrequency: 'monthly' as const },
      { path: '/iletisim', priority: 0.8, changeFrequency: 'weekly' as const },
      { path: '/sss', priority: 0.7, changeFrequency: 'monthly' as const },
      { path: '/galeri', priority: 0.6, changeFrequency: 'monthly' as const },
      { path: '/site-haritasi', priority: 0.5, changeFrequency: 'monthly' as const },
      { path: '/gizlilik-politikasi', priority: 0.3, changeFrequency: 'yearly' as const },
      { path: '/kullanim-sartlari', priority: 0.3, changeFrequency: 'yearly' as const },
      { path: '/kvkk', priority: 0.3, changeFrequency: 'yearly' as const },
    ];

    staticUrls.forEach(({ path, priority, changeFrequency }) => {
        urls.push({
            url: `${BASE_URL}${path}`,
            lastModified: today,
            changeFrequency,
            priority,
        });
    });

    // 2. Core Service Pillar Pages (Unique content, custom pricing, schema)
    hizmetler.forEach(h => {
        if (h.id === "evden-eve-nakliyat") return; // Handled by /evden-eve-nakliyat
        urls.push({
            url: `${BASE_URL}/hizmetler/${h.id}`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.9,
        });
    });

    // 3. 25 Ankara District Pillar Pages (Each has unique operational guide, pricing, checklist & FAQ)
    ankaraIlceleri.forEach(ilce => {
        urls.push({
            url: `${BASE_URL}/islemler/ankara/${ilce.slug}`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.85,
        });
    });

    return urls;
}

