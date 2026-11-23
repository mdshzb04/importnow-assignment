import { articles } from '../data/articles.ts';
import type { Article, ArticleNode, Category } from '../data/articles.ts';
export const categories = ['All', 'Import guides', 'Wholesale markets', 'Product guides', 'Business ideas', 'China trips', 'Shipping', 'Customs'] as const;
export type BlogCategory = Category | 'All';
export interface BlogState { category: BlogCategory; query: string; page: number }
export type BlogAction = { type: 'category'; value: BlogCategory } | { type: 'query'; value: string } | { type: 'page'; value: number };
export const initialBlogState: BlogState = { category: 'All', query: '', page: 1 };
export const PAGE_SIZE = 6;
export function blogReducer(state: BlogState, action: BlogAction): BlogState {
  if (action.type === 'category') return { ...state, category: action.value, page: 1 };
  if (action.type === 'query') return { ...state, query: action.value, page: 1 };
  return { ...state, page: action.value };
}
export function selectBlogPage(state: BlogState) {
  const term = state.query.trim().toLowerCase();
  const matches = articles.filter(article => (state.category === 'All' || article.cat === state.category) && `${article.title} ${article.excerpt} ${article.cat}`.toLowerCase().includes(term));
  const pages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const page = Math.max(1, Math.min(pages, state.page));
  return { items: matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), total: matches.length, page, pages, term };
}
export const articlePath = (article: Article) => `/blog/${article.slug}`;
export const formatArticleDate = (date: string) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T00:00:00`));
export const contentText = (node: ArticleNode): string => typeof node === 'string' ? node : node.children.map(contentText).join('');
export const articleHeadings = (article: Article) => article.body.flatMap(node => typeof node !== 'string' && node.tag === 'h2' ? [{ id: node.id!, text: contentText(node) }] : []);
export const popularArticles = (article: Article) => articles.filter(other => other.slug !== article.slug).slice(0, 5);
export function relatedArticles(article: Article) {
  const others = articles.filter(other => other.slug !== article.slug);
  return [...others.filter(other => other.cat === article.cat), ...others.filter(other => other.cat !== article.cat)].slice(0, 3);
}
export function shareLinks(title: string, pageUrl: string) {
  const text = encodeURIComponent(title), url = encodeURIComponent(pageUrl);
  return [{ label: 'WhatsApp', href: `https://wa.me/?text=${text}%20${url}` }, { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}` }, { label: 'X', href: `https://twitter.com/intent/tweet?text=${text}&url=${url}` }];
}
