import historical from '../../src/data/redirects.json';
import recovery from '../../src/data/recoveryRedirects.json';

const aliases = [
  { source: '/hizmetler/evden-eve-nakliyat', destination: '/evden-eve-nakliyat' },
  { source: '/hizmetler/sigorta', destination: '/hizmetler/nakliyat-sigortasi' },
  { source: '/sitemap-2.xml', destination: '/sitemap.xml' },
  { source: '/sitemap-3.xml', destination: '/sitemap.xml' },
  { source: '/islemler/ankara', destination: '/islemler' },
];
const redirects = new Map([...historical, ...aliases, ...recovery].map(r => [r.source, r.destination]));

export default {
  async fetch(request) {
    const url = new URL(request.url);
    // Only HTTP apex and alternate-host traffic belongs to this worker.
    if (url.hostname !== 'www.ankaraozdemirnakliyat.com' &&
        !(url.hostname === 'ankaraozdemirnakliyat.com' && url.protocol === 'http:')) {
      return fetch(request);
    }
    url.protocol = 'https:';
    url.hostname = 'ankaraozdemirnakliyat.com';
    url.port = '';
    let path = url.pathname.replace(/\/+$/, '') || '/';
    const visited = new Set();
    while (redirects.has(path) && !visited.has(path)) {
      visited.add(path);
      path = redirects.get(path);
    }
    url.pathname = path;
    return Response.redirect(url.href, 301);
  },
};
