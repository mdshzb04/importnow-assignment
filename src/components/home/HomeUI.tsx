import type { CSSProperties, PointerEvent, ReactNode } from 'react';
import useHomeReveal from '../../hooks/useHomeReveal';
import { fineMotion } from '../../lib/homeMotion';
function moveCard(event: PointerEvent<HTMLElement>) {
  if (!fineMotion()) return;
  const card = event.currentTarget, rect = card.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width, y = (event.clientY - rect.top) / rect.height;
  card.style.transform = `perspective(900px) rotateX(${(.5 - y) * 6}deg) rotateY(${(x - .5) * 8}deg) translateY(-4px)`;
  card.style.setProperty('--home-mx', `${x * 100}%`);
  card.style.setProperty('--home-my', `${y * 100}%`);
}
export function HomeCard({ children, className = '', delay = 0, tilt = false }: { children: ReactNode; className?: string; delay?: number; tilt?: boolean }) {
  const ref = useHomeReveal<HTMLElement>();
  return <article ref={ref} className={`home-card home-reveal ${className}`} style={{ '--home-delay': `${delay}s` } as CSSProperties} onPointerMove={tilt ? moveCard : undefined} onPointerLeave={event => event.currentTarget.style.removeProperty('transform')}>{children}</article>;
}
export function HomeTitle({ before, accent = '', after = '' }: { before: string; accent?: string; after?: string }) {
  const ref = useHomeReveal<HTMLHeadingElement>();
  const words = [{ text: before, accent: false }, { text: accent, accent: true }, { text: after, accent: false }].flatMap(part => part.text.trim() ? part.text.trim().split(/\s+/).map(word => ({ word, accent: part.accent })) : []);
  return <h2 ref={ref} className="home-title">{words.map((item, index) => <span key={index}><span className="home-word"><span className={`home-word-inner${item.accent ? ' home-accent' : ''}`} style={{ '--home-word': index } as CSSProperties}>{item.word}</span></span>{index < words.length - 1 ? ' ' : ''}</span>)}</h2>;
}
export function HomeIntro({ children }: { children: ReactNode }) {
  const ref = useHomeReveal<HTMLParagraphElement>();
  return <p ref={ref} className="home-intro home-reveal">{children}</p>;
}
export function HomeEyebrow({ children }: { children: ReactNode }) {
  const ref = useHomeReveal<HTMLSpanElement>();
  return <span ref={ref} className="home-eyebrow home-reveal">{children}</span>;
}
export function SectionHeading({ eyebrow, before, accent, after, intro }: { eyebrow: string; before: string; accent?: string; after?: string; intro?: string }) {
  return <header className="home-section-heading"><HomeEyebrow>{eyebrow}</HomeEyebrow><HomeTitle before={before} accent={accent} after={after} />{intro && <HomeIntro>{intro}</HomeIntro>}</header>;
}
export function ChinaFlag() {
  return <svg className="home-china-flag" viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#de2910" /><polygon points="5,3 6.2,6.5 9.8,6.5 6.9,8.7 8,12.3 5,10.1 2,12.3 3.1,8.7 .2,6.5 3.8,6.5" fill="#ffde00" />{[[10.5,2.5],[12.5,4.6],[12.5,7.6],[10.5,9.6]].map(([cx,cy]) => <circle key={cy} cx={cx} cy={cy} r=".9" fill="#ffde00" />)}</svg>;
}
export type HomeArtKind = 'sofa' | 'phone' | 'scooter' | 'bulb' | 'cart' | 'gear' | 'warehouse' | 'desk';
export function HomeArt({ kind, className = '' }: { kind: HomeArtKind; className?: string }) {
  let drawing: ReactNode;
  switch (kind) {
    case 'sofa': drawing = <><path d="M15 31V22c0-7 4-10 11-10h13c7 0 10 3 10 10v9M11 53v-6m42 6v-6" /><path d="M8 30c0-8 10-8 10 0v6h28v-6c0-8 10-8 10 0v16H8Z" /></>; break;
    case 'phone': drawing = <><rect x="18" y="5" width="28" height="54" rx="5" /><path d="M29 51h6" /></>; break;
    case 'scooter': drawing = <><circle cx="14" cy="48" r="8" /><circle cx="51" cy="48" r="8" /><path d="m14 48 12-12h15m-9-21-5 15m10-16 3 10h7l4 24M20 48h22l6-23" /></>; break;
    case 'bulb': drawing = <><path d="M23 46v-9a16 16 0 1 1 18 0v9ZM24 53h16m-13 6h10" /></>; break;
    case 'cart': drawing = <><path d="M4 8h8l9 35h31l7-26H15M22 36h32" /><circle cx="25" cy="54" r="3" /><circle cx="49" cy="54" r="3" /></>; break;
    case 'gear': drawing = <><path d="m26 7 12 0 2 8 7 4 8-2 6 10-6 6v7l5 6-6 10-9-3-7 4-2 7H25l-2-8-7-4-8 2-6-10 6-6v-8l-5-5 6-10 8 3 7-4Z" /><circle cx="32" cy="33" r="10" /></>; break;
    case 'warehouse': drawing = <><path d="M8 55V24L32 9l24 15v31ZM23 55V34h18v21M8 25h48" /><path d="M18 30h3m22 0h3" /></>; break;
    case 'desk': drawing = <><rect x="8" y="24" width="48" height="5" /><path d="M17 29v25m30-25v25M28 9h10v15M12 54h11m18 0h11" /></>; break;
  }
  return <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{drawing}</svg>;
}
