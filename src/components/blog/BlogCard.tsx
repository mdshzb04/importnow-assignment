import { Link } from 'react-router-dom';
import type { CSSProperties, PointerEvent } from 'react';
import type { Article } from '../../data/articles';
import { articlePath, formatArticleDate } from '../../lib/blog';
import useBlogReveal from '../../hooks/useBlogReveal';
import Cover from './Cover';
function moveReadMore(event: PointerEvent<HTMLAnchorElement>) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const link = event.currentTarget;
  const bounds = link.getBoundingClientRect();
  link.style.setProperty('--blog-magnet-x', `${((event.clientX - bounds.left) / bounds.width - .5) * 12}px`);
  link.style.setProperty('--blog-magnet-y', `${((event.clientY - bounds.top) / bounds.height - .5) * 10}px`);
}
export default function BlogCard({ article, index = 0 }: { article: Article; index?: number }) {
  const ref = useBlogReveal<HTMLElement>();
  return <article ref={ref} className="blog-card blog-reveal" style={{ '--reveal-delay': `${(index % 2 + 1) * .08}s` } as CSSProperties}>
    <Link to={articlePath(article)} className="blog-card-cover-link" tabIndex={-1} aria-hidden="true"><Cover article={article} /></Link>
    <div className="blog-card-body"><h3><Link to={articlePath(article)}>{article.title}</Link></h3><div className="blog-meta"><time dateTime={article.date}>{formatArticleDate(article.date)}</time><span className="blog-meta-dot" aria-hidden="true" /><span>{article.mins} min read</span></div><p>{article.excerpt}</p><Link className="blog-read-more" to={articlePath(article)} aria-label={`Read more: ${article.title}`} onPointerMove={moveReadMore} onPointerLeave={event => { event.currentTarget.style.removeProperty('--blog-magnet-x'); event.currentTarget.style.removeProperty('--blog-magnet-y'); }}>Read more <span aria-hidden="true">→</span></Link></div>
  </article>;
}
