import { deliveries } from '../data/home';
import { ChinaFlag, HomeArt, HomeCard, SectionHeading } from '../components/home/HomeUI';
import type { HomeArtKind } from '../components/home/HomeUI';
const kinds: HomeArtKind[] = ['sofa', 'cart', 'warehouse', 'desk'];
export default function Delivered() {
  return <section id="work" className="home-section home-delivered"><div className="wrap"><SectionHeading eyebrow="Recently delivered" before="Another container unloaded," accent="another happy client." /><div className="home-delivery-grid">{deliveries.map((item, index) => <HomeCard key={item.title} className="home-delivery" tilt delay={index * .08}><div className={`home-delivery-cover home-delivery-cover-${index+1}`}><HomeArt kind={kinds[index]} /><span className="home-delivery-route"><ChinaFlag />{item.route}</span></div><div className="home-delivery-body"><h3>{item.title}</h3><p>{item.description}</p><div className="home-delivery-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div></HomeCard>)}</div></div></section>;
}
