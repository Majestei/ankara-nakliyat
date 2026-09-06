import { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogData";
import BlogPostClient from "@/components/BlogPostClient";

interface Props {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.excerpt,
        alternates: {
            canonical: `https://ankaraozdemirnakliyat.com/blog/${post.slug}`,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://ankaraozdemirnakliyat.com/blog/${post.slug}`,
            type: "article",
            publishedTime: post.date,
            images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: post.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: ["/og-image.jpg"],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default function BlogPostPage({ params }: Props) {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) notFound();

    const relatedPosts = blogPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 3);

    // Extract headings for Table of Contents (H2s)
    const toc = post.content
        .split("\n")
        .filter(line => line.startsWith("## "))
        .map(line => line.replace("## ", ""));

    // Article JSON-LD Schema
    const articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        image: "https://ankaraozdemirnakliyat.com/og-image.jpg",
        datePublished: post.date,
        dateModified: post.date,
        author: {
            "@type": "Organization",
            name: "Ankara Özdemir Nakliyat",
            url: "https://ankaraozdemirnakliyat.com",
        },
        publisher: {
            "@type": "Organization",
            name: "Ankara Özdemir Nakliyat",
            logo: {
                "@type": "ImageObject",
                url: "https://ankaraozdemirnakliyat.com/logo.svg",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://ankaraozdemirnakliyat.com/blog/${post.slug}`,
        },
        articleSection: post.category,
        inLanguage: "tr-TR",
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://ankaraozdemirnakliyat.com" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://ankaraozdemirnakliyat.com/blog" },
            { "@type": "ListItem", position: 3, name: post.title, item: `https://ankaraozdemirnakliyat.com/blog/${post.slug}` },
        ],
    };

    return (
        <>
            {/* JSON-LD Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

            <BlogPostClient post={post} relatedPosts={relatedPosts} toc={toc} />
        </>
    );
}
