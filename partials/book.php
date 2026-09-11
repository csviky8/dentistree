<?php
header('Content-Type: text/html');
$name  = htmlspecialchars($_POST['name'] ?? '');
$phone = htmlspecialchars($_POST['phone'] ?? '');
$date  = htmlspecialchars($_POST['date'] ?? '');

if ($name && $phone && $date) {
    echo "<span style='color:#a8e6a3'>✅ Thank you, <strong>$name</strong>! Your appointment on <strong>$date</strong> is confirmed. We'll call you at $phone.</span>";
} else {
    echo "<span style='color:#ffb3b3'>⚠️ Please fill in all fields.</span>";
}
