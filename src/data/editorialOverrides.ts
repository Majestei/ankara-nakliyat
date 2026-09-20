import firstBatch from './phase2EditorialOverrides.json';
import storageBatch from './phase2ArticleOverridesB.json';
import remainingStorage from './phase2ArticleOverridesC.json';
import serviceGuides from './phase2ArticleOverridesD.json';
import blogGuides from './phase2BlogOverrides.json';
import additionalBlog from './phase2AdditionalBlog.json';
import intentAdditions from './phase2PartialOverrides.json';
import finalArticles from './finalArticleOverrides.json';
import finalArticleRefinements from './finalArticleRefinements.json';
import finalBlogs from './finalBlogOverrides.json';
import finalOtherBlogs from './finalOtherBlogOverrides.json';
import finalBlogRefinements from './finalBlogRefinements.json';
import finalRemainingBlogs from './finalRemainingBlogOverrides.json';

// These are individually reviewed replacements for existing routes, not a
// generator. Source records, identity fields and existing URL ownership stay.
const revisions = new Map(
    [...firstBatch, ...storageBatch, ...remainingStorage, ...serviceGuides, ...blogGuides, ...additionalBlog, ...intentAdditions, ...finalArticles, ...finalArticleRefinements, ...finalBlogs, ...finalOtherBlogs, ...finalBlogRefinements, ...finalRemainingBlogs]
        .map(row => [`${row.type}/${row.slug}`, { content: row.content, excerpt: row.excerpt }])
);

export function reviewedEditorial<T extends { slug: string; content: string; excerpt: string }>(type: 'blog' | 'makaleler', record: T): T {
    const revision = revisions.get(`${type}/${record.slug}`);
    return revision ? { ...record, ...revision } : record;
}
