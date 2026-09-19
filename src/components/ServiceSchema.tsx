interface ServiceSchemaProps {
    serviceName: string;
    serviceDescription: string;
    serviceType: string;
    areaServed?: string;
}

export default function ServiceSchema({
    serviceName,
    serviceDescription,
    serviceType,
    areaServed = "Ankara"
}: ServiceSchemaProps) {
    const serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: serviceName,
        description: serviceDescription,
        serviceType: serviceType,
        provider: {
            "@id": "https://ankaraozdemirnakliyat.com/#organization",
            name: "Ankara Özdemir Nakliyat",
        },
        areaServed: {
            "@type": "City",
            name: areaServed,
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
    );
}
