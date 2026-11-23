import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/layout/WhatsAppButton';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const { pathname, hash, key } = useLocation();
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (hash) {
        let target = hash.slice(1);
        try { target = decodeURIComponent(target); } catch { /* An invalid URL escape is not an element ID. */ }
        document.getElementById(target)?.scrollIntoView();
      } else window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash, key]);
  return <><a className="skip-link" href="#main">Skip to content</a><Navbar /><main id="main" tabIndex={-1}><Routes><Route path="/" element={<HomePage />} /><Route path="/blog" element={<BlogPage />} /><Route path="/blog/:slug" element={<ArticlePage />} /><Route path="*" element={<NotFoundPage />} /></Routes></main><Footer /><WhatsAppButton /></>;
}
