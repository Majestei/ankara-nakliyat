import blogDataGen from "./blogDataGen.json";

export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    tags: string[];
    date: string;
    readTime: string;
}

export const blogPosts: BlogPost[] = blogDataGen;
