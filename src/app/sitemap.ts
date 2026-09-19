import { MetadataRoute } from 'next';
import { ankaraIlceleri, hizmetler, civarIller } from '@/data/siteData';
import { neighborhoodsByDistrict } from '@/data/neighborhoodData';
import { blogPosts } from '@/data/blogData';
import { publishedArticles } from '@/data/publishedArticles';

const BASE_URL = 'https://ankaraozdemirnakliyat.com';

export default function sitemap(): MetadataRoute.Sitemap {
    const paths = new Set([
        '/', '/hakkimizda', '/iletisim', '/galeri', '/sss', '/hizmetler',
        '/evden-eve-nakliyat', '/blog', '/makaleler', '/referanslar',
        '/gizlilik-politikasi', '/kullanim-sartlari', '/kvkk', '/islemler', '/site-haritasi',
        '/hizmetler/depolama', '/hizmetler/uluslararasi-tasimacilik',
    ]);
    hizmetler.forEach(service => {
        if (service.id !== 'evden-eve-nakliyat') paths.add(`/hizmetler/${service.id}`);
    });
    civarIller.forEach(city => paths.add(`/islemler/${city.slug}`));
    ankaraIlceleri.forEach(district => {
        const hub = `/islemler/ankara/${district.slug}`;
        paths.add(hub);
        ['evden-eve-nakliyat', 'ofis-tasima', 'nakliyat-fiyatlari'].forEach(service => paths.add(`${hub}/${service}`));
        (neighborhoodsByDistrict[district.slug] || []).forEach(neighborhood => paths.add(`${hub}/${neighborhood.slug}`));
    });
    blogPosts.forEach(post => paths.add(`/blog/${post.slug}`));
    publishedArticles.forEach(post => paths.add(`/makaleler/${post.slug}`));
    // Publication/modification timestamps are not independently established.
    // Build time and generator timestamps must not pretend content was updated.
    return Array.from(paths).map(path => ({ url: `${BASE_URL}${path}` }));
}
