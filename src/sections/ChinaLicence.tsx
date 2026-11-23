import { useRef } from 'react';
import { Check } from 'lucide-react';
import { licenceChecks, licenceFacts } from '../data/home';
import { HomeEyebrow, HomeIntro, HomeTitle } from '../components/home/HomeUI';
import { fineMotion } from '../lib/homeMotion';
import useHomeReveal from '../hooks/useHomeReveal';
function CheckRow({ item, index }: { item: typeof licenceChecks[number]; index: number }) {
  const ref = useHomeReveal<HTMLLIElement>();
  return <li ref={ref} className="home-reveal" style={{ transitionDelay: `${(index + 2) * .08}s` }}><span className="home-check"><Check size={14} strokeWidth={3} aria-hidden="true" /></span><div><b>{item.bold}</b>{item.rest}</div></li>;
}
export default function ChinaLicence() {
  const stage = useHomeReveal<HTMLDivElement>();
  const paper = useRef<HTMLDivElement>(null);
  return <section id="shanghai" className="home-section home-licence"><div className="wrap home-licence-grid"><div><HomeEyebrow>Officially in China</HomeEyebrow><HomeTitle before="Many claim an office in China." accent="We have the licence." /><HomeIntro>ImportNow operates through its own registered company in Shanghai, <b>Shanghai Shengqiao Chain Trading Co., Ltd.</b> That means we can sign contracts with factories, pay suppliers locally and stand behind every order.</HomeIntro><ul className="home-licence-checks">{licenceChecks.map((item, index) => <CheckRow key={item.bold} item={item} index={index} />)}</ul></div>
    <div ref={stage} className="home-paper-stage home-reveal" onPointerMove={event => { if (!paper.current || !fineMotion() || matchMedia('(max-width: 620px)').matches) return; const box = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - box.left) / box.width - .5, y = (event.clientY - box.top) / box.height - .5; paper.current.style.transform = `rotateY(${x * 24}deg) rotateX(${-y * 16}deg)`; }} onPointerLeave={() => paper.current?.style.removeProperty('transform')}><div ref={paper} className="home-paper"><div className="home-paper-title" lang="zh">营业执照</div><div className="home-paper-subtitle">BUSINESS LICENCE</div><div className="home-paper-emblem" aria-hidden="true" /><dl>{licenceFacts.map(fact => <div className="home-paper-fact" key={fact.label}><dt>{fact.label}</dt><dd>{fact.value}</dd></div>)}</dl><div className="home-paper-qr" aria-hidden="true" /><div className="home-paper-stamp" aria-hidden="true"><span>SHANGHAI<br />SHENGQIAO<br />TRADING</span></div></div></div>
  </div></section>;
}
