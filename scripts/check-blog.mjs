import assert from 'node:assert/strict';
import { URL } from 'node:url';
import { log } from 'node:console';
import { articles } from '../src/data/articles.ts';
import { guides } from '../src/data/site.ts';
import { articleHeadings, blogReducer, categories, formatArticleDate, initialBlogState, popularArticles, relatedArticles, selectBlogPage, shareLinks } from '../src/lib/blog.ts';

const first = selectBlogPage(initialBlogState);
const second = selectBlogPage({ ...initialBlogState, page: 2 });
assert.equal(first.total, 9);
assert.equal(first.pages, 2);
assert.equal(first.items.length, 6);
assert.equal(second.items.length, 3);
assert.equal(new Set([...first.items, ...second.items].map(article => article.slug)).size, 9);
assert.deepEqual(second.items.map(article => article.slug), ['fcl-vs-lcl-shipping', 'landed-cost-customs-duty-india', 'private-label-car-led-business']);
assert.equal(selectBlogPage({ ...initialBlogState, category: 'Shipping' }).total, 1);
assert.equal(selectBlogPage({ ...initialBlogState, query: '  FCL vs LCL  ' }).items[0].slug, 'fcl-vs-lcl-shipping');
assert.equal(selectBlogPage({ ...initialBlogState, query: 'HASSLE-NO-MATCH' }).total, 0);
assert.equal(selectBlogPage({ ...initialBlogState, query: 'business ideas' }).total, 2);
assert.equal(selectBlogPage({ ...initialBlogState, query: 'certification-no-match', category: 'Shipping' }).total, 0);
// This phrase only appears in the excerpt, proving the search is not title-only.
assert.equal(selectBlogPage({ ...initialBlogState, query: 'first-time importers' }).items[0].slug, 'how-to-import-from-china-to-india');
assert.equal(selectBlogPage({ ...initialBlogState, category: 'Shipping', query: 'furniture' }).total, 0);
assert.equal(blogReducer({ ...initialBlogState, page: 2 }, { type: 'category', value: 'Shipping' }).page, 1);
assert.equal(blogReducer({ ...initialBlogState, page: 2 }, { type: 'query', value: 'China' }).page, 1);
const filtered = blogReducer({ category: 'Shipping', query: 'FCL', page: 1 }, { type: 'category', value: 'Customs' });
assert.equal(filtered.query, 'FCL');
assert.equal(filtered.category, 'Customs');
assert.equal(selectBlogPage({ ...initialBlogState, page: 99 }).page, 2);
assert.deepEqual(categories.slice(1), [...new Set(articles.map(article => article.cat))]);
assert.equal(new Set(articles.map(article => article.slug)).size, 9);
assert.ok(guides.every(([title, slug]) => articles.some(article => article.slug === slug && article.title === title)));
assert.equal(formatArticleDate('2026-11-18'), '18 November 2026');

let tables = 0, lists = 0;
function inspectNode(node) {
  if (typeof node === 'string') return;
  assert.ok(['p', 'h2', 'strong', 'em', 'div', 'ul', 'ol', 'li', 'table', 'thead', 'tbody', 'tr', 'th', 'td'].includes(node.tag));
  if (node.tag === 'table') tables++;
  if (node.tag === 'ul' || node.tag === 'ol') lists++;
  node.children.forEach(inspectNode);
}
for (const article of articles) {
  article.body.forEach(inspectNode);
  const headings = articleHeadings(article);
  assert.ok(headings.length >= 3);
  assert.deepEqual(headings.map(heading => heading.id), headings.map((_, index) => `s${index + 1}`));
  assert.equal(popularArticles(article).length, 5);
  assert.equal(relatedArticles(article).length, 3);
  assert.ok([...popularArticles(article), ...relatedArticles(article)].every(other => other.slug !== article.slug));
  const sameCategory = articles.filter(other => other.slug !== article.slug && other.cat === article.cat);
  assert.deepEqual(relatedArticles(article).slice(0, sameCategory.length), sameCategory);
}
assert.equal(tables, 3);
assert.ok(lists > 0);
assert.equal(articleHeadings(articles.find(article => article.slug === 'landed-cost-customs-duty-india')).length, 3);
const links = shareLinks('China & India', 'https://example.test/blog/test');
assert.equal(links[0].href, 'https://wa.me/?text=China%20%26%20India%20https%3A%2F%2Fexample.test%2Fblog%2Ftest');
assert.equal(new URL(links[1].href).searchParams.get('url'), 'https://example.test/blog/test');
assert.equal(new URL(links[2].href).searchParams.get('text'), 'China & India');
log(`Blog checks passed: 9 articles; pagination 6 + 3; category/search/reset rules; ${tables} tables, ${lists} lists; TOC/popular/related/share links.`);
