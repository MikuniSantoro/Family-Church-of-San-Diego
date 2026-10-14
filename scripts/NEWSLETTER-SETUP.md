# Connect newsletter signup email notifications

The old newsletter handler simulated success. The new form requires full name and email and submits them to a configured Formspree form. It only shows the requested thank-you message after the service accepts the submission. A provider acceptance response is not proof of inbox delivery.

One-time setup:

1. Create an account at https://formspree.io/ and verify the account email.
2. Create a form named Church Weekly Newsletter. Set its notification recipient to familychurchofsandiego@gmail.com and complete any email verification Formspree requests.
3. Copy the public endpoint in the form's Integration section, such as https://formspree.io/f/abcdefgh.
4. Set window.CHURCH_NEWSLETTER_ENDPOINT in newsletter-config.js to that exact endpoint, or send the public endpoint to Codex to update it. This identifier is intended to be public; never send or commit account passwords or API keys.
5. Review Formspree's spam protection, submission limits, and notification settings. Test from the deployed website with a name and email you control, then verify the submission in Formspree and receipt in the church inbox (including spam). Do not claim email delivery until checked.

The form sends name, email, a newsletter signup subject, and a honeypot field. It does not automatically send a newsletter or manage a mailing list. The church team must add accepted signups to its newsletter process and honor unsubscribe replies. No double-opt-in confirmation email is claimed or sent by this integration.

If the endpoint is missing or malformed, visitors see an instruction to email the church rather than a success message. Provider errors preserve the input for retry. Success/error checks in development used mocked requests; no live email was sent. Account setup, recipient verification and end-to-end delivery remain outstanding.
