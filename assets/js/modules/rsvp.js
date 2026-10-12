// <form data-module="rsvp"> với các field: name, attendance (yes/no), guests, message + [data-el="status"]
import config from '../config.js';
import { qs } from '../utils/dom.js';
import { emit } from '../core/events.js';
import { submitRSVP } from '../services/rsvp.js';

export default function rsvp(form) {
  const status = qs('[data-el="status"]', form);
  const button = qs('button[type="submit"]', form);
  const msg = config.rsvp.messages;

  const setStatus = (state, text) => {
    status.dataset.state = state;
    status.textContent = text;
  };

  function validate(data) {
    if (!data.name) return msg.invalidName;
    if (!data.attendance) return msg.invalidAttendance;
    return null;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    if (fd.get('website')) return; // honeypot: bot điền vào là bỏ qua

    const payload = {
      name: String(fd.get('name') || '').trim(),
      attendance: fd.get('attendance'),
      guests: Number(fd.get('guests')) || 1,
      message: String(fd.get('message') || '').trim(),
    };

    const error = validate(payload);
    if (error) return setStatus('error', error);

    button.disabled = true;
    setStatus('loading', msg.loading);
    try {
      await submitRSVP(payload);
      setStatus('success', msg.success);
      form.reset();
      emit('rsvp:submitted', payload);
    } catch (err) {
      console.error('[rsvp]', err);
      setStatus('error', msg.error);
    } finally {
      button.disabled = false;
    }
  });
}
