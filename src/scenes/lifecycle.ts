export interface SceneLoop { invalidate: () => void; dispose: () => void }
export function createSceneLoop(host: HTMLElement, resize: () => void, draw: (elapsed: number, delta: number, reduced: boolean) => void): SceneLoop {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let active = false, disposed = false, request = 0, elapsed = 0, previous = 0;
  const tick = (now: number) => {
    request = 0;
    if (disposed || !active || document.hidden) return;
    const delta = previous ? Math.min((now - previous) / 1000, .05) : 1 / 60;
    previous = now;
    if (!preference.matches) elapsed += delta;
    draw(elapsed, delta, preference.matches);
    if (!preference.matches) request = requestAnimationFrame(tick);
  };
  const invalidate = () => { if (!disposed && active && !document.hidden && !request) request = requestAnimationFrame(tick); };
  const stop = () => { if (request) cancelAnimationFrame(request); request = 0; previous = 0; };
  const observer = new IntersectionObserver(entries => { active = entries.some(entry => entry.isIntersecting); if (active) invalidate(); else stop(); });
  observer.observe(host);
  const sizeObserver = new ResizeObserver(() => { resize(); invalidate(); });
  sizeObserver.observe(host);
  const visibility = () => { if (document.hidden) stop(); else invalidate(); };
  const motion = () => { stop(); invalidate(); };
  document.addEventListener('visibilitychange', visibility);
  preference.addEventListener('change', motion);
  resize();
  return { invalidate, dispose: () => { disposed = true; stop(); observer.disconnect(); sizeObserver.disconnect(); document.removeEventListener('visibilitychange', visibility); preference.removeEventListener('change', motion); } };
}
