import { MetadataRoute } from 'next';
import { istanbulIlceleri, ankaraIlceleri, hizmetler } from '@/data/siteData';
import { neighborhoodsByDistrict } from '@/data/neighborhoodData';
import makalelerData from '@/data/makalelerData.json';
import blogDataGen from '@/data/blogDataGen.json';

// Constants
const BASE_URL = 'https://ankaraozdemirnakliyat.com';
const CHUNK_SIZE = 2500;

// Calculate total URLs
const staticUrls = [
  '/', '/hakkimizda', '/iletisim', '/galeri', '/referanslar', '/sss',
  '/hizmetler', '/evden-eve-nakliyat', '/blog', '/makaleler',
  '/gizlilik-politikasi', '/kullanim-sartlari', '/kvkk'
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const urls: string[] = [...staticUrls];

    hizmetler.forEach(h => urls.push(`/hizmetler/${h.id}`));

    ankaraIlceleri.forEach(i => urls.push(`/islemler/ankara/${i.slug}`));
    istanbulIlceleri.forEach(i => urls.push(`/islemler/istanbul/${i.slug}`));

    const ilceHizmetSlugs = ["evden-eve-nakliyat", "ofis-tasima", "asansorlu-tasima", "parca-esya-tasima", "esya-depolama", "sehir-ici-nakliyat", "sigortali-tasima", "nakliyat-fiyatlari"];
    
    // Ankara: full coverage (districts, services, neighborhoods)
    ankaraIlceleri.forEach(ilce => {
        ilceHizmetSlugs.forEach(h => urls.push(`/islemler/ankara/${ilce.slug}/${h}`));
        (neighborhoodsByDistrict[ilce.slug] || []).forEach(m => urls.push(`/islemler/ankara/${ilce.slug}/${m.slug}`));
    });

    // Istanbul: high-level district & service coverage only (pruned neighborhoods)
    istanbulIlceleri.forEach(ilce => {
        ilceHizmetSlugs.forEach(h => urls.push(`/islemler/istanbul/${ilce.slug}/${h}`));
    });

    // Top curated blogs and articles
    blogDataGen.slice(0, 50).forEach((b: any) => urls.push(`/blog/${b.slug}`));
    makalelerData.slice(0, 50).forEach((m: any) => urls.push(`/makaleler/${m.slug}`));

    return urls.map(url => ({
        url: `${BASE_URL}${url}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: url === '/' ? 1 : (url.split('/').length > 2 ? 0.7 : 0.8),
    }));
}
