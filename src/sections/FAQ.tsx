import { faqItems } from '../data/home';
import { SectionHeading } from '../components/home/HomeUI';
function FAQItem({ item, index }: { item: typeof faqItems[number]; index: number }) {
  return <details open={index === 0}><summary>{item.question}<span className="home-faq-toggle" aria-hidden="true" /></summary><p>{item.answer}</p></details>;
}
export default function FAQ() {
  return <section id="faq" className="home-section"><div className="wrap"><SectionHeading eyebrow="Questions" before="Before you import" /><div className="home-faq">{faqItems.map((item, index) => <FAQItem key={item.question} item={item} index={index} />)}</div></div></section>;
}
