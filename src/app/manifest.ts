import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ankara Özdemir Nakliyat',
    short_name: 'Ankara Özdemir',
    description: 'Ankara ve tüm Türkiye genelinde profesyonel evden eve nakliyat, ofis taşıma ve depolama hizmetleri.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1e40af',
    icons: [
      {
        src: '/apple-touch-icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
