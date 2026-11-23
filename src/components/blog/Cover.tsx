import type { Article, CoverIcon } from '../../data/articles';
// Fresh vector drawings in a shared 64-unit viewBox.
function CoverIconDrawing({ icon }: { icon: CoverIcon }) {
  switch (icon) {
    case 'route': return <><circle cx="14" cy="48" r="6" /><circle cx="50" cy="16" r="6" /><path d="M24 48h13c15 0 15-16 1-16H25c-15 0-15-16 0-16h14" strokeDasharray="4 5" /></>;
    case 'market': return <><path d="m9 25 5-14h36l5 14M9 25h46v5c0 8-9 8-11 3-3 6-10 6-12 0-3 6-10 6-12 0-3 5-11 5-11-3Z" /><path d="M13 37v16h38V37M26 53V42h12v11" /></>;
    case 'sofa': return <><path d="M15 31v-9c0-8 4-11 11-11h14c7 0 10 3 10 11v9M10 53v-5m44 5v-5" /><path d="M8 29c0-7 10-7 10 0v6h28v-6c0-7 10-7 10 0v16H8Z" /></>;
    case 'scooter': return <><circle cx="15" cy="48" r="7" /><circle cx="50" cy="48" r="7" /><path d="m15 48 12-12h13m-10-20-4 14m8-16 3 10h8l5 24M21 48h20l6-23" /></>;
    case 'plane': return <><polygon points="7,29 57,9 47,55 36,47 28,59 24,36" /><path d="m24 36 33-27M28 59l-4-23" /></>;
    case 'shield': return <><path d="m32 7 20 8v18c0 13-10 20-20 24-11-4-20-11-20-24V15Z" /><polyline points="23,32 30,39 42,25" /></>;
    case 'container': return <><rect x="7" y="23" width="50" height="28" /><polyline points="20,23 32,13 44,23" />{[14,22,30,38,46,52].map(x => <line key={x} x1={x} x2={x} y1="28" y2="46" />)}</>;
    case 'doc': return <><path d="M17 57V7h23l12 12v19M40 7v12h12M17 57h22M24 32h18M24 40h13M24 48h9" /><circle cx="47" cy="48" r="9" /><path d="M47 44v8m-4-4h8" /></>;
    case 'bulb': return <><path d="M23 47v-9a15 15 0 1 1 18 0v9Zm3 8h12M32 4V2M12 12l-4-4m44 4 4-4M9 26H3m52 0h6" /></>;
  }
}
function CountryFlags() {
  return <span className="blog-cover-flags" aria-hidden="true">
    <svg className="blog-flag" viewBox="0 0 30 20"><rect width="30" height="20" fill="#de2910" /><polygon points="5,3 6.2,6.5 9.8,6.5 6.9,8.7 8,12.3 5,10.1 2,12.3 3.1,8.7 .2,6.5 3.8,6.5" fill="#ffde00" />{[[10.5,2.5],[12.5,4.6],[12.5,7.6],[10.5,9.6]].map(([cx,cy]) => <circle key={cy} cx={cx} cy={cy} r=".9" fill="#ffde00" />)}</svg>
    <span>→</span><svg className="blog-flag" viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff" /><rect width="30" height="6.67" fill="#ff9933" /><rect y="13.33" width="30" height="6.67" fill="#138808" /><circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" strokeWidth=".7" /><circle cx="15" cy="10" r=".6" fill="#000080" /></svg>
  </span>;
}
export default function Cover({ article, compact = false }: { article: Article; compact?: boolean }) {
  return <span className={`blog-cover${compact ? ' blog-cover-compact' : ''}`} aria-hidden="true"><span className={`blog-cover-bg blog-${article.cv}`} /><svg className="blog-cover-icon" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><svg viewBox="0 0 64 64" width="100%" height="100%"><CoverIconDrawing icon={article.icon} /></svg></svg>{!compact && <><span className="blog-cover-category">{article.cat}</span><CountryFlags /><span className="blog-cover-title">{article.title.split(':')[0]}</span></>}</span>;
}
