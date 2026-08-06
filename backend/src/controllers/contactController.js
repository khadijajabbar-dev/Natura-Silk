import ContactMessage from '../models/ContactMessage.js';

// POST /api/contact
// Body: { name, email, message, website_alt }
// `website_alt` is a honeypot field — it's hidden from real visitors via CSS,
// so only bots that auto-fill every input on a form end up putting anything
// in it. If it's non-empty, we silently pretend the submission succeeded
// (no error, no data saved) instead of telling the bot its filter failed.
export async function submitContactMessage(req, res, next) {
  try {
    const { name, email, message, website_alt } = req.body;

    if (website_alt) {
      return res.json({ ok: true });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' });
    }

    const saved = await ContactMessage.create({ name, email, message });
    return res.json({ ok: true, id: saved._id });
  } catch (err) {
    next(err);
  }
}

// GET /api/contact — admin only, lists submissions newest first
export async function listContactMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json({ messages });
  } catch (err) {
    next(err);
  }
}
