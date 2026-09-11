/* ── jQuery Validation ── */
$.validator.addMethod('indianPhone', function(v) {
  return /^[6-9]\d{9}$/.test(v);
}, 'Enter a valid 10-digit Indian mobile number.');

const _d = new Date(); 
const _today = _d.getFullYear() + '-' + String(_d.getMonth()+1).padStart(2,'0') + '-' + String(_d.getDate()).padStart(2,'0');
$('#apptDate').attr('min', _today);

$('#apptForm').on('submit', function() {
  if ($(this).valid()) {
    const loader = $('#bookLoader');
    loader.css('display', 'flex');
  }
});

$('#apptForm').validate({
  rules: {
    name:      { required: true, minlength: 2 },
    phone:     { required: true, indianPhone: true },
    date:      { required: true },
    treatment: { required: true }
  },
  messages: {
    name:      { required: 'Name is required.', minlength: 'Enter at least 2 characters.' },
    phone:     { required: 'Phone number is required.' },
    date:      { required: 'Please select a date.' },
    treatment: { required: 'Please select a treatment.' }
  },
  errorClass: 'error',
  validClass: 'valid',
  errorPlacement: function(error, element) {
    error.insertAfter(element);
  }
});

$('#apptPhone').on('input', function() {
  this.value = this.value.replace(/\D/g, '').slice(0, 10);
});

/* ── Navbar scroll ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 50 ? '0 4px 24px rgba(0,0,0,.13)' : '';
});

/* ── Mobile menu ── */
document.getElementById('navBurger').addEventListener('click', () => {
  document.getElementById('navDrawer').classList.toggle('open');
});

document.querySelectorAll('.ba-slider').forEach(slider => {
  const clip     = slider.querySelector('.ba-after-clip');
  const handle   = slider.querySelector('.ba-handle');
  const line     = slider.querySelector('.ba-line');
  const afterImg = slider.querySelector('.ba-img-after');
  let drag = false;

  function init() {
    afterImg.style.width = slider.offsetWidth + 'px';
  }

  function setPos(x) {
    const r = slider.getBoundingClientRect();
    const p = Math.max(3, Math.min(97, ((x - r.left) / r.width) * 100));
    clip.style.width   = p + '%';
    handle.style.left  = p + '%';
    line.style.left    = p + '%';
    afterImg.style.width = r.width + 'px';
  }

  init();
  slider.addEventListener('mousedown',  e => { drag = true; setPos(e.clientX); e.preventDefault(); });
  window.addEventListener('mousemove',  e => { if (drag) setPos(e.clientX); });
  window.addEventListener('mouseup',    () => { drag = false; });
  slider.addEventListener('touchstart', e => { drag = true; setPos(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchmove',  e => { if (drag) setPos(e.touches[0].clientX); }, { passive: true });
  window.addEventListener('touchend',   () => { drag = false; });
});

window.addEventListener('resize', () => {
  document.querySelectorAll('.ba-slider').forEach(s => {
    s.querySelector('.ba-img-after').style.width = s.offsetWidth + 'px';
  });
});

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


