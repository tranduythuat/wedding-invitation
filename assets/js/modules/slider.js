// <div class="swiper" data-module="slider" data-swiper='{"loop":false}'> ... </div>
// Tùy chọn: config.swiper (mặc định) < data-swiper (từng slider).
import config from '../config.js';
import { qs } from '../utils/dom.js';

export default function slider(root) {
  if (!window.Swiper) return console.warn('[slider] Swiper chưa được nạp.');

  let custom = {};
  try {
    custom = JSON.parse(root.dataset.swiper || '{}');
  } catch {
    console.warn('[slider] data-swiper không phải JSON hợp lệ');
  }

  const pagination = qs('.swiper-pagination', root);
  const next = qs('.swiper-button-next', root);
  const prev = qs('.swiper-button-prev', root);

  const swiper = new window.Swiper(root, {
    ...config.swiper,
    ...(pagination && { pagination: { el: pagination, clickable: true } }),
    ...(next && prev && { navigation: { nextEl: next, prevEl: prev } }),
    ...custom,
  });

  return { destroy: () => swiper.destroy() };
}
