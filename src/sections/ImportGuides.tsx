import { Link } from 'react-router-dom';
import { articles } from '../data/articles';
import BlogCard from '../components/blog/BlogCard';
export default function ImportGuides() {
  return <section id="guides" className="home-guides"><div className="wrap"><div className="home-guides-heading"><div><p className="eyebrow">IMPORT GUIDES</p><h2>Learn before you import.</h2><p>Practical guides on sourcing, shipping, customs and business ideas from China.</p></div><Link to="/blog">View all articles <span aria-hidden="true">→</span></Link></div><div className="blog-grid">{articles.slice(0, 3).map((article, index) => <BlogCard key={article.slug} article={article} index={index} />)}</div></div></section>;
}
