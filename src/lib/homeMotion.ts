import type { PointerEvent } from 'react';
export function fineMotion() {
  return !matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(hover: hover) and (pointer: fine)').matches;
}
export function moveHomeButton(event: PointerEvent<HTMLElement>) {
  if (!fineMotion()) return;
  const target = event.currentTarget, rect = target.getBoundingClientRect();
  target.style.setProperty('--home-button-x', `${((event.clientX - rect.left) / rect.width - .5) * 12}px`);
  target.style.setProperty('--home-button-y', `${((event.clientY - rect.top) / rect.height - .5) * 10}px`);
}
export function resetHomeButton(event: PointerEvent<HTMLElement>) {
  event.currentTarget.style.removeProperty('--home-button-x');
  event.currentTarget.style.removeProperty('--home-button-y');
}
