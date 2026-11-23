import { Search } from 'lucide-react';
import { categories } from '../../lib/blog';
import type { BlogCategory } from '../../lib/blog';
export function CategoryChips({ active, onChange }: { active: BlogCategory; onChange: (category: BlogCategory) => void }) {
  return <div className="blog-categories" role="group" aria-label="Article categories">{categories.map(category => <button type="button" key={category} aria-pressed={active === category} onClick={() => onChange(category)}>{category}</button>)}</div>;
}
export function SearchBox({ value, onChange }: { value: string; onChange: (query: string) => void }) {
  return <label className="blog-search"><Search aria-hidden="true" size={17} strokeWidth={2} /><input type="search" placeholder="Search articles" aria-label="Search articles" value={value} onChange={event => onChange(event.target.value)} /></label>;
}
export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (page: number) => void }) {
  return <nav className="blog-pagination" aria-label="Blog pages">{pages > 1 && Array.from({ length: pages }, (_, index) => index + 1).map(number => <button type="button" key={number} aria-label={`Page ${number}`} aria-current={page === number ? 'page' : undefined} onClick={() => onChange(number)}>{number}</button>)}</nav>;
}
