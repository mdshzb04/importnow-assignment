import { Instagram, MapPin, Phone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FormEvent } from 'react';
import { quoteBudgets, quoteCategories } from '../data/home';
import { HomeEyebrow, HomeIntro, HomeTitle } from '../components/home/HomeUI';
import useHomeReveal from '../hooks/useHomeReveal';
import { buildWhatsAppQuote } from '../lib/whatsapp';
import { moveHomeButton, resetHomeButton } from '../lib/homeMotion';

function ContactLine({ label, value, Icon, href, index }: { label: string; value: string; Icon: LucideIcon; href?: string; index: number }) {
  const ref = useHomeReveal<HTMLDivElement>();
  const content = <><Icon size={22} strokeWidth={1.8} aria-hidden="true" /><div><small>{label}</small><b>{value}</b></div></>;
  return <div ref={ref} className="home-reveal" style={{ transitionDelay: `${(index + 2) * .08}s` }}>{href ? <a href={href} className="home-contact-line" target={href.startsWith('https:') ? '_blank' : undefined} rel={href.startsWith('https:') ? 'noopener noreferrer' : undefined}>{content}</a> : <div className="home-contact-line">{content}</div>}</div>;
}

function QuoteForm() {
  const ref = useHomeReveal<HTMLFormElement>();
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget), value = (name: string) => String(data.get(name) ?? '');
    const url = buildWhatsAppQuote({ name: value('name'), city: value('city'), category: value('category'), quantity: value('quantity'), budget: value('budget'), details: value('details') });
    window.open(url, '_blank', 'noopener');
  }
  return <form ref={ref} className="home-quote-form home-reveal" onSubmit={submit}><h3>Get a free sourcing quote</h3><div className="home-form-pair"><div className="home-field"><label htmlFor="quote-name">Your name</label><input id="quote-name" name="name" required placeholder="Full name" /></div><div className="home-field"><label htmlFor="quote-city">City</label><input id="quote-city" name="city" placeholder="e.g. Hyderabad" /></div></div><div className="home-field"><label htmlFor="quote-category">What do you want to import?</label><select id="quote-category" name="category">{quoteCategories.map(option => <option key={option}>{option}</option>)}</select></div><div className="home-form-pair"><div className="home-field"><label htmlFor="quote-quantity">Approx. quantity</label><input id="quote-quantity" name="quantity" placeholder="e.g. 1 container" /></div><div className="home-field"><label htmlFor="quote-budget">Budget</label><select id="quote-budget" name="budget">{quoteBudgets.map(option => <option key={option}>{option}</option>)}</select></div></div><div className="home-field"><label htmlFor="quote-details">Details</label><textarea id="quote-details" name="details" placeholder="Product, specs, reference photos or links…" /></div><button type="submit" className="home-button" onPointerMove={moveHomeButton} onPointerLeave={resetHomeButton}>Send on WhatsApp <span aria-hidden="true">→</span></button><p className="home-form-note">Opens WhatsApp with your details filled in. We usually reply within a few hours.</p></form>;
}
export default function Contact() {
  return <section id="contact" className="home-section home-contact"><div className="wrap home-contact-grid"><div><HomeEyebrow>Start importing</HomeEyebrow><HomeTitle before="Tell us what you want to import." accent="We'll take it from there." /><HomeIntro>Share the product and quantity. You'll get supplier options, landed cost and timelines, free of charge.</HomeIntro><div className="home-contact-lines"><ContactLine label="Call or WhatsApp" value="+91 99897 24320" Icon={Phone} href="tel:+919989724320" index={0} /><ContactLine label="Instagram" value="@importnow.in" Icon={Instagram} href="https://www.instagram.com/importnow.in/" index={1} /><ContactLine label="Offices" value="Hyderabad, India · Shanghai, China" Icon={MapPin} index={2} /></div></div><QuoteForm /></div></section>;
}
