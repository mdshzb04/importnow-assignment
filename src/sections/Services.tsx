import { Factory, FileText, ShieldCheck, Ship, Truck, ZoomIn } from 'lucide-react';
import { serviceItems } from '../data/home';
import { HomeCard, SectionHeading } from '../components/home/HomeUI';
const icons = [ZoomIn, Factory, ShieldCheck, Ship, FileText, Truck];
export default function Services() {
  return <section id="services" className="home-section"><div className="wrap"><SectionHeading eyebrow="End-to-end imports" before="One team from the" accent="factory floor" after="to your front door." intro="Anyone can say they import from China. What you actually need is a smooth process, clear communication and a shipment that arrives safely." /><div className="home-grid-three">{serviceItems.map((item, index) => { const Icon = icons[index]; return <HomeCard key={item.title} tilt delay={index % 3 * .08}><span className="home-service-number">{String(index + 1).padStart(2, '0')}</span><div className="home-service-icon"><Icon size={26} strokeWidth={1.8} aria-hidden="true" /></div><h3>{item.title}</h3><p>{item.description}</p></HomeCard>; })}</div></div></section>;
}
