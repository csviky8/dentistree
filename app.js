/* ── Navbar scroll ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 50 ? '0 4px 24px rgba(0,0,0,.13)' : '';
});

/* ── Mobile menu ── */
document.getElementById('navBurger').addEventListener('click', () => {
  document.getElementById('navDrawer').classList.toggle('open');
});

/* ── Before/After drag slider ── */
(function () {
  const wrap = document.getElementById('baWrap');
  const clip = document.getElementById('baClip');
  const line = document.getElementById('baLine');
  if (!wrap) return;
  let drag = false;

  function move(x) {
    const r = wrap.getBoundingClientRect();
    let p = Math.max(3, Math.min(97, ((x - r.left) / r.width) * 100));
    clip.style.width = p + '%';
    line.style.left  = p + '%';
  }

  wrap.addEventListener('mousedown',   e => { drag = true; move(e.clientX); e.preventDefault(); });
  window.addEventListener('mousemove', e => { if (drag) move(e.clientX); });
  window.addEventListener('mouseup',   () => { drag = false; });
  wrap.addEventListener('touchstart',  e => { drag = true; move(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchmove', e => { if (drag) move(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchend',  () => { drag = false; });
})();

/* ── Testimonials slider ── */
let tIdx = 0;
function visibleCards() {
  return window.innerWidth < 600 ? 1 : window.innerWidth < 860 ? 2 : 3;
}
function testiMove(dir) {
  const track = document.getElementById('testiTrack');
  const cards = track.querySelectorAll('.testi-card');
  if (!cards.length) return;
  tIdx = Math.max(0, Math.min(tIdx + dir, cards.length - visibleCards()));
  const w = cards[0].getBoundingClientRect().width + 20;
  track.style.transform = `translateX(-${tIdx * w}px)`;
}
document.getElementById('testiPrev').addEventListener('click', () => testiMove(-1));
document.getElementById('testiNext').addEventListener('click', () => testiMove(1));

document.body.addEventListener('htmx:afterSwap', e => {
  if (e.detail.target.id === 'testiTrack') tIdx = 0;
});

/* ── Scroll-reveal for sections ── */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      en.target.style.opacity = '1';
      en.target.style.transform = 'none';
      io.unobserve(en.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.doctor-sec, .ba-sec, .testi-sec').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity .65s ease, transform .65s ease';
  io.observe(el);
});
