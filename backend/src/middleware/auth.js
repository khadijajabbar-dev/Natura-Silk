import { verifyToken } from '../utils/jwt.js';

// No customer login/signup anymore — every visitor (guest) is identified by
// a random id the frontend generates once and stores in localStorage, sent
// on every request as the `x-guest-id` header. This lets guests have a
// persistent cart and order history without ever creating an account.
export function identifyGuest(req, res, next) {
  const guestId = req.headers['x-guest-id'];
  if (!guestId || typeof guestId !== 'string') {
    return res.status(400).json({ error: 'Missing guest session. Please refresh the page and try again.' });
  }
  req.guestId = guestId;
  next();
}

export function requireAdmin(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Admin login required.' });
  }

  try {
    const payload = verifyToken(token);
    if (payload.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access only.' });
    }
    req.admin = true;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Your admin session has expired. Please log in again.' });
  }
}
