import { useEffect, useRef } from 'react';
export default function useHomeReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const show = () => element.classList.add('home-visible');
    if (preference.matches || typeof IntersectionObserver === 'undefined') { show(); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { show(); observer.disconnect(); }
    }, { threshold: .1, rootMargin: '0px 0px -30px 0px' });
    const changed = () => { if (preference.matches) { show(); observer.disconnect(); } };
    observer.observe(element);
    preference.addEventListener('change', changed);
    return () => { observer.disconnect(); preference.removeEventListener('change', changed); };
  }, []);
  return ref;
}
