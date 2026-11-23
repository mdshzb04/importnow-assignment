import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../../data/site';
import Logo from '../ui/Logo';

export default function Navbar() {
  const header = useRef<HTMLElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const isBlog = location.pathname === '/blog' || location.pathname.startsWith('/blog/');
  useEffect(() => {
    const update = () => {
      header.current?.classList.toggle('scrolled', window.scrollY > 30);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${height > 0 ? Math.min(1, Math.max(0, window.scrollY / height)) : 0})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); observer.disconnect(); };
  }, []);
  useEffect(() => { dialog.current?.close(); }, [location]);
  useEffect(() => {
    const query = matchMedia('(min-width: 861px)');
    const close = () => { if (query.matches) dialog.current?.close(); };
    query.addEventListener('change', close);
    return () => query.removeEventListener('change', close);
  }, []);
  return <>
    <div ref={progress} className="reading-progress" aria-hidden="true" />
    <header ref={header} className={`navbar${isBlog ? ' blog-navbar' : ''}`}><div className="wrap nav-inner">
      <Logo /><nav aria-label="Main navigation">{navLinks.map(([label, href]) => <Link key={href} to={href} aria-current={isBlog && href === '/blog' ? 'page' : undefined}>{label}</Link>)}</nav>
      <Link className="button nav-quote" to="/#contact">Get a free quote</Link>
      <button ref={trigger} className="menu-toggle" aria-label="Open menu" aria-haspopup="dialog" aria-controls="mobile-menu" onClick={() => dialog.current?.showModal()}><Menu /></button>
    </div></header>
    <dialog ref={dialog} id="mobile-menu" className="mobile-menu" aria-labelledby="menu-title" onClose={() => trigger.current?.focus()} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="mobile-menu-panel"><div className="menu-heading"><span id="menu-title">Menu</span><button autoFocus aria-label="Close menu" onClick={() => dialog.current?.close()}><X /></button></div>
        <nav aria-label="Mobile navigation">{navLinks.map(([label, href]) => <Link key={href} to={href} aria-current={isBlog && href === '/blog' ? 'page' : undefined} onClick={() => dialog.current?.close()}>{label}</Link>)}</nav>
        <Link className="button" to="/#contact" onClick={() => dialog.current?.close()}>Get a free quote</Link>
      </div>
    </dialog>
  </>;
}
