import { useReducer, useRef } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/blog/BlogCard';
import BlogHeading from '../components/blog/BlogHeading';
import { CategoryChips, Pagination, SearchBox } from '../components/blog/ListingControls';
import { blogReducer, initialBlogState, selectBlogPage } from '../lib/blog';
import usePageMetadata from '../hooks/usePageMetadata';
export default function BlogPage() {
  const [state, dispatch] = useReducer(blogReducer, initialBlogState);
  const results = selectBlogPage(state);
  const toolbar = useRef<HTMLDivElement>(null);
  usePageMetadata('Import Guides & Blogs | ImportNow', 'Practical guides on importing from China to India: sourcing, wholesale markets, shipping, customs duty and business ideas.');
  return <div className="blog-page"><header className="blog-page-hero"><div className="wrap"><nav className="blog-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Blog</span></nav><BlogHeading title="Import Guides & Blogs" /><p>Everything we've learned from hundreds of shipments: sourcing in China, choosing markets, shipping, customs and business ideas for India.</p></div></header>
    <section className="blog-listing" aria-label="Import articles"><div className="wrap"><div className="blog-tools" ref={toolbar} id="posts-top"><CategoryChips active={state.category} onChange={value => dispatch({ type: 'category', value })} /><SearchBox value={state.query} onChange={value => dispatch({ type: 'query', value })} /></div>
      <div className="blog-grid" key={`${state.category}|${state.query}|${results.page}`}>{results.items.length ? results.items.map((article, index) => <BlogCard key={article.slug} article={article} index={index} />) : <p className="blog-empty" role="status">No articles match “{results.term}”.</p>}</div>
      <Pagination page={results.page} pages={results.pages} onChange={value => { dispatch({ type: 'page', value }); toolbar.current?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }} />
    </div></section></div>;
}
