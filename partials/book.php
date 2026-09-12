<?php
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$name      = htmlspecialchars(trim($_POST['name']      ?? ''));
$phone     = htmlspecialchars(trim($_POST['phone']     ?? ''));
$treatment = htmlspecialchars(trim($_POST['treatment'] ?? 'General Consultation'));

if (!$name || !$phone) {
    echo "<span style='color:#ffb3b3'>Please fill in all fields.</span>";
    exit;
}

// Indian mobile: 10 digits, starts with 6-9
if (!preg_match('/^[6-9]\d{9}$/', $phone)) {
    echo "<span style='color:#ffb3b3'>Enter a valid 10-digit Indian mobile number.</span>";
    exit;
}

/* ══ Gmail SMTP credentials ══
   1. Use a Gmail account for sending
   2. Enable 2-Step Verification on that Gmail
   3. Go to: Google Account → Security → App Passwords
   4. Generate an App Password (select "Mail" + "Windows Computer")
   5. Paste the 16-char password below (no spaces)
*/
$smtp_user = 'auraindustrial26@gmail.com';   // ← your Gmail address
$smtp_pass = 'xyjd rtxf rffj fujx'; // ← 16-char Gmail App Password
$clinic_email = 'csviky8@gmail.com'; // ← clinic receives appointment here

$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $smtp_user;
    $mail->Password   = $smtp_pass;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';
    $mail->Encoding   = 'base64';
    $mail->CharSet    = 'UTF-8';
    $mail->Encoding   = 'base64';

    // ── Email TO clinic ──
    $mail->setFrom($smtp_user, '4S Dentistree Website');
    $mail->addAddress($clinic_email, '4S Dentistree');
    $mail->Subject = "New Appointment Request - $name";
    $mail->isHTML(true);
    $mail->Body = "
    <div style='font-family:Arial,sans-serif;max-width:520px;margin:0 auto;border:1px solid #e8d5a0;border-radius:12px;overflow:hidden'>
      <div style='background:#b8860b;padding:20px 28px;text-align:center'>
        <h2 style='color:#fff;margin:0;font-size:1.2rem'>New Appointment Request</h2>
        <p style='color:#fdf6e3;margin:4px 0 0;font-size:.85rem'>4S Dentistree Website</p>
      </div>
      <div style='padding:28px'>
        <table style='width:100%;border-collapse:collapse;font-size:.9rem'>
          <tr><td style='padding:8px 0;color:#888;width:130px'>Patient Name</td><td style='padding:8px 0;font-weight:700;color:#1c1c1c'>$name</td></tr>
          <tr><td style='padding:8px 0;color:#888'>Phone</td><td style='padding:8px 0;font-weight:700;color:#1c1c1c'>$phone</td></tr>
          <tr><td style='padding:8px 0;color:#888'>Treatment</td><td style='padding:8px 0;font-weight:700;color:#b8860b'>$treatment</td></tr>
        </table>
        <div style='margin-top:20px;padding:14px;background:#fdf6e3;border-radius:8px;font-size:.82rem;color:#555'>
          Please contact the patient within a few hours to confirm the appointment.
        </div>
      </div>
      <div style='background:#f5f0e8;padding:14px 28px;text-align:center;font-size:.75rem;color:#aaa'>
        4S Dentistree – Your Smile. Our Passion
      </div>
    </div>";

    $mail->send();
} catch (Exception $e) {
    error_log("PHPMailer Error: " . $mail->ErrorInfo);
    // still redirect — don't block user
}

/* ── Redirect to Thank You page ── */
$params = http_build_query([
    'name'      => $name,
    'phone'     => $phone,
    'treatment' => $treatment,
]);
header("Location: ../thankyou.php?$params");
exit;
