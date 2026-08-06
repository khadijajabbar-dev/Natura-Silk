import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'haircare-dev-secret-change-in-production';
const EXPIRES_IN = '7d';

export function signToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
