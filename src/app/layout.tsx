import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/CookieConsent";
import WhatsAppSticky from "@/components/WhatsAppSticky";
import CustomCursor from "@/components/CustomCursor";
import ConversionTracker from "@/components/ConversionTracker";
import Script from "next/script";
import { firmaBilgileri } from "@/data/siteData";

const inter = Inter({
    subsets: ["latin", "latin-ext"],
    display: "swap",
    variable: "--font-inter",
});

const poppins = Poppins({
    subsets: ["latin", "latin-ext"],
    weight: ["400", "600", "700"],
    display: "swap",
    variable: "--font-poppins",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://ankaraozdemirnakliyat.com"),
    title: {
        default: "Ankara Özdemir Nakliyat | Sigortalı Evden Eve Nakliyat",
        template: "%s | Ankara Özdemir Nakliyat",
    },
    alternates: {
        canonical: "https://ankaraozdemirnakliyat.com",
    },
    description:
        "Ankara'da garantili ve asansörlü evden eve nakliyat hizmeti. Kırılmaya karşı sigortalı taşıma, ücretsiz ekspertiz ve uzman kadro. Hemen Ücretsiz Fiyat Alın",
    authors: [{ name: "Ankara Özdemir Nakliyat" }],
    creator: "Ankara Özdemir Nakliyat",
    publisher: "Ankara Özdemir Nakliyat",
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    openGraph: {
        type: "website",
        locale: "tr_TR",
        url: "https://ankaraozdemirnakliyat.com",
        siteName: "Ankara Özdemir Nakliyat",
        title: "Ankara Özdemir Nakliyat | Sigortalı Evden Eve Nakliyat",
        description:
            "Ankara'da garantili ve asansörlü evden eve nakliyat hizmeti. Kırılmaya karşı sigortalı taşıma, ücretsiz ekspertiz ve uzman kadro. Hemen Ücretsiz Fiyat Alın",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Ankara Özdemir Nakliyat - Profesyonel Evden Eve Taşımacılık",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Ankara Özdemir Nakliyat | Sigortalı Evden Eve Nakliyat",
        description: "Ankara'da garantili ve asansörlü evden eve nakliyat hizmeti. Kırılmaya karşı sigortalı taşıma, ücretsiz ekspertiz ve uzman kadro. Hemen Ücretsiz Fiyat Alın",
        images: ["/og-image.jpg"],
    },
    verification: {
        google: "b-y5hUtHShM_A_LOCN6STWoEBegS2izvsFGuO5tMB9U",
    },
    icons: {
        icon: [
            { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
            { url: "/logo.svg", type: "image/svg+xml" }
        ],
        apple: "/apple-touch-icon.png",
    },
};

export const viewport: Viewport = {
    themeColor: "#ffffff",
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
};

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": "https://ankaraozdemirnakliyat.com/#organization",
    name: "Ankara Özdemir Nakliyat",
    alternateName: "Ankara Özdemir - Profesyonel Evden Eve Taşımacılık",
    description: "Ankara evden eve nakliyat, şehirler arası nakliyat, ofis taşıma ve depolama hizmetleri. 15+ yıllık deneyim, sigortalı taşımacılık.",
    url: "https://ankaraozdemirnakliyat.com",
    telephone: firmaBilgileri.phone.replace(/\s+/g, ''),
    email: firmaBilgileri.email,
    foundingDate: "2009",
    numberOfEmployees: {
        "@type": "QuantitativeValue",
        minValue: 50,
        maxValue: 100,
    },
    address: {
        "@type": "PostalAddress",
        streetAddress: firmaBilgileri.address,
        addressLocality: "Sincan",
        addressRegion: "Ankara",
        postalCode: "06930",
        addressCountry: "TR",
    },
    geo: {
        "@type": "GeoCoordinates",
        latitude: 39.9208,
        longitude: 32.8541,
    },
    openingHoursSpecification: [
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            opens: "07:00",
            closes: "21:00",
        },
        {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Sunday",
            opens: "09:00",
            closes: "18:00",
        },
    ],
    areaServed: [
        { "@type": "State", name: "Ankara" },
        { "@type": "Country", name: "Turkey" },
        { "@type": "City", name: "Altındağ" },
        { "@type": "City", name: "Akyurt" },
        { "@type": "City", name: "Ayaş" },
        { "@type": "City", name: "Balâ" },
        { "@type": "City", name: "Beypazarı" },
        { "@type": "City", name: "Çamlıdere" },
        { "@type": "City", name: "Çankaya" },
        { "@type": "City", name: "Çubuk" },
        { "@type": "City", name: "Elmadağ" },
        { "@type": "City", name: "Etimesgut" },
        { "@type": "City", name: "Evren" },
        { "@type": "City", name: "Gölbaşı" },
        { "@type": "City", name: "Güdül" },
        { "@type": "City", name: "Haymana" },
        { "@type": "City", name: "Kahramankazan" },
        { "@type": "City", name: "Kalecik" },
        { "@type": "City", name: "Keçiören" },
        { "@type": "City", name: "Kızılcahamam" },
        { "@type": "City", name: "Mamak" },
        { "@type": "City", name: "Nallıhan" },
        { "@type": "City", name: "Polatlı" },
        { "@type": "City", name: "Pursaklar" },
        { "@type": "City", name: "Sincan" },
        { "@type": "City", name: "Şereflikoçhisar" },
        { "@type": "City", name: "Yenimahalle" },
    ],
    serviceArea: {
        "@type": "GeoCircle",
        geoMidpoint: {
            "@type": "GeoCoordinates",
            latitude: 39.9208,
            longitude: 32.8541,
        },
        geoRadius: "500000",
    },
    priceRange: "$$",
    currenciesAccepted: "TRY",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    image: "https://ankaraozdemirnakliyat.com/og-image.jpg",
    logo: "https://ankaraozdemirnakliyat.com/logo.svg",
    sameAs: [
        "https://www.instagram.com/ozdemirnakliyat_/",
    ],
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Nakliyat Hizmetleri",
        itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Evden Eve Nakliyat", description: "Ankara evden eve nakliyat hizmeti" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Şehirler Arası Nakliyat", description: "20 ile şehirler arası nakliyat" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Ofis Taşıma", description: "Kurumsal ofis taşıma hizmeti" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Asansörlü Taşıma", description: "Asansörlü nakliyat hizmeti" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Paketleme", description: "Profesyonel paketleme hizmeti" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Nakliyat Sigortası", description: "Tam kapsamlı nakliyat sigortası" } },
        ],
    },
    slogan: "Ankara'da Nakliyat Denince Akla İlk Gelen Firma",
};

const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://ankaraozdemirnakliyat.com/#website",
    url: "https://ankaraozdemirnakliyat.com",
    name: "Ankara Özdemir Nakliyat",
    description: "Ankara evden eve nakliyat, şehirler arası nakliyat, ofis taşıma hizmetleri",
    publisher: {
        "@id": "https://ankaraozdemirnakliyat.com/#organization",
    },
    inLanguage: "tr-TR"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="tr" className={`${inter.variable} ${poppins.variable}`}>
            <head>
                <link rel="dns-prefetch" href="https://www.google-analytics.com" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
                <meta name="geo.region" content="TR-06" />
                <meta name="geo.placename" content="Ankara" />
                <meta name="geo.position" content="39.9208;32.8541" />
                <meta name="ICBM" content="39.9208, 32.8541" />
                <meta name="format-detection" content="telephone=yes" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
                />
            </head>
            <body className="min-h-screen flex flex-col font-sans overflow-x-hidden bg-slate-50 text-slate-900">
                {/* Google Tag (gtag.js) */}
                <Script
                    src={`https://www.googletagmanager.com/gtag/js?id=AW-18303925044`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-18303925044');
                    `}
                </Script>
                <CustomCursor />
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                <CookieConsent />
                <WhatsAppSticky />
                <ConversionTracker />
            </body>
        </html>
    );
}

