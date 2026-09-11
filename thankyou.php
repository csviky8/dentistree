<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Thank You – 4S Dentistree</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --gold: #b8860b; --gold-light: #d4a017; --gold-pale: #fdf6e3;
      --gold-border: #e8d5a0; --dark: #1c1c1c; --text: #555;
    }
    html, body { height: 100%; }
    body {
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      /* warm cream gradient background matching reference */
      background: linear-gradient(135deg, #f5ead6 0%, #fdf3e0 40%, #fef9f0 70%, #f8ead5 100%);
    }
    img { display: block; max-width: 100%; }
    a { text-decoration: none; color: inherit; }

    /* ══ FULL PAGE LAYOUT ══ */
    .ty-page {
      position: relative;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    /* ══ BACKGROUND LAYERS ══ */
    /* Woman photo — right side, full height */
    .bg-woman {
      position: fixed; top: 0; right: 0;
      height: 100vh; width: 42%;
      object-fit: cover; object-position: left top;
      z-index: 0;
    }
    /* gradient fade over woman so card reads clearly */
    .bg-woman-fade {
      position: fixed; top: 0; right: 0;
      height: 100vh; width: 50%;
      background: linear-gradient(to right, #fdf3e0 0%, #fdf3e0 30%, transparent 70%);
      z-index: 1; pointer-events: none;
    }

    /* leaf decorations */
    .deco { position: fixed; pointer-events: none; z-index: 2; }
    .deco-tr { top: 0; right: 0;    width: 200px; opacity: .9; }
    .deco-bl { bottom: 0; left: 0;  width: 180px; opacity: .75; transform: rotate(0deg); }
    .deco-lm { top: 50%; left: -10px; transform: translateY(-50%); width: 140px; opacity: .65; }

    /* script text top-right */
    .script-text {
      position: fixed; top: 52px; right: 230px;
      font-family: 'Playfair Display', serif; font-style: italic;
      font-size: 1.25rem; color: var(--gold-light);
      line-height: 1.55; text-align: right;
      z-index: 3; pointer-events: none;
    }

    /* ══ HEADER ══ */
    .ty-header {
      position: relative; z-index: 10;
      padding: 20px 44px;
      display: flex; align-items: center; gap: 12px;
    }
    .ty-header img.logo-icon { width: 42px; }
    .brand-name {
      font-family: 'Playfair Display', serif;
      font-size: 1.1rem; font-weight: 700; color: var(--gold); line-height: 1.2;
    }
    .brand-sub { font-size: .6rem; color: #aaa; letter-spacing: .3px; }

    /* ══ LEFT PERKS ══ */
    .ty-perks {
      position: fixed; left: 36px; top: 50%;
      transform: translateY(-50%);
      display: flex; flex-direction: column; gap: 30px;
      z-index: 10;
    }
    .perk { display: flex; flex-direction: column; align-items: center; gap: 7px; text-align: center; width: 90px; }
    .perk-icon {
      width: 50px; height: 50px; border-radius: 50%;
      background: rgba(253,246,227,.9); border: 1.5px solid var(--gold-border);
      display: flex; align-items: center; justify-content: center;
      color: var(--gold); font-size: 1rem;
      box-shadow: 0 2px 12px rgba(184,134,11,.12);
    }
    .perk strong { font-size: .74rem; font-weight: 700; color: var(--dark); display: block; }
    .perk span   { font-size: .64rem; color: #999; line-height: 1.3; }

    /* ══ MAIN CONTENT ══ */
    .ty-main {
      position: relative; z-index: 10;
      flex: 1;
      display: flex; align-items: center; justify-content: center;
      padding: 16px 44px 16px 170px;
    }

    /* ══ CARD ══ */
    .ty-card {
      background: rgba(255,255,255,.97);
      border: 1.5px solid var(--gold-border);
      border-radius: 22px;
      padding: 40px 46px 32px;
      max-width: 510px; width: 100%;
      box-shadow: 0 12px 60px rgba(184,134,11,.14), 0 2px 16px rgba(0,0,0,.06);
      text-align: center;
    }

    /* check circle */
    .ty-check {
      width: 66px; height: 66px; border-radius: 50%;
      background: linear-gradient(135deg, #c9960e, #b8860b);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 4px;
      box-shadow: 0 6px 24px rgba(184,134,11,.4);
      font-size: 1.5rem; color: #fff; position: relative;
    }
    .ty-check .spark {
      position: absolute; font-size: .5rem; color: var(--gold-light);
    }
    .ty-check .spark-tl { top: -8px; left: -8px; }
    .ty-check .spark-tr { top: -8px; right: -8px; }
    .ty-check .spark-bl { bottom: -8px; left: -8px; }
    .ty-check .spark-br { bottom: -8px; right: -8px; }

    .ty-received {
      font-size: .68rem; letter-spacing: 2.5px; color: var(--gold);
      font-weight: 700; text-transform: uppercase; margin-bottom: 8px;
    }
    .ty-title {
      font-family: 'Playfair Display', serif;
      font-size: 2rem; font-weight: 700; color: var(--dark);
      line-height: 1.15; margin-bottom: 4px;
    }
    .ty-name { color: var(--gold-light); display: block; }
    .ty-desc {
      font-size: .82rem; color: var(--text); line-height: 1.75;
      margin-bottom: 20px;
    }
    .ty-desc strong { color: var(--dark); }

    /* summary */
    .ty-summary {
      border: 1.5px solid var(--gold-border); border-radius: 12px;
      padding: 14px 18px; margin-bottom: 20px; text-align: left;
      background: #fffdf7;
    }
    .ty-summary-label {
      font-size: .62rem; letter-spacing: 1.5px; font-weight: 700;
      color: var(--gold); text-transform: uppercase;
      display: flex; align-items: center; gap: 6px; margin-bottom: 10px;
    }
    .ty-summary-row { display: flex; }
    .ty-summary-col { flex: 1; }
    .ty-summary-col + .ty-summary-col {
      border-left: 1px solid var(--gold-border); padding-left: 18px;
    }
    .field-label {
      font-size: .6rem; letter-spacing: 1px; font-weight: 700;
      color: #bbb; text-transform: uppercase; margin-bottom: 3px;
    }
    .field-val { font-size: .86rem; font-weight: 700; color: var(--dark); }

    /* buttons */
    .ty-actions { display: flex; gap: 10px; margin-bottom: 16px; }
    .btn-wa {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
      background: linear-gradient(135deg, #c9960e, #b8860b); color: #fff;
      padding: 13px 16px; border-radius: 10px;
      font-size: .82rem; font-weight: 700;
      box-shadow: 0 4px 18px rgba(184,134,11,.35);
      transition: transform .18s, box-shadow .18s;
    }
    .btn-wa:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(184,134,11,.4); }
    .btn-call {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
      background: #fff; color: var(--dark);
      padding: 13px 16px; border-radius: 10px;
      font-size: .82rem; font-weight: 700;
      border: 1.5px solid var(--gold-border);
      transition: border-color .2s, transform .18s;
    }
    .btn-call:hover { border-color: var(--gold); transform: translateY(-2px); }

    .ty-back {
      font-size: .78rem; color: #bbb;
      display: flex; align-items: center; justify-content: center; gap: 6px;
      transition: color .2s;
    }
    .ty-back:hover { color: var(--gold); }

    /* ══ WHAT HAPPENS NEXT ══ */
    .ty-next {
      position: relative; z-index: 10;
      background: rgba(255,255,255,.88);
      border-top: 1px solid var(--gold-border);
      padding: 28px 44px;
      text-align: center;
      backdrop-filter: blur(4px);
    }
    .ty-next h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.35rem; margin-bottom: 22px; color: var(--dark);
    }
    .next-steps { display: flex; justify-content: center; gap: 44px; flex-wrap: wrap; }
    .next-step  { display: flex; align-items: flex-start; gap: 14px; max-width: 210px; text-align: left; }
    .step-num {
      width: 30px; height: 30px; border-radius: 50%; flex-shrink: 0;
      background: var(--gold-pale); border: 1.5px solid var(--gold-border);
      display: flex; align-items: center; justify-content: center;
      font-size: .76rem; font-weight: 700; color: var(--gold);
    }
    .step-body .step-icon { color: var(--gold); font-size: 1rem; margin-bottom: 3px; }
    .next-step strong { font-size: .82rem; font-weight: 700; display: block; margin-bottom: 2px; }
    .next-step p { font-size: .72rem; color: #999; line-height: 1.5; margin: 0; }

    /* ══ FOOTER ══ */
    .ty-footer {
      position: relative; z-index: 10;
      background: #120d00;
      padding: 18px 44px;
      display: flex; align-items: center; justify-content: space-between;
      flex-wrap: wrap; gap: 14px;
    }
    .ty-footer-left { color: var(--gold-light); font-size: .82rem; font-weight: 700; }
    .ty-footer-left span { display: block; font-size: .66rem; color: #555; font-weight: 400; margin-top: 2px; }
    .ty-footer-icons { display: flex; gap: 26px; }
    .fi { display: flex; flex-direction: column; align-items: center; gap: 4px; color: #777; font-size: .62rem; text-align: center; }
    .fi i { color: var(--gold); font-size: .95rem; }
    .ty-footer-script {
      font-family: 'Playfair Display', serif; font-style: italic;
      color: var(--gold-light); font-size: .95rem; text-align: right; line-height: 1.45;
    }

    /* ══ RESPONSIVE ══ */
    @media (max-width: 900px) {
      .ty-perks, .bg-woman, .bg-woman-fade, .script-text, .deco-lm { display: none; }
      .ty-main { padding: 16px; }
      .ty-card { padding: 30px 20px 24px; }
      .ty-actions { flex-direction: column; }
      .ty-footer { flex-direction: column; text-align: center; }
      .ty-footer-icons { justify-content: center; }
      .ty-footer-script { text-align: center; }
    }
  </style>
</head>
<body>
<?php
$name      = htmlspecialchars($_GET['name']      ?? 'Patient');
$phone     = htmlspecialchars($_GET['phone']     ?? '');
$treatment = htmlspecialchars($_GET['treatment'] ?? 'Consultation');
$wa_phone  = '919876543210';
$wa_msg    = urlencode("Hi 4S Dentistree! I just booked an appointment.\nName: $name\nTreatment: $treatment\nPhone: $phone\nPlease confirm my appointment.");
?>
<div class="ty-page">

  <!-- BG: woman photo + fade overlay -->
  <img class="bg-woman" src="https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop" alt=""/>
  <div class="bg-woman-fade"></div>



  <!-- Script text -->
  <div class="script-text">A Better<br>Smile<br>A Brighter<br>Tomorrow ♡</div>

  <!-- Header -->
  <header class="ty-header">
    <img class="logo-icon" src="https://img.icons8.com/color/48/tooth.png" alt="logo"/>
    <div>
      <div class="brand-name">4S Dentistree</div>
      <div class="brand-sub">Smile • Care • Confidence • For Life</div>
    </div>
  </header>

  <!-- Left perks -->
  <div class="ty-perks">
    <div class="perk">
      <div class="perk-icon"><i class="fa-regular fa-calendar-days"></i></div>
      <strong>Quick Response</strong>
      <span>We value your time</span>
    </div>
    <div class="perk">
      <div class="perk-icon"><i class="fa-solid fa-shield-halved"></i></div>
      <strong>100% Confidential</strong>
      <span>Your privacy is our priority</span>
    </div>
    <div class="perk">
      <div class="perk-icon"><i class="fa-solid fa-heart"></i></div>
      <strong>Personalized Care</strong>
      <span>Tailored to your needs</span>
    </div>
  </div>

  <!-- Main card -->
  <div class="ty-main">
    <div class="ty-card">

      <div class="ty-check">
        <i class="fa-solid fa-check"></i>
        <span class="spark spark-tl">✦</span>
        <span class="spark spark-tr">✦</span>
        <span class="spark spark-bl">✦</span>
        <span class="spark spark-br">✦</span>
      </div>

      <p class="ty-received">— Request Received —</p>
      <h1 class="ty-title">Thank You,<br><span class="ty-name"><?= $name ?>!</span></h1>
      <p class="ty-desc">
        Your consultation request has been successfully registered.<br>
        Our clinical coordinator will reach out to you within a few hours<br>
        to arrange your appointment with <strong>Dr. S. Matharaman.</strong>
      </p>

      <div class="ty-summary">
        <div class="ty-summary-label"><i class="fa-regular fa-file-lines"></i> Consultation Summary</div>
        <div class="ty-summary-row">
          <div class="ty-summary-col">
            <div class="field-label">Procedure</div>
            <div class="field-val"><?= $treatment ?></div>
          </div>
          <div class="ty-summary-col">
            <div class="field-label">Contact Phone</div>
            <div class="field-val"><?= $phone ?></div>
          </div>
        </div>
      </div>

      <div class="ty-actions">
        <a href="https://wa.me/<?= $wa_phone ?>?text=<?= $wa_msg ?>" target="_blank" class="btn-wa">
          <i class="fa-brands fa-whatsapp" style="font-size:1.1rem"></i> Confirm via WhatsApp &rarr;
        </a>
        <a href="tel:+<?= $wa_phone ?>" class="btn-call">
          <i class="fa-solid fa-phone"></i> Call Clinic Directly &rarr;
        </a>
      </div>

      <a href="index.html" class="ty-back"><i class="fa-solid fa-arrow-left"></i> Back to Homepage</a>
    </div>
  </div>

  <!-- What Happens Next -->
  <div class="ty-next">
    <h3>What Happens Next?</h3>
    <div class="next-steps">
      <div class="next-step">
        <div class="step-num">1</div>
        <div class="step-body">
          <div class="step-icon"><i class="fa-solid fa-user-group"></i></div>
          <strong>Coordinator Review</strong>
          <p>Our team reviews your procedure interest with strict confidentiality.</p>
        </div>
      </div>
      <div class="next-step">
        <div class="step-num">2</div>
        <div class="step-body">
          <div class="step-icon"><i class="fa-regular fa-calendar-days"></i></div>
          <strong>Quick Callback</strong>
          <p>We confirm a convenient date and time at your preferred Chennai centre.</p>
        </div>
      </div>
      <div class="next-step">
        <div class="step-num">3</div>
        <div class="step-body">
          <div class="step-icon"><i class="fa-solid fa-user-doctor"></i></div>
          <strong>1-on-1 Consultation</strong>
          <p>Personalized evaluation & transparent surgical planning with Dr. Matharaman.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Footer -->
  <div class="ty-footer">
    <div class="ty-footer-left">
      Thank you for choosing 4S Dentistree!
      <span>© 2026 4S Dentistree. All rights reserved.</span>
    </div>
    <div class="ty-footer-icons">
      <div class="fi"><i class="fa-solid fa-tooth"></i>Advanced<br>Technology</div>
      <div class="fi"><i class="fa-solid fa-heart"></i>Compassionate<br>Care</div>
      <div class="fi"><i class="fa-solid fa-user-doctor"></i>Experienced<br>Specialists</div>
      <div class="fi"><i class="fa-regular fa-star"></i>Trusted<br>by Families</div>
    </div>
    <div class="ty-footer-script">Healthy Smiles<br>Happier Families ♡</div>
  </div>

</div>
</body>
</html>
