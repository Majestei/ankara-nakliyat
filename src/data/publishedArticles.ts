import articles from './makalelerData.json';
import recoveryRedirects from './recoveryRedirects.json';

// Recovery decisions live in docs/seo/recovery/2026-09-16/migration-map.json.
// Keep source records for rollback; only reviewed redirects leave public lists.
const retired = new Set(recoveryRedirects.map(rule => rule.source));
export const publishedArticles = articles.filter(article => !retired.has(`/makaleler/${article.slug}`));
