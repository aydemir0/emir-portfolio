# Design: Make It Do Something

## Overview
Implement a working contact form using a Next.js Route Handler and the Resend free tier.

## Architecture
- **Client**: `ContactForm.tsx` collects Name, Email, Message, and a hidden Honeypot `website`.
- **Backend Route**: `/api/contact` handles the POST request.
- **Validation**: 
  - Server-side validates inputs (required, trimmed, length limits).
  - Honeypot check: If `website` is filled, act as success but skip sending.
- **Integration**: Uses `Resend` API to send emails to `CONTACT_TO_EMAIL`.

## Environment Variables
- `RESEND_API_KEY`: Secrets for Resend.
- `CONTACT_TO_EMAIL`: The recipient email.
