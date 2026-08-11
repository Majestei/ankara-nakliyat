import { MetadataRoute } from 'next';
import { istanbulIlceleri, ankaraIlceleri, hizmetler } from '@/data/siteData';
import { neighborhoodsByDistrict } from '@/data/neighborhoodData';
import makalelerData from '@/data/makalelerData.json';
import blogDataGen from '@/data/blogDataGen.json';

const BASE_URL = 'https://ankaraozdemirnakliyat.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const urls: MetadataRoute.Sitemap = [];
    const today = new Date().toISOString();

    const staticUrls = [
      '/', '/hakkimizda', '/iletisim', '/galeri', '/referanslar', '/sss',
      '/hizmetler', '/evden-eve-nakliyat', '/blog', '/makaleler',
      '/gizlilik-politikasi', '/kullanim-sartlari', '/kvkk'
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
        urls.push({
            url: `${BASE_URL}/hizmetler/${h.id}`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: 0.8
        });
    });

    const ilceHizmetSlugs = ["evden-eve-nakliyat", "ofis-tasima", "asansorlu-tasima", "parca-esya-tasima", "esya-depolama", "sehir-ici-nakliyat", "sigortali-tasima", "nakliyat-fiyatlari"];
    
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

    istanbulIlceleri.forEach(ilce => {
        urls.push({ url: `${BASE_URL}/islemler/istanbul/${ilce.slug}`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 });
        
        ilceHizmetSlugs.forEach(h => {
            urls.push({ url: `${BASE_URL}/islemler/istanbul/${ilce.slug}/${h}`, lastModified: today, changeFrequency: 'weekly', priority: 0.6 });
        });
    });

    if (Array.isArray(blogDataGen)) {
      blogDataGen.slice(0, 50).forEach((b: any) => {
        urls.push({
          url: `${BASE_URL}/blog/${b.slug}`,
          lastModified: b.date || today,
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      });
    }

    if (Array.isArray(makalelerData)) {
      makalelerData.slice(0, 50).forEach((m: any) => {
        urls.push({
          url: `${BASE_URL}/makaleler/${m.slug}`,
          lastModified: m.date || today,
          changeFrequency: 'monthly',
          priority: 0.5,
        });
      });
    }

    return urls;
}
