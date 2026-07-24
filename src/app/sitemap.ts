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

export async function generateSitemaps() {
    let allUrlsCount = staticUrls.length + hizmetler.length;
    allUrlsCount += ankaraIlceleri.length + istanbulIlceleri.length;
    allUrlsCount += blogDataGen.length + makalelerData.length;

    istanbulIlceleri.forEach(ilce => {
        allUrlsCount += 8; 
        allUrlsCount += (neighborhoodsByDistrict[ilce.slug] || []).length;
    });
    ankaraIlceleri.forEach(ilce => {
        allUrlsCount += 8;
        allUrlsCount += (neighborhoodsByDistrict[ilce.slug] || []).length;
    });

    const totalChunks = Math.ceil(allUrlsCount / CHUNK_SIZE);
    
    return Array.from({ length: totalChunks }).map((_, i) => ({ id: i }));
}

export default async function sitemap({ id }: { id: number }): Promise<MetadataRoute.Sitemap> {
    const urls: string[] = [...staticUrls];

    hizmetler.forEach(h => urls.push(`/hizmetler/${h.id}`));

    ankaraIlceleri.forEach(i => urls.push(`/islemler/ankara/${i.slug}`));
    istanbulIlceleri.forEach(i => urls.push(`/islemler/istanbul/${i.slug}`));

    const ilceHizmetSlugs = ["evden-eve-nakliyat", "ofis-tasima", "asansorlu-tasima", "parca-esya-tasima", "esya-depolama", "sehir-ici-nakliyat", "sigortali-tasima", "nakliyat-fiyatlari"];
    
    ankaraIlceleri.forEach(ilce => {
        ilceHizmetSlugs.forEach(h => urls.push(`/islemler/ankara/${ilce.slug}/${h}`));
        (neighborhoodsByDistrict[ilce.slug] || []).forEach(m => urls.push(`/islemler/ankara/${ilce.slug}/${m.slug}`));
    });

    istanbulIlceleri.forEach(ilce => {
        ilceHizmetSlugs.forEach(h => urls.push(`/islemler/istanbul/${ilce.slug}/${h}`));
        (neighborhoodsByDistrict[ilce.slug] || []).forEach(m => urls.push(`/islemler/istanbul/${ilce.slug}/${m.slug}`));
    });

    blogDataGen.forEach((b: any) => urls.push(`/blog/${b.slug}`));
    makalelerData.forEach((m: any) => urls.push(`/makaleler/${m.slug}`));

    const start = id * CHUNK_SIZE;
    const end = start + CHUNK_SIZE;
    const chunk = urls.slice(start, end);

    return chunk.map(url => ({
        url: `${BASE_URL}${url}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: url === '/' ? 1 : (url.split('/').length > 2 ? 0.7 : 0.8),
    }));
}
