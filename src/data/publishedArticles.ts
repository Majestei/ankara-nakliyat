import { reviewedEditorial } from './editorialOverrides';
import articles from './makalelerData.json';
import recoveryRedirects from './recoveryRedirects.json';
import phase2Redirects from './phase2Redirects.json';

// Recovery decisions live in docs/seo/recovery/2026-09-16/migration-map.json.
// Keep source records for rollback; only reviewed redirects leave public lists.
const retired = new Set([...recoveryRedirects, ...phase2Redirects].map(rule => rule.source));
export const publishedArticles = articles.map(article => reviewedEditorial('makaleler', article)).filter(article => !retired.has(`/makaleler/${article.slug}`));
