export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    type: "blog" | "makale";
    tags: string[];
    date: string;
    readTime: string;
    image?: string;
}
