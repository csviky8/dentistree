Dental membership enquiries use the same Web3Forms endpoint and access key as the existing appointment form in index.html. The access key routes email to the recipient configured in the existing Web3Forms account; it is a public form key, not an SMTP password.

The enquiry sends name, contact number, preferred clinic, selected plan and membership fee. Its subject includes the patient's name and plan. Submission uses AJAX and displays confirmation only after Web3Forms returns success. Errors leave the form and its values available for retry.

Confirmation stays inside the plan dialog, with a gold thank-you design adapted from thankyou.html, an enquiry summary, next steps, a Call Clinic button, and a WhatsApp button to +91 94444 06704. WhatsApp opens only when the visitor clicks the button and contains all enquiry details; the visitor taps Send in WhatsApp.

The existing thankyou.html and appointment form are unchanged. If the email recipient needs to change, configure the existing Web3Forms account or replace the public key in both forms. Localhost testing may be limited by domain restrictions configured in that account. Service acceptance does not confirm inbox delivery.
