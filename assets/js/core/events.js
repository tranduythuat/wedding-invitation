// Event bus mỏng dựa trên CustomEvent, để các module giao tiếp mà không import lẫn nhau.
// Ví dụ: emit('envelope:opened'); on('rsvp:submitted', e => console.log(e.detail));
export const emit = (name, detail = {}) =>
  document.dispatchEvent(new CustomEvent(name, { detail }));

export const on = (name, handler, options) => {
  document.addEventListener(name, handler, options);
  return () => document.removeEventListener(name, handler, options);
};
