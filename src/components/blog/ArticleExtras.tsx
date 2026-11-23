import { Link } from 'react-router-dom';
import type { Article } from '../../data/articles';
import { articlePath, formatArticleDate, popularArticles, relatedArticles } from '../../lib/blog';
import Cover from './Cover';
import BlogCard from './BlogCard';

export function PopularList({ article }: { article: Article }) {
  return <div className="article-popular"><h2>Popular Articles</h2>{popularArticles(article).map(other => <Link className="article-popular-link" key={other.slug} to={articlePath(other)}><Cover article={other} compact /><span><b>{other.title}</b><time dateTime={other.date}>{formatArticleDate(other.date)}</time></span></Link>)}</div>;
}
export function QuoteCta() {
  return <div className="article-quote"><h2>Planning an import?</h2><p>Tell us the product and quantity. We'll send supplier options, landed cost and timelines, free of charge.</p><Link className="blog-quote-button" to="/#contact">Get a free quote <span aria-hidden="true">→</span></Link></div>;
}
export function RelatedCards({ article }: { article: Article }) {
  return <section className="related-guides"><div className="wrap"><div className="related-heading"><p className="eyebrow">Keep reading</p><h2>Related articles</h2></div><div className="blog-grid">{relatedArticles(article).map((other, index) => <BlogCard key={`${article.slug}-${other.slug}`} article={other} index={index} />)}</div></div></section>;
}
