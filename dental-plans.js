const plans = [
  { id: 'silver', title: 'Silver', price: 1200, benefits: ['2 Dental consultations', 'Diagnostic intraoral radiographs', 'Full-mouth X-ray'] },
  { id: 'gold', title: 'Gold', price: 8000, benefits: ['Dental consultation', 'Full-mouth X-ray', 'Intraoral scan with a personalised oral hygiene report', '2 scaling and polishing sessions per year'] },
  { id: 'platinum', title: 'Platinum', price: 15000, benefits: ['4 dental check-ups per year at no additional cost', 'Full-mouth X-ray', 'Intraoral scan with a personalised oral hygiene report', '2 scaling and polishing sessions per year', 'Flat ₹10,000 discount on Invisalign treatment'] },
  { id: 'kids', title: '4S Kids’', label: 'SMILE GROWTH PLAN', price: 10000, symbol: '🧒', tagline: 'Small Smiles. Healthy Habits. Growing Confidence.', description: 'A proactive dental care plan designed to protect your child’s teeth, identify developing orthodontic problems early, and support healthy dental and jaw development.', benefits: ['Regular Dental & Orthodontic Screening', 'Preventive Dental Care', 'Habit Intervention & Growth Guidance', 'Exclusive Early Orthodontic Care Benefits'] },
  { id: 'senior', title: '4S Senior', label: 'SMILE CARE PLAN', price: 15000, symbol: '👨‍🦳', tagline: 'Healthy Teeth. Comfortable Smiles. Every Stage of Life.', description: 'A preventive dental care membership designed for adults aged 50 and above, helping you protect your natural teeth, manage sensitivity, and maintain a healthy, confident smile.', benefits: ['Regular Dental Screening', 'Sensitivity & Preventive Care', 'Professional Cleaning', 'Exclusive Dental Treatment Benefits'] }
];
const money = value => '₹' + value.toLocaleString('en-IN');
const fullTitle = plan => ['kids', 'senior'].includes(plan.id) ? `${plan.title} ${plan.label}` : plan.title;
function planIcon(plan, placement) {
  if (plan.symbol) return plan.symbol;
  const gradientId = `metal-${plan.id}-${placement}`;
  return `<svg class="membership-icon membership-icon-${plan.id}" viewBox="0 0 64 64" aria-hidden="true" focusable="false"><defs><linearGradient id="${gradientId}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" class="metal-light"/><stop offset=".48" class="metal-middle"/><stop offset="1" class="metal-dark"/></linearGradient></defs><circle cx="32" cy="32" r="30" fill="url(#${gradientId})" stroke="white" stroke-opacity=".8" stroke-width="2"/><circle cx="32" cy="32" r="25" fill="none" stroke="white" stroke-opacity=".45"/><path d="M21 17c-8 0-9 9-6 16 3 6 2 16 7 17 4 1 4-14 10-14s6 15 10 14c5-1 4-11 7-17 3-7 2-16-6-16-5 0-7 3-11 3s-6-3-11-3Z" fill="white" fill-opacity=".94"/><path d="m39 10 1.5 4.5L45 16l-4.5 1.5L39 22l-1.5-4.5L33 16l4.5-1.5Z" fill="white"/></svg>`;
}
const benefitsHTML = plan => plan.benefits.map(benefit => `<li><span aria-hidden="true">✓</span>${benefit}</li>`).join('');
document.getElementById('planGrid').innerHTML = plans.map(plan => `
  <article class="plan-card" data-theme="${plan.id}">
    <header><span class="plan-symbol" aria-hidden="true">${planIcon(plan, 'card')}</span><h2>${['kids', 'senior'].includes(plan.id) ? `${plan.title}<small>${plan.label}</small>` : plan.title}</h2></header>
    <div class="plan-card-body"><div class="fee"><span>Membership Fee</span><strong>${money(plan.price)}</strong></div>
    ${plan.tagline ? `<p class="plan-tagline">${plan.tagline}</p>` : '<span class="card-tooth" aria-hidden="true">🦷</span>'}
    <ul>${benefitsHTML(plan)}</ul>
    ${plan.description ? `<details><summary>About this plan</summary><p>${plan.description}</p></details>` : ''}
    <button type="button" class="choose-plan" data-plan="${plan.id}">Choose Plan <span aria-hidden="true">→</span></button></div>
  </article>`).join('');

// Measure the complete layout and fit both dimensions without clipping content.
// Keep the enquiry dialog outside this scale so its inputs stay comfortable to use.
const showcase = document.querySelector('.plans-page');
function fitShowcase() {
  showcase.style.zoom = '';
  showcase.style.width = '';
  showcase.style.minHeight = '';
  if (window.innerWidth < 1100) return;
  const availableWidth = window.innerWidth - 2;
  const layoutWidth = Math.min(1600, Math.max(1180, availableWidth));
  showcase.style.width = `${layoutWidth}px`;
  const layoutHeight = showcase.offsetHeight;
  const scale = Math.min(1, availableWidth / layoutWidth, (window.innerHeight - 2) / layoutHeight);
  showcase.style.zoom = scale;
  showcase.style.minHeight = `${(window.innerHeight - 2) / scale}px`;
}
let fitFrame;
function scheduleFit() {
  cancelAnimationFrame(fitFrame);
  fitFrame = requestAnimationFrame(fitShowcase);
}
window.addEventListener('resize', scheduleFit);
document.fonts.ready.then(scheduleFit);
showcase.addEventListener('toggle', scheduleFit, true);
fitShowcase();
const dialog = document.getElementById('planDialog');
const select = document.getElementById('planSelect');
const form = document.getElementById('planForm');
const status = document.getElementById('formStatus');
const continueLink = document.getElementById('whatsappContinue');
const confirmation = document.getElementById('planConfirmation');
const enquiryCopy = document.querySelectorAll('.enquiry-copy');
let lastTrigger;
let pending = false;
select.innerHTML = plans.map(plan => `<option value="${plan.id}">${fullTitle(plan)} — ${money(plan.price)}</option>`).join('');
function updatePlan(id) {
  const plan = plans.find(plan => plan.id === id);
  select.value = id;
  document.getElementById('enquiryPanel').dataset.theme = id;
  document.getElementById('dialogTitle').textContent = fullTitle(plan);
  document.getElementById('dialogPrice').textContent = money(plan.price);
  document.getElementById('dialogSymbol').innerHTML = planIcon(plan, 'dialog');
  document.getElementById('dialogBenefits').innerHTML = benefitsHTML(plan);
  status.textContent = '';
}
document.getElementById('planGrid').addEventListener('click', event => {
  const button = event.target.closest('[data-plan]');
  if (!button) return;
  lastTrigger = button;
  form.reset();
  document.getElementById('enquiryPanel').classList.remove('is-confirmed');
  form.hidden = false;
  confirmation.hidden = true;
  enquiryCopy.forEach(element => element.hidden = false);
  dialog.setAttribute('aria-labelledby', 'dialogTitle');
  updatePlan(button.dataset.plan);
  dialog.showModal();
  document.body.classList.add('dialog-open');
});
select.addEventListener('change', () => updatePlan(select.value));
form.addEventListener('input', () => { if (!pending) status.textContent = ''; });
document.getElementById('confirmationDone').addEventListener('click', () => dialog.close());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (!pending && event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); lastTrigger?.focus(); });
dialog.addEventListener('cancel', event => { if (pending) event.preventDefault(); });
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (pending || !form.reportValidity()) return;
  pending = true;
  document.querySelector('.dialog-close').disabled = true;
  const data = new FormData(form);
  const submittedPlan = plans.find(plan => plan.id === data.get('plan'));
  data.set('plan', fullTitle(submittedPlan));
  data.set('membership_fee', money(submittedPlan.price));
  data.set('subject', `${data.get('name').trim()} — Dental Membership Enquiry | ${fullTitle(submittedPlan)}`);
  const controls = [...form.querySelectorAll('input, select, button')];
  controls.forEach(control => control.disabled = true);
  status.textContent = 'Sending your enquiry…';
  const submitButton = form.querySelector('[type="submit"]');
  submitButton.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    const result = await response.json();
    if (!response.ok || !result.success) throw new Error(result.message || 'Unable to submit your enquiry. Please try again.');
    document.getElementById('confirmationName').textContent = data.get('name').trim();
    document.getElementById('confirmationPlan').textContent = fullTitle(submittedPlan);
    document.getElementById('confirmationFee').textContent = money(submittedPlan.price);
    document.getElementById('confirmationPhone').textContent = data.get('phone');
    document.getElementById('confirmationLocation').textContent = data.get('location');
    const whatsappText = `Hello 4S Dentistree! I just submitted a dental membership enquiry.\nName: ${data.get('name').trim()}\nContact: ${data.get('phone')}\nLocation: ${data.get('location')}\nPlan: ${fullTitle(submittedPlan)}\nMembership Fee: ${money(submittedPlan.price)}\nPlease help me with this plan.`;
    continueLink.href = `https://wa.me/919444406704?${new URLSearchParams({ text: whatsappText })}`;
    form.hidden = true;
    document.getElementById('enquiryPanel').classList.add('is-confirmed');
    enquiryCopy.forEach(element => element.hidden = true);
    confirmation.hidden = false;
    dialog.setAttribute('aria-labelledby', 'confirmationTitle');
    if (!dialog.open) {
      dialog.showModal();
      document.body.classList.add('dialog-open');
    }
    dialog.scrollTop = 0;
    document.getElementById('confirmationTitle').focus({ preventScroll: true });
  } catch (error) {
    status.textContent = error instanceof SyntaxError ? 'The enquiry service is unavailable. Please try again or call +91 94444 06704.' : error.message;
  } finally {
    pending = false;
    document.querySelector('.dialog-close').disabled = false;
    submitButton.removeAttribute('aria-busy');
    controls.forEach(control => control.disabled = false);
  }
});
