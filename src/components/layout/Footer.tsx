import { Link } from 'react-router-dom';
import { Instagram, MessageCircle, Phone } from 'lucide-react';
import Logo from '../ui/Logo';
import { services, products, guides, whatsappUrl } from '../../data/site';
export default function Footer() {
  return <footer className="footer"><div className="wrap">
    <div className="footer-grid"><div className="footer-brand"><Logo /><p>End-to-end imports from China to India: sourcing, factory inspection, shipping and customs. Save time. Reduce costs.</p><div className="social-links"><a href="https://www.instagram.com/importnow.in/" target="_blank" rel="noopener noreferrer" aria-label="ImportNow on Instagram"><Instagram size={18} strokeWidth={1.8} /></a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat with ImportNow on WhatsApp"><MessageCircle size={18} strokeWidth={1.8} /></a><a href="tel:+919989724320" aria-label="Call ImportNow"><Phone size={18} strokeWidth={1.8} /></a></div></div>
      <div><h2>Our services</h2><ul>{services.map(label => <li key={label}><Link to="/#services">{label}</Link></li>)}</ul></div>
      <div><h2>What we import</h2><ul>{products.map(label => <li key={label}><Link to="/#products">{label}</Link></li>)}<li><Link to="/#trips">Canton Fair trips</Link></li></ul></div>
      <div><h2>Import guides</h2><ul>{guides.map(([title, slug]) => <li key={slug}><Link to={`/blog/${slug}`}>{title}</Link></li>)}<li><Link className="footer-all-articles" to="/blog">All articles →</Link></li></ul></div>
      <div className="footer-contact"><h2>Get in touch</h2><ul><li><strong>Call / WhatsApp</strong><br /><a href="tel:+919989724320">+91 99897 24320</a></li><li><strong>India</strong><br />Hyderabad, Telangana</li><li><strong>China</strong><br />Shanghai Shengqiao Chain Trading Co., Ltd., Shanghai</li><li><strong>Instagram</strong><br /><a href="https://www.instagram.com/importnow.in/" target="_blank" rel="noopener noreferrer">@importnow.in</a></li></ul></div>
    </div><div className="footer-bottom"><span>© 2026 ImportNow.in · All rights reserved.</span></div>
  </div></footer>;
}
