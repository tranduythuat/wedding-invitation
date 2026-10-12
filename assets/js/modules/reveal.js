// Chạy animation [data-anim] khi phần tử cuộn vào viewport (IntersectionObserver).
// Nếu có bì thư, chờ sự kiện 'envelope:opened' rồi mới bắt đầu.
import config from '../config.js';
import { qsa } from '../utils/dom.js';
import { on } from '../core/events.js';
import { play } from '../animations/presets.js';

export default function reveal(root) {
  const items = qsa('[data-anim]', root);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let observer;

  function start() {
    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => (el.style.opacity = 1));
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          play(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { threshold: config.animation.threshold }
    );
    items.forEach((el) => observer.observe(el));
  }

  if (document.documentElement.dataset.state === 'locked') on('envelope:opened', start, { once: true });
  else start();

  return { destroy: () => observer?.disconnect() };
}
