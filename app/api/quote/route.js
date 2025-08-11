import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limit (resets when server restarts)
const rateLimit = {};
const LIMIT = 3; // requests
const WINDOW = 60 * 1000; // 1 minute

export async function POST(req) {
  try {
    const { name, email, service, budget, details, company, token, ts } =
      await req.json();

    // Honeypot: if filled, treat as spam
    if (company && company.trim() !== '') {
      return Response.json({ ok: true });
    }

    // Min dwell time: must be on page > 5s
    if (!ts || Date.now() - ts < 5000) {
      return Response.json({ ok: false, error: 'Too fast' }, { status: 400 });
    }

    // Rate limit per IP
    const ip =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const now = Date.now();
    if (!rateLimit[ip]) rateLimit[ip] = [];
    rateLimit[ip] = rateLimit[ip].filter(t => now - t < WINDOW);
    if (rateLimit[ip].length >= LIMIT) {
      return Response.json(
        { ok: false, error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }
    rateLimit[ip].push(now);

    // Verify reCAPTCHA
    if (!token) {
      return Response.json(
        { ok: false, error: 'Missing reCAPTCHA' },
        { status: 400 }
      );
    }
    const verifyRes = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );
    const verifyJson = await verifyRes.json();
    if (!verifyJson.success || verifyJson.score < 0.5) {
      return Response.json(
        { ok: false, error: 'Failed reCAPTCHA' },
        { status: 400 }
      );
    }

    // Send email via Resend
    const sendResult = await resend.emails.send({
      from: 'Drone Website <onboarding@resend.dev>',
      to: 'gracjanmarkiewicz00@gmail.com',
      subject: 'New Drone Quote Request',
      html: `
        <h1>New Quote Request</h1>
        <p><strong>Name:</strong> ${name || 'N/A'}</p>
        <p><strong>Email:</strong> ${email || 'N/A'}</p>
        <p><strong>Service:</strong> ${service || 'N/A'}</p>
        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
        <p><strong>Details:</strong></p>
        <p>${(details || '').replace(/\n/g, '<br>')}</p>
      `,
    });

    if (sendResult.error) {
      console.error('Resend API error:', sendResult.error);
      return Response.json(
        { ok: false, error: 'Email failed to send' },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Quote API error', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
