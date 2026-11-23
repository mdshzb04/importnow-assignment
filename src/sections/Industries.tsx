import { industryItems } from '../data/home';
import { ChinaFlag, HomeArt, HomeCard, SectionHeading } from '../components/home/HomeUI';
import type { HomeArtKind } from '../components/home/HomeUI';
const kinds: HomeArtKind[] = ['sofa', 'phone', 'scooter', 'bulb', 'cart', 'gear'];
export default function Industries() {
  return <section id="products" className="home-section"><div className="wrap"><SectionHeading eyebrow="What we import" before="China has a market for every industry." accent="We know each one." intro="Each industry has its own manufacturing hub. We take you straight to the source." /><div className="home-industries">{industryItems.map((item, index) => <HomeCard key={item.title} className="home-industry" tilt delay={index % 3 * .08}><HomeArt className="home-industry-art" kind={kinds[index]} /><div className="home-industry-hub"><ChinaFlag />{item.hub}</div><h3>{item.title}</h3><ul>{item.items.map(text => <li key={text}>{text}</li>)}</ul><span className="home-industry-note">{item.note}</span></HomeCard>)}</div></div></section>;
}
