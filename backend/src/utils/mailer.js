// import nodemailer from 'nodemailer';

// // ── Two ways to send email — use whichever is easier for you ──
// //
// // Option A: RESEND_API_KEY (recommended, simplest — no App Passwords needed)
// //   Sign up free at https://resend.com, grab an API key, set it below.
// //
// // Option B: SMTP_HOST / SMTP_USER / SMTP_PASS (e.g. Gmail with an App Password)
// //
// // If RESEND_API_KEY is set, it's used. Otherwise it falls back to SMTP.
// // If neither is set, emails are skipped (the site still works fine).

// const RESEND_API_KEY = process.env.RESEND_API_KEY;

// const SMTP_HOST = process.env.SMTP_HOST;
// const SMTP_PORT = process.env.SMTP_PORT || 587;
// const SMTP_USER = process.env.SMTP_USER;
// const SMTP_PASS = process.env.SMTP_PASS;

// const MAIL_FROM = process.env.MAIL_FROM || 'HairCare <onboarding@resend.dev>';

// // FRONTEND_URL is used to build the "Track Order" link in the email —
// // set this to your real domain once deployed (defaults to the local dev
// // server address).
// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// const useResend = Boolean(RESEND_API_KEY);
// const useSmtp = !useResend && Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS);
// const isConfigured = useResend || useSmtp;

// let transporter = null;
// if (useSmtp) {
//   const isGmail = /gmail\.com$/i.test(SMTP_USER) || /gmail/i.test(SMTP_HOST);
//   transporter = isGmail
//     ? nodemailer.createTransport({
//         service: 'gmail',
//         auth: { user: SMTP_USER, pass: SMTP_PASS },
//       })
//     : nodemailer.createTransport({
//         host: SMTP_HOST,
//         port: Number(SMTP_PORT),
//         secure: Number(SMTP_PORT) === 465,
//         auth: { user: SMTP_USER, pass: SMTP_PASS },
//       });
// }

// if (!isConfigured) {
//   console.warn(
//     '⚠️  Email sending is not configured (no RESEND_API_KEY and no SMTP_HOST/SMTP_USER/SMTP_PASS in .env). ' +
//     'Order confirmation emails will be skipped — the site will still work fine otherwise.'
//   );
// } else {
//   console.log(`✅ Email sending configured via ${useResend ? 'Resend API' : 'SMTP'}.`);
// }

// export function getTrackOrderUrl(orderId) {
//   return `${FRONTEND_URL}/orders/${orderId}`;
// }

// async function sendViaResend({ to, subject, html }) {
//   const res = await fetch('https://api.resend.com/emails', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${RESEND_API_KEY}`,
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ from: MAIL_FROM, to, subject, html }),
//   });
//   if (!res.ok) {
//     const body = await res.text().catch(() => '');
//     throw new Error(`Resend API error (${res.status}): ${body}`);
//   }
// }

// async function sendViaSmtp({ to, subject, html }) {
//   await transporter.sendMail({ from: MAIL_FROM, to, subject, html });
// }

// export async function sendOrderConfirmationEmail({ to, order, items }) {
//   if (!isConfigured || !to) return { sent: false };

//   const trackUrl = getTrackOrderUrl(order.id);
//   const itemRows = items
//     .map(
//       (i) => `
//         <tr>
//           <td style="padding:8px 0;border-bottom:1px solid #E3DCC8;">${i.product_name} × ${i.quantity}</td>
//           <td style="padding:8px 0;border-bottom:1px solid #E3DCC8;text-align:right;">PKR ${(i.price * i.quantity).toLocaleString()}</td>
//         </tr>`
//     )
//     .join('');

//   const html = `
//   <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#2A2A22;">
//     <div style="background:#2C3520;padding:24px;text-align:center;border-radius:8px 8px 0 0;">
//       <h1 style="color:#fff;font-size:20px;margin:0;">Your order has been placed! 🎉</h1>
//     </div>
//     <div style="background:#fff;padding:24px;border:1px solid #E3DCC8;border-top:none;">
//       <p>Hi ${order.shipping_name || 'there'},</p>
//       <p>Thanks for shopping with us! We've received your order <strong>#${order.id.slice(-6).toUpperCase()}</strong> and we'll get it ready for delivery shortly.</p>

//       <table style="width:100%;border-collapse:collapse;margin:16px 0;">
//         ${itemRows}
//         <tr>
//           <td style="padding:10px 0 0;font-weight:bold;">Total</td>
//           <td style="padding:10px 0 0;font-weight:bold;text-align:right;">PKR ${order.total.toLocaleString()}</td>
//         </tr>
//       </table>

//       <p style="font-size:13.5px;color:#6B6B5E;">
//         Shipping to: ${order.shipping_address}, ${order.shipping_city}<br/>
//         Payment method: ${order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method}
//       </p>

//       <div style="text-align:center;margin:28px 0 12px;">
//         <a href="${trackUrl}" style="background:#3F4A2E;color:#fff;text-decoration:none;padding:13px 30px;border-radius:4px;font-weight:bold;display:inline-block;">
//           Track Order
//         </a>
//       </div>
//       <p style="font-size:12.5px;color:#6B6B5E;text-align:center;">
//         Click the button above any time to see your order's live status (placed, processing, dispatched, or delivered).
//       </p>
//     </div>
//   </div>`;

//   const subject = `Order Confirmed — #${order.id.slice(-6).toUpperCase()}`;

//   try {
//     if (useResend) {
//       await sendViaResend({ to, subject, html });
//     } else {
//       await sendViaSmtp({ to, subject, html });
//     }
//     return { sent: true };
//   } catch (err) {
//     console.error('⚠️  Failed to send order confirmation email:', err.message);
//     return { sent: false, error: err.message };
//   }
// }



import nodemailer from 'nodemailer';

// Simple Gmail-based email sending via nodemailer's "gmail" service shorthand
// — the same pattern as a plain nodemailer + Gmail App Password setup.
//
// Set these two in backend/.env:
//   EMAIL=youraddress@gmail.com
//   EMAIL_PASSWORD=your-16-character-app-password
//
// If they're not set, order emails are just skipped (checkout still works).

import dotenv from 'dotenv';
dotenv.config();

function getMailerConfig() {
  // Always reload dotenv so .env changes are picked up immediately without restarting node
  dotenv.config();
  const EMAIL = process.env.EMAIL;
  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
  const MAIL_FROM = process.env.MAIL_FROM || EMAIL;
  const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
  const isConfigured = Boolean(EMAIL && EMAIL_PASSWORD);
  
  let transporter = null;
  if (isConfigured) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD,
      },
    });
  }
  return { EMAIL, EMAIL_PASSWORD, MAIL_FROM, FRONTEND_URL, isConfigured, transporter };
}

export function getTrackOrderUrl(orderId) {
  const { FRONTEND_URL } = getMailerConfig();
  return `${FRONTEND_URL}/track/${orderId}`;
}

export async function sendOrderConfirmationEmail({ to, order, items }) {
  const { MAIL_FROM, isConfigured, transporter } = getMailerConfig();
  if (!isConfigured || !to) {
    console.warn('⚠️ Cannot send email: EMAIL or EMAIL_PASSWORD missing in .env, or destination address missing.');
    return { sent: false };
  }

  const trackUrl = getTrackOrderUrl(order.id);
  const itemRows = items
    .map(
      (i) => `
        <tr>
          <td style="padding:8px 0;border-bottom:1px solid #E3DCC8;">${i.product_name} × ${i.quantity}</td>
          <td style="padding:8px 0;border-bottom:1px solid #E3DCC8;text-align:right;">PKR ${(i.price * i.quantity).toLocaleString()}</td>
        </tr>`
    )
    .join('');

  const mailOptions = {
    from: MAIL_FROM,
    to,
    subject: `Order Confirmed — #${order.id.slice(-6).toUpperCase()}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#2A2A22;">
        <div style="background:#2C3520;padding:24px;text-align:center;border-radius:8px 8px 0 0;">
          <h1 style="color:#fff;font-size:20px;margin:0;">Your order has been placed! 🎉</h1>
        </div>
        <div style="background:#fff;padding:24px;border:1px solid #E3DCC8;border-top:none;">
          <p>Hi ${order.shipping_name || 'there'},</p>
          <p>Thanks for shopping with us! We've received your order <strong>#${order.id.slice(-6).toUpperCase()}</strong> and we'll get it ready for delivery shortly.</p>

          <table style="width:100%;border-collapse:collapse;margin:16px 0;">
            ${itemRows}
            <tr>
              <td style="padding:10px 0 0;font-weight:bold;">Total</td>
              <td style="padding:10px 0 0;font-weight:bold;text-align:right;">PKR ${order.total.toLocaleString()}</td>
            </tr>
          </table>

          <p style="font-size:13.5px;color:#6B6B5E;">
            Shipping to: ${order.shipping_address}, ${order.shipping_city}<br/>
            Payment method: ${order.payment_method === 'cod' ? 'Cash on Delivery' : order.payment_method}
          </p>

          <div style="text-align:center;margin:28px 0 12px;">
            <a href="${trackUrl}" style="display:inline-block;padding:12px 24px;background:#3F4A2E;color:#fff;border-radius:8px;text-decoration:none;font-weight:bold;">
              Track Order
            </a>
          </div>
          <p style="font-size:12.5px;color:#6B6B5E;text-align:center;">
            Click the button above any time to see your order's live status (placed, processing, dispatched, or delivered).
          </p>
        </div>
      </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { sent: true };
  } catch (err) {
    console.error('⚠️  Failed to send order confirmation email:', err.message);
    return { sent: false, error: err.message };
  }
}
