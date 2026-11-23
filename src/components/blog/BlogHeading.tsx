import type { CSSProperties } from 'react';
import useBlogReveal from '../../hooks/useBlogReveal';
export default function BlogHeading({ title }: { title: string }) {
  const ref = useBlogReveal<HTMLHeadingElement>();
  return <h1 ref={ref} className="blog-title-reveal">{title.split(/\s+/).map((word, index) => <span key={index}><span className="blog-word"><span className={`blog-word-inner${word === '&' ? ' blog-accent' : ''}`} style={{ '--word-index': index } as CSSProperties}>{word}</span></span>{' '}</span>)}</h1>;
}
