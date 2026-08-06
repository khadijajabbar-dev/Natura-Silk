import nodemailer from 'nodemailer';
import 'dotenv/config';

const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

async function testEmail() {
  console.log("Testing Nodemailer with Gmail...");
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL,
      pass: EMAIL_PASSWORD,
    },
  });

  const targets = ["khadija.125feb26dev@gmail.com", "khadijajabbar173@gmail.com", EMAIL];

  for (const toEmail of targets) {
    try {
      const info = await transporter.sendMail({
        from: `Natura Silk <${EMAIL}>`,
        to: toEmail,
        subject: `Test Order Confirmation & NodeMailer Verification`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; padding: 24px; border: 1px solid #ddd; border-radius: 10px; background: #fff;">
            <h2 style="color: #2E5A22; margin-top:0;">NodeMailer Working Successfully! 🎉</h2>
            <p>Hi Khadija,</p>
            <p>This is an automated verification email sent from <strong>${EMAIL}</strong> to <strong>${toEmail}</strong> via Gmail SMTP and NodeMailer.</p>
            <p>Your NodeMailer configuration is 100% functional and delivering to external inboxes!</p>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #eee; font-size: 13px; color: #777;">
              <strong>Next step:</strong> Please remember to restart your running backend terminal (<code>Ctrl + C</code> then <code>npm start</code>) so that live website checkouts can load these new .env settings!
            </div>
          </div>
        `
      });
      console.log(`✅ Test email sent successfully to ${toEmail} (Message ID: ${info.messageId})`);
    } catch (err) {
      console.error(`❌ Failed to send test email to ${toEmail}:`, err.message);
    }
  }
}

testEmail();
