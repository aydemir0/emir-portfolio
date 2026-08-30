# Make It Do Something

## What is a backend?
A backend is the part of a website that runs on the server instead of in the visitor's browser. It can safely use private keys and talk to services that the browser should not access directly.

## What did I add?
I added one working contact form to my portfolio.
A visitor enters their name, email and message.
The form sends that information to my own Next.js backend endpoint.
The backend checks the data and sends the message to my inbox through Resend.

## How the data moves
Visitor → Contact form → /api/contact → validation → Resend → my inbox → success response

The browser never sees my Resend API key. Only the backend has it.
If Resend accepts the email, the backend returns success and the form shows a confirmation.
If something fails, the backend returns an error and the user's message stays in the form so they can try again.

## Free tier
This implementation uses Resend's free tier to send emails.

## Proof
Production verification:
PENDING

Real inbox test:
PENDING
