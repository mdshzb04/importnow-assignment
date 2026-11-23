import { cameraFrames, stepThresholds } from '../../data/journey.ts';
export const clamp = (value: number, min = 0, max = 1) => Math.max(min, Math.min(max, value));
export const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;
export const smooth = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
export const cubicEase = (value: number) => { const t = clamp(value); return t < .5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2; };
export function journeyState(progress: number) {
  const p = clamp(progress);
  const distance = cubicEase((p - .4) / (.84 - .4));
  const step = stepThresholds.reduce<number>((active, threshold, index) => p >= threshold ? index : active, 0);
  const day = p < .4 ? Math.round(p / .4 * 7) : p < .84 ? 7 + Math.round((p - .4) / (.84 - .4) * 23) : 30 + Math.round((p - .84) / (1 - .84) * 5);
  return { progress: p, step, day, distance, shipX: distance * 520 };
}
export function journeyCamera(progress: number, mobile = false, reduced = false) {
  const p = reduced ? stepThresholds[journeyState(progress).step] : clamp(progress);
  let index = 0;
  while (index < cameraFrames.length - 2 && p > cameraFrames[index + 1].progress) index++;
  const a = cameraFrames[index], b = cameraFrames[index + 1];
  const t = smooth((p - a.progress) / (b.progress - a.progress));
  const scale = mobile ? 1.3 : 1.15;
  return { offset: a.offset.map((value, axis) => lerp(value, b.offset[axis], t) * scale), look: a.look.map((value, axis) => lerp(value, b.look[axis], t)) };
}
export function cranePath(amount: number, start: readonly number[], end: readonly number[]) {
  const t = clamp(amount), height = 21;
  if (t < .28) return [start[0], lerp(start[1], height, smooth(t / .28)), start[2]];
  if (t < .62) { const k = smooth((t - .28) / .34); return [lerp(start[0], end[0], k), height, lerp(start[2], end[2], k)]; }
  return [end[0], lerp(height, end[1], smooth((t - .62) / .38)), end[2]];
}
export function transferProgress(progress: number, index: number, unloading = false) {
  return clamp((progress - (unloading ? .86 : .03)) / ((unloading ? .125 : .33) / 12) - index);
}
