import { MetadataRoute } from 'next';
import { ankaraIlceleri, hizmetler } from '@/data/siteData';
import { neighborhoodsByDistrict } from '@/data/neighborhoodData';

const BASE_URL = 'https://ankaraozdemirnakliyat.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const urls: MetadataRoute.Sitemap = [];
    const today = '2026-08-18';

    const staticUrls = [
      '/', '/hakkimizda', '/iletisim', '/galeri', '/sss',
      '/hizmetler', '/evden-eve-nakliyat', '/blog', '/makaleler',
      '/gizlilik-politikasi', '/kullanim-sartlari', '/kvkk',
      '/islemler', '/site-haritasi'
    ];

    staticUrls.forEach(url => {
        urls.push({
            url: `${BASE_URL}${url}`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: url === '/' ? 1.0 : 0.8
        });
    });

    hizmetler.forEach(h => {
        if (h.id === "evden-eve-nakliyat") return; // 301 redirected to /islemler/ankara/evden-eve-nakliyat
        urls.push({
            url: `${BASE_URL}/hizmetler/${h.id}`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.8
        });
    });

    const ilceHizmetSlugs = ["evden-eve-nakliyat", "ofis-tasima", "nakliyat-fiyatlari"];
    
    ankaraIlceleri.forEach(ilce => {
        urls.push({ url: `${BASE_URL}/islemler/ankara/${ilce.slug}`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 });
        
        ilceHizmetSlugs.forEach(h => {
            urls.push({ url: `${BASE_URL}/islemler/ankara/${ilce.slug}/${h}`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 });
        });
        
        const neighborhoods = neighborhoodsByDistrict[ilce.slug] || [];
        neighborhoods.forEach(m => {
            urls.push({ url: `${BASE_URL}/islemler/ankara/${ilce.slug}/${m.slug}`, lastModified: today, changeFrequency: 'weekly', priority: 0.6 });
        });
    });

    return urls;
}
