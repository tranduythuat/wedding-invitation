// Mở bì thư: hint -> seal -> flap -> card -> ẩn overlay, rồi phát sự kiện 'envelope:opened'.
import config from '../config.js';
import { createTimeline } from '../lib/anime.js';
import { qs } from '../utils/dom.js';
import { emit } from '../core/events.js';

export default function envelope(root) {
  const cfg = config.envelope;
  const env = qs('.envelope', root);
  const flap = qs('.envelope__flap', root);
  const card = qs('.envelope__card', root);
  const seal = qs('.envelope__seal', root);
  const hint = qs('.envelope__hint', root);
  let opening = false;

  document.documentElement.dataset.state = 'locked';

  function finish() {
    root.classList.add('is-hidden');
    document.documentElement.dataset.state = 'opened';
    window.scrollTo(0, 0);
    emit('envelope:opened');
  }

  function open() {
    if (opening) return;
    opening = true;

    createTimeline({ defaults: { ease: 'inOutQuad' }, onComplete: finish })
      .add(hint, { opacity: 0, duration: cfg.hint })
      .add(seal, { scale: [1, 1.35], rotate: '15deg', opacity: [1, 0], duration: cfg.seal, ease: 'inBack' })
      .add(flap, {
        rotateX: [0, -178],
        duration: cfg.flap,
        ease: 'inOutCubic',
        onUpdate: (self) => {
          if (self.progress > 0.51) flap.classList.add('is-behind');
        },
      })
      .add(card, { translateY: [0, -170], duration: cfg.card, ease: 'outCubic' }, `+=${cfg.gap}`)
      .add(env, { scale: [1, 1.06], opacity: [1, 0], duration: cfg.exit, ease: 'inCubic' }, '+=250')
      .add(root, { opacity: [1, 0], duration: 350, ease: 'outQuad' });
  }

  env.addEventListener('click', open);
  env.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      open();
    }
  });

  return { open };
}
