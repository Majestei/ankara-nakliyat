interface ServiceSchemaProps {
    serviceName: string;
    serviceDescription: string;
    serviceType: string;
    areaServed?: string;
}

export default function ServiceSchema({ serviceName, serviceDescription, serviceType, areaServed = "Ankara" }: ServiceSchemaProps) {
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceName,
        description: serviceDescription,
        serviceType: serviceType,
        provider: {
            "@type": "MovingCompany",
            "@id": "https://ankaraozdemirnakliyat.com/#organization",
            name: "Ankara Özdemir Nakliyat",
        },
        areaServed: {
            "@type": "City",
            name: areaServed,
        },
        offers: {
            "@type": "Offer",
            priceCurrency: "TRY",
            availability: "https://schema.org/InStock",
            priceSpecification: {
                "@type": "PriceSpecification",
                priceCurrency: "TRY",
                minPrice: "2500",
                maxPrice: "15000"
            },
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
    );
}
