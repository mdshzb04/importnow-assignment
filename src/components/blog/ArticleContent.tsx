import { createElement, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Article, ArticleNode } from '../../data/articles';
import { articleHeadings, articlePath, formatArticleDate, shareLinks } from '../../lib/blog';
import BlogHeading from './BlogHeading';

export function ArticleHeader({ article }: { article: Article }) {
  return <header><nav className="blog-breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/blog">Blog</Link><span>/</span><span>{article.cat}</span></nav><BlogHeading key={article.slug} title={article.title} /><div className="blog-meta"><time dateTime={article.date}>{formatArticleDate(article.date)}</time><span className="blog-meta-dot" aria-hidden="true" /><span>{article.mins} min read</span><span className="blog-meta-dot" aria-hidden="true" /><span>By ImportNow Team</span></div></header>;
}
export function TableOfContents({ article }: { article: Article }) {
  const headings = articleHeadings(article);
  if (headings.length <= 3) return null;
  return <nav className="article-toc" aria-label="In this article"><b>In this article</b><ol>{headings.map(heading => <li key={heading.id}><a href={`#${heading.id}`}>{heading.text}</a></li>)}</ol></nav>;
}
function renderContent(node: ArticleNode, index: number): ReactNode {
  if (typeof node === 'string') return node;
  return createElement(node.tag, { key: index, id: node.id, className: node.className }, node.children.map(renderContent));
}
export function ArticleBody({ article }: { article: Article }) {
  return <div className="article-prose">{article.body.map(renderContent)}</div>;
}
export function ShareLinks({ article }: { article: Article }) {
  const pageUrl = typeof window === 'undefined' ? articlePath(article) : new URL(articlePath(article), window.location.origin).href;
  return <div className="article-share">Share: {shareLinks(article.title, pageUrl).map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>)}</div>;
}
