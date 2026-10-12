import config from '../config.js';
import { postJSON } from './api.js';

export async function submitRSVP(payload) {
  const { endpoint } = config.rsvp;
  if (!endpoint) {
    // Mock: chưa cấu hình backend
    console.info('[rsvp:mock]', payload);
    await new Promise((r) => setTimeout(r, 800));
    return { ok: true, mock: true };
  }
  return postJSON(endpoint, { ...payload, submittedAt: new Date().toISOString() });
}
