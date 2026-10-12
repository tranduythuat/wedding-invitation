import { register, boot } from './core/app.js';
import envelope from './modules/envelope.js';
import reveal from './modules/reveal.js';
import countdown from './modules/countdown.js';
import slider from './modules/slider.js';
import rsvp from './modules/rsvp.js';

document.documentElement.classList.add('js');

// Đăng ký module; thêm tính năng mới chỉ cần thêm 1 dòng ở đây
register('envelope', envelope);
register('reveal', reveal);
register('countdown', countdown);
register('slider', slider);
register('rsvp', rsvp);

boot();
