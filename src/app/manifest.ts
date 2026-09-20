import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Ankara Özdemir Nakliyat',
    short_name: 'Ankara Özdemir',
    description: 'Ankara merkezli evden eve nakliyat, ofis taşıma ve depolama hizmetleri için bilgi ve teklif sayfaları.',
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
