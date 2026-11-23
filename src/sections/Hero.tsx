import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import EarthCanvas from '../scenes/earth/EarthCanvas';
import SceneFlag from '../components/ui/SceneFlag';
import useHomeReveal from '../hooks/useHomeReveal';
import { moveHomeButton, resetHomeButton } from '../lib/homeMotion';
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const element=ref.current;if (!element) return;
    const preference=matchMedia('(prefers-reduced-motion: reduce)');let request=0;
    const finish=()=>{cancelAnimationFrame(request);element.textContent=String(value);};
    if (preference.matches || typeof IntersectionObserver === 'undefined') { finish(); return; }
    element.textContent='0';
    const observer=new IntersectionObserver(entries=>{if (!entries.some(entry=>entry.isIntersecting)) return;observer.disconnect();const start=performance.now();const animate=(now:number)=>{const p=Math.min(1,(now-start)/1600);element.textContent=String(Math.round(value*(1-(1-p)**3)));if(p<1)request=requestAnimationFrame(animate);};request=requestAnimationFrame(animate);},{threshold:.6});
    const changed=()=>{if(preference.matches){finish();observer.disconnect();}};observer.observe(element);preference.addEventListener('change',changed);
    return()=>{observer.disconnect();cancelAnimationFrame(request);preference.removeEventListener('change',changed);};
  },[value]);
  return <span ref={ref}>{value}</span>;
}
export default function Hero() {
  const title = useHomeReveal<HTMLHeadingElement>(), chip = useHomeReveal<HTMLSpanElement>(), lead = useHomeReveal<HTMLParagraphElement>(), actions = useHomeReveal<HTMLDivElement>(), stats = useHomeReveal<HTMLDivElement>();
  const words=['Import','directly','from','China.','Without','the','guesswork.'];
  return <section id="home" className="earth-hero"><EarthCanvas /><div className="wrap"><div className="earth-hero-content"><span ref={chip} className="earth-trust home-reveal"><SceneFlag country="cn" /><span className="earth-trust-arrow">→</span><SceneFlag country="in" />Trusted by 500+ Indian businesses</span><h1 ref={title} className="earth-hero-title home-title">{words.map((word,index)=><span key={word}><span className="home-word"><span className={`home-word-inner${index>=4?' home-accent':''}`} style={{'--home-word':index} as CSSProperties}>{word}</span></span>{index<words.length-1?' ':''}</span>)}</h1><p ref={lead} className="earth-lead home-reveal">Sourcing, factory inspection, shipping and customs, handled end to end by a team with its own company in Shanghai. You choose the product. We bring it to your door.</p><div ref={actions} className="earth-actions home-reveal"><a href="#contact" className="earth-primary" onPointerMove={moveHomeButton} onPointerLeave={resetHomeButton}>Get a free sourcing quote <span aria-hidden="true">→</span></a><a href="#journey" className="earth-secondary" onPointerMove={moveHomeButton} onPointerLeave={resetHomeButton}>See how it works</a></div><div ref={stats} className="earth-stats home-reveal"><div><b><Counter value={500} />+</b><span>Businesses<br />served</span></div><div><b><Counter value={83} />K+</b><span>Community on<br />Instagram</span></div><div><b>1 pc</b><span>MOQ on many<br />products</span></div><div><b>Shanghai</b><span>Own registered<br />company</span></div></div></div></div><div className="earth-scroll-cue" aria-hidden="true">Scroll<i /></div></section>;
}
