import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { editorialHtml } from "@/lib/editorial-format";
import { publishedArticles as makalelerData } from "@/data/publishedArticles";

export const dynamicParams = false;

export async function generateStaticParams() {
    return makalelerData.map((makale) => ({
        slug: makale.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;
    const post = makalelerData.find((m) => m.slug === slug);
    if (!post) return { title: "Bulunamadı" };

    return {
        title: post.title,
        description: post.excerpt.slice(0, 155),
        alternates: { canonical: `https://ankaraozdemirnakliyat.com/makaleler/${slug}` },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `https://ankaraozdemirnakliyat.com/makaleler/${slug}`,
            type: "article",
            images: [{ url: "/og-image.jpg" }]
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

function formatDate(dateStr: string) {
    if (!dateStr) return "";
    const parts = dateStr.slice(0, 10).split("-");
    return parts.length === 3 ? `${parts[2]}.${parts[1]}.${parts[0]}` : dateStr;
}

export default async function MakaleDetail({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const post = makalelerData.find((m) => m.slug === slug);

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-[#010204] min-h-screen font-sans selection:bg-[#F5B913] selection:text-black pt-32 pb-32">

            {/* Article JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        headline: post.title,
                        description: post.excerpt,
                        image: "https://ankaraozdemirnakliyat.com/og-image.jpg",


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
                            "@id": `https://ankaraozdemirnakliyat.com/makaleler/${post.slug}`,
                        },
                        articleSection: post.category,
                        inLanguage: "tr-TR",
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        itemListElement: [
                            { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: "https://ankaraozdemirnakliyat.com" },
                            { "@type": "ListItem", position: 2, name: "Makaleler", item: "https://ankaraozdemirnakliyat.com/makaleler" },
                            { "@type": "ListItem", position: 3, name: post.title, item: `https://ankaraozdemirnakliyat.com/makaleler/${post.slug}` },
                        ],
                    }),
                }}
            />



            {/* HERO */}
            <header className="max-w-4xl mx-auto px-6 mb-16 mt-10">
                <nav className="mb-10">
                    <ol className="flex flex-wrap items-center gap-3 text-[11px] text-[#8892B0] font-mono tracking-[0.2em] uppercase">
                        <li><Link href="/" className="hover:text-white transition-colors">Ana Sayfa</Link></li>
                        <li className="text-white/20">/</li>
                        <li><Link href="/makaleler" className="hover:text-white transition-colors">Makaleler</Link></li>
                        <li className="text-white/20">/</li>
                        <li className="text-[#F5B913] truncate">{post.location}</li>
                    </ol>
                </nav>

                <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 rounded-full border border-[#F5B913]/30 text-[#F5B913] text-xs font-bold uppercase tracking-wider bg-[#F5B913]/10">
                        {post.category}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-[#8892B0] text-sm font-mono tracking-widest">{(post as any).readTime || '3 dk'} okuma</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-8">
                    {post.title}
                </h1>
            </header>

            {/* CONTENT */}
            <main className="max-w-3xl mx-auto px-6">
                <article
                    className="prose prose-invert prose-xl md:prose-2xl max-w-[850px] mx-auto text-[#E2E8F0]
                        prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white
                        prose-p:text-[#E2E8F0] prose-p:leading-[2.1] prose-p:font-normal prose-p:text-lg md:prose-p:text-xl
                        prose-strong:text-white prose-strong:font-bold
                        prose-ul:text-[#C8D0E0] prose-li:marker:text-[#F5B913] prose-li:text-lg md:prose-li:text-xl
                        prose-a:text-[#F5B913] hover:prose-a:text-[#FFD95B]
                        selection:bg-[#F5B913] selection:text-black"
                >
                    <div
                        className="text-[#E2E8F0] text-lg md:text-xl leading-[2.2] font-light [&_h2]:text-3xl [&_h2]:mt-16 [&_h2]:mb-8 [&_h2]:font-black [&_h3]:text-2xl [&_h3]:mt-12 [&_h3]:mb-6 [&_p]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-4"
                        dangerouslySetInnerHTML={{ __html: editorialHtml(post.content) }}
                    />
                </article>

                {/* Related Services (Silo) */}
                <div className="mt-16 bg-[#050813] border border-white/5 rounded-3xl p-8 md:p-12">
                    <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider">İlgili Hizmetlerimiz</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link href="/evden-eve-nakliyat" className="group flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-[#F5B913]/20 transition-all border border-white/5">
                            <span className="text-[#E2E8F0] font-medium group-hover:text-white">Ankara Evden Eve Nakliyat</span>
                            <span className="text-[#F5B913]">&rarr;</span>
                        </Link>
                        <Link href="/hizmetler/asansorlu-tasima" className="group flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-[#F5B913]/20 transition-all border border-white/5">
                            <span className="text-[#E2E8F0] font-medium group-hover:text-white">Asansörlü Taşımacılık</span>
                            <span className="text-[#F5B913]">&rarr;</span>
                        </Link>
                        <Link href="/hizmetler/ofis-tasima" className="group flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-[#F5B913]/20 transition-all border border-white/5">
                            <span className="text-[#E2E8F0] font-medium group-hover:text-white">Kurumsal Ofis Taşıma</span>
                            <span className="text-[#F5B913]">&rarr;</span>
                        </Link>
                        <Link href="/hizmetler/sehirler-arasi-nakliyat" className="group flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-[#F5B913]/20 transition-all border border-white/5">
                            <span className="text-[#E2E8F0] font-medium group-hover:text-white">Şehirler Arası Nakliyat</span>
                            <span className="text-[#F5B913]">&rarr;</span>
                        </Link>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="bg-[#050813] border border-white/5 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#F5B913]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <h3 className="text-2xl font-bold text-white mb-4">Hemen Teklif Alın</h3>
                        <p className="text-[#8892B0] mb-8 max-w-md mx-auto">
                            {post.location} için eşya listenizi, adres ve tarih bilgilerinizi paylaşarak teklif kapsamını görüşün.
                        </p>
                        <Link href="/iletisim" className="inline-block px-8 py-4 bg-[#F5B913] text-black font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-white hover:scale-105 transition-all">
                            İletişime Geç
                        </Link>
                    </div>
                </div>
            </main>

        </div>
    );
}
