import { Link, useParams } from 'react-router-dom';
import { articles } from '../data/articles';
import { ArticleBody, ArticleHeader, ShareLinks, TableOfContents } from '../components/blog/ArticleContent';
import { PopularList, QuoteCta, RelatedCards } from '../components/blog/ArticleExtras';
import Cover from '../components/blog/Cover';
import usePageMetadata from '../hooks/usePageMetadata';
export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find(item => item.slug === slug);
  usePageMetadata(article ? `${article.title} | ImportNow` : 'Article not found | ImportNow', article?.excerpt ?? 'The requested import guide could not be found. Browse all ImportNow articles.');
  if (!article) return <div className="wrap blog-not-found"><p className="eyebrow">404</p><h1>Article not found</h1><p>The guide you requested could not be found.</p><Link className="blog-read-more" to="/blog">Browse all articles <span aria-hidden="true">→</span></Link></div>;
  return <div className="article-page"><div className="article-layout"><article className="article-main"><ArticleHeader article={article} /><Cover article={article} /><TableOfContents article={article} /><ArticleBody article={article} /><ShareLinks article={article} /></article><aside className="article-sidebar" aria-label="More from ImportNow"><PopularList article={article} /><QuoteCta /></aside></div><RelatedCards article={article} /></div>;
}
