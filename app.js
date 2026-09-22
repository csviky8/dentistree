/* ── jQuery Validation ── */
$.validator.addMethod('indianPhone', function(v) {
  return /^[6-9]\d{9}$/.test(v);
}, 'Enter a valid 10-digit Indian mobile number.');

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
    treatment: { required: true }
  },
  messages: {
    name:      { required: 'Name is required.', minlength: 'Enter at least 2 characters.' },
    phone:     { required: 'Phone number is required.' },
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

/* ── Appointment form — optional dental photo upload ── */
const apptFiles = document.getElementById('apptFiles');
const apptPreviews = document.getElementById('apptPreviews');
const apptUpload = document.querySelector('.appt-upload');
const apptUploadText = document.querySelector('.appt-upload-text');
if (apptFiles && apptPreviews) {
  const renderApptPreviews = () => {
    apptPreviews.innerHTML = '';
    const files = [...apptFiles.files];
    apptUploadText.innerHTML = files.length
      ? `Attached ${files.length} image${files.length > 1 ? 's' : ''} <em>(optional)</em>`
      : 'Attach dental photos <em>(optional)</em>';
    files.forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onload = e => {
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = file.name;
        apptPreviews.appendChild(img);
      };
      reader.readAsDataURL(file);
    });
  };
  apptFiles.addEventListener('change', renderApptPreviews);

  /* drag & drop onto the upload area */
  ['dragenter', 'dragover'].forEach(ev =>
    apptUpload.addEventListener(ev, e => { e.preventDefault(); apptUpload.classList.add('dragover'); }));
  ['dragleave', 'drop'].forEach(ev =>
    apptUpload.addEventListener(ev, e => { e.preventDefault(); apptUpload.classList.remove('dragover'); }));
  apptUpload.addEventListener('drop', e => {
    if (e.dataTransfer?.files?.length) {
      try { apptFiles.files = e.dataTransfer.files; } catch (err) { /* older browsers: click-to-select only */ }
      renderApptPreviews();
    }
  });
}

/* ── Navbar scroll ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.boxShadow =
    window.scrollY > 50 ? '0 4px 24px rgba(0,0,0,.13)' : '';
});

/* ── Quick-action bar visibility ── */
const quickActions = document.querySelector('.quick-actions');
let lastScrollY = window.scrollY;
if (quickActions) {
  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY <= 40 || currentScrollY < lastScrollY) {
      quickActions.classList.remove('is-hidden');
    } else if (currentScrollY > lastScrollY + 4) {
      quickActions.classList.add('is-hidden');
    }
    lastScrollY = currentScrollY;
  }, { passive: true });
}

/* ── Hero stats count-up ── */
const statsBar = document.querySelector('.hero-stats');
const statValues = document.querySelectorAll('.stat-value');
let statsStarted = false;
function animateStatValues() {
  if (statsStarted) return;
  statsStarted = true;
  statValues.forEach(value => {
    const target = Number(value.dataset.count);
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      value.textContent = Math.floor(target * eased).toLocaleString() + '+';
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
if (statsBar && statValues.length) {
  const statsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateStatValues();
      statsObserver.disconnect();
    }
  }, { threshold: .35 });
  statsObserver.observe(statsBar);
}

/* ── Trust section count-up ── */
const trustStats = document.querySelector('.doc-stats-col');
const trustStatValues = document.querySelectorAll('.trust-stat-value');
let trustStatsStarted = false;
function animateTrustStats() {
  if (trustStatsStarted) return;
  trustStatsStarted = true;
  trustStatValues.forEach(value => {
    const target = Number(value.dataset.count);
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      value.textContent = Math.floor(target * eased).toLocaleString() + '+';
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
if (trustStats && trustStatValues.length) {
  const trustStatsObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      animateTrustStats();
      trustStatsObserver.disconnect();
    }
  }, { threshold: .35 });
  trustStatsObserver.observe(trustStats);
}

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
document.getElementById('testiPrev')?.addEventListener('click', () => testiMove(-1));
document.getElementById('testiNext')?.addEventListener('click', () => testiMove(1));

/* ── What We Do — scroll entrance animation ── */
const wwdObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.wwd-card');
      cards.forEach((card, i) => {
        setTimeout(() => card.classList.add('wwd-visible'), i * 120);
      });
      if (window.innerWidth > 900) {
        setTimeout(() => entry.target.classList.add('fan-out'), 720);
        setTimeout(() => entry.target.classList.remove('fan-out'), 3000);
      }
      wwdObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

const wwdGrid = document.querySelector('.wwd-grid');
if (wwdGrid) wwdObserver.observe(wwdGrid);

/* ── Instagram portfolio reveal ── */
const instaGrid = document.querySelector('.insta-grid');
if (instaGrid) {
  const instaObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      instaGrid.querySelectorAll('.insta-item').forEach((item, index) => {
        setTimeout(() => item.classList.add('insta-visible'), index * 90);
      });
      instaObserver.disconnect();
    }
  }, { threshold: .15 });
  instaObserver.observe(instaGrid);
}

/* ── Portfolio dental video lightbox ── */
const videoModal = document.getElementById('videoModal');
const dentalVideo = document.getElementById('dentalVideo');
if (videoModal && dentalVideo) {
  const closeVideo = () => {
    dentalVideo.pause();
    dentalVideo.currentTime = 0;
    videoModal.classList.remove('is-open');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  document.querySelectorAll('.insta-item').forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      videoModal.classList.add('is-open');
      videoModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      dentalVideo.play().catch(() => {});
    });
  });
  videoModal.querySelectorAll('[data-video-close]').forEach(control => control.addEventListener('click', closeVideo));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && videoModal.classList.contains('is-open')) closeVideo();
  });
}

/* Touch-friendly image zoom for the What We Do cards. */
document.querySelectorAll('.wwd-card').forEach(card => {
  card.tabIndex = 0;
  card.addEventListener('mouseenter', () => {
    document.querySelectorAll('.wwd-card.wwd-active').forEach(activeCard => activeCard.classList.remove('wwd-active'));
    card.classList.add('wwd-active');
  });
  card.addEventListener('click', () => {
    document.querySelectorAll('.wwd-card.wwd-active').forEach(activeCard => activeCard.classList.remove('wwd-active'));
    card.classList.add('wwd-active');
  });
});

/* ── Advanced Technology cards reveal ── */
const techGrid = document.querySelector('.tech-grid');
if (techGrid) {
  const techObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      techGrid.querySelectorAll('.tech-card').forEach((card, i) => {
        setTimeout(() => card.classList.add('tech-visible'), i * 90);
      });
      techObserver.disconnect();
    }
  }, { threshold: .15 });
  techObserver.observe(techGrid);
}

/* ── Services heading — word-by-word scroll reveal ── */
const svcHead = document.querySelector('.sec-head-svc');
if (svcHead) {
  if (!('IntersectionObserver' in window)) {
    svcHead.classList.add('is-revealed');
  } else {
    const svcHeadObserver = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        svcHead.classList.add('is-revealed');
        svcHeadObserver.disconnect();
      }
    }, { threshold: .35 });
    svcHeadObserver.observe(svcHead);
  }
}

/* ── Responsive treatment slider autoplay ── */
if (wwdGrid) {
  const sliderCards = [...wwdGrid.querySelectorAll('.wwd-card')];
  const sliderMedia = window.matchMedia('(max-width: 860px)');
  let sliderIndex = 0;
  let sliderTimer;
  let sliderPaused = false;

  const moveTreatmentSlider = () => {
    if (!sliderMedia.matches || sliderPaused || document.hidden) return;
    sliderIndex = (sliderIndex + 1) % sliderCards.length;
    sliderCards.forEach(card => card.classList.remove('wwd-active'));
    sliderCards[sliderIndex].classList.add('wwd-active');
    const activeCard = sliderCards[sliderIndex];
    const centeredLeft = activeCard.offsetLeft - (wwdGrid.clientWidth - activeCard.offsetWidth) / 2;
    wwdGrid.scrollTo({ left: Math.max(0, centeredLeft), behavior: 'smooth' });
  };

  const startTreatmentSlider = () => {
    clearInterval(sliderTimer);
    if (sliderMedia.matches) sliderTimer = setInterval(moveTreatmentSlider, 3600);
  };

  ['mouseenter', 'touchstart', 'focusin'].forEach(eventName => {
    wwdGrid.addEventListener(eventName, () => { sliderPaused = true; }, { passive: true });
  });
  ['mouseleave', 'touchend', 'focusout'].forEach(eventName => {
    wwdGrid.addEventListener(eventName, () => { sliderPaused = false; }, { passive: true });
  });
  sliderMedia.addEventListener('change', startTreatmentSlider);
  startTreatmentSlider();
}

