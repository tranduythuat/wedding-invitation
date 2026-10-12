// Các animation dùng chung. Dùng trong HTML:
//   <h2 data-anim="fade-up" data-delay="200" data-duration="900">...</h2>
// Thêm preset mới: registerPreset('flip-in', { opacity: [0, 1], rotateX: [-90, 0] })
import { animate } from '../lib/anime.js';
import config from '../config.js';

export const presets = {
  'fade-in': { opacity: [0, 1] },
  'fade-up': { opacity: [0, 1], translateY: [40, 0] },
  'fade-down': { opacity: [0, 1], translateY: [-40, 0] },
  'fade-left': { opacity: [0, 1], translateX: [40, 0] },
  'fade-right': { opacity: [0, 1], translateX: [-40, 0] },
  'zoom-in': { opacity: [0, 1], scale: [0.85, 1] },
};

export const registerPreset = (name, props) => {
  presets[name] = props;
};

export function play(el, name = el.dataset.anim, overrides = {}) {
  const preset = presets[name];
  if (!preset) {
    console.warn(`[anim] Không có preset "${name}"`);
    el.style.opacity = 1;
    return null;
  }
  const d = el.dataset;
  return animate(el, {
    ...preset,
    duration: Number(d.duration) || config.animation.duration,
    delay: Number(d.delay) || 0,
    ease: d.ease || config.animation.ease,
    ...overrides,
  });
}
