document.addEventListener('DOMContentLoaded', () => {
  const opening = document.getElementById('opening');
  const site = document.getElementById('site');
  const tapBtn = document.getElementById('tapOpen');
  const bgm = document.getElementById('bgm');
  const musicToggle = document.getElementById('musicToggle');

  tapBtn.addEventListener('click', () => {
    opening.classList.add('opened');
    site.classList.remove('hidden');
    setTimeout(() => {
      opening.style.display = 'none';
      document.body.style.overflow = 'auto';
    }, 1100);
    bgm.play().then(() => {
      musicToggle.classList.add('playing');
    }).catch(() => {});
    revealOnScroll();
  }, { once: true });

  musicToggle.addEventListener('click', () => {
    if (bgm.paused) {
      bgm.play();
      musicToggle.classList.add('playing');
    } else {
      bgm.pause();
      musicToggle.classList.remove('playing');
    }
  });

  // Scroll reveal
  function revealOnScroll() {
    const items = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.15 });
    items.forEach(i => io.observe(i));
  }

  // Countdown
  const target = new Date('2026-10-25T08:00:00+05:30').getTime();
  const els = {
    d: document.getElementById('cd-days'),
    h: document.getElementById('cd-hours'),
    m: document.getElementById('cd-mins'),
    s: document.getElementById('cd-secs')
  };
  const countdownWrap = document.getElementById('countdown');
  const doneMsg = document.getElementById('cd-done');

  function pad(n){ return String(n).padStart(2,'0'); }

  function tick() {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      countdownWrap.classList.add('hidden');
      doneMsg.classList.remove('hidden');
      clearInterval(timer);
      return;
    }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    els.d.textContent = pad(d);
    els.h.textContent = pad(h);
    els.m.textContent = pad(m);
    els.s.textContent = pad(s);
  }
  tick();
  const timer = setInterval(tick, 1000);
});
