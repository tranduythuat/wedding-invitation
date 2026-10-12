// <div data-module="countdown" data-date="2026-12-20T10:00:00+07:00"> chứa [data-unit="days|hours|minutes|seconds"]
import config from '../config.js';
import { qs } from '../utils/dom.js';
import { emit } from '../core/events.js';

export default function countdown(root) {
  const target = new Date(root.dataset.date || config.event.date).getTime();
  if (Number.isNaN(target)) return console.warn('[countdown] Ngày không hợp lệ');

  const units = ['days', 'hours', 'minutes', 'seconds'];
  const els = Object.fromEntries(units.map((u) => [u, qs(`[data-unit="${u}"]`, root)]));
  const pad = (n) => String(n).padStart(2, '0');
  let timer;

  function tick() {
    const diff = Math.max(0, target - Date.now());
    const s = Math.floor(diff / 1000);
    const values = {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    };
    units.forEach((u) => els[u] && (els[u].textContent = u === 'days' ? values[u] : pad(values[u])));

    if (diff === 0) {
      clearInterval(timer);
      root.classList.add('is-finished');
      emit('countdown:finished');
    }
  }

  tick();
  timer = setInterval(tick, 1000);
  return { destroy: () => clearInterval(timer) };
}
