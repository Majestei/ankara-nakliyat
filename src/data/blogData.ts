import { reviewedEditorial } from './editorialOverrides';
import blogDataGen from "./blogDataGen.json";
import recoveryRedirects from './recoveryRedirects.json';
import phase2Redirects from './phase2Redirects.json';

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

const retiredBlogPaths = new Set([...recoveryRedirects, ...phase2Redirects].map(rule => rule.source));
export const blogPosts: BlogPost[] = blogDataGen
    .map(post => reviewedEditorial('blog', post))
    .filter(post => !retiredBlogPaths.has(`/blog/${post.slug}`));
