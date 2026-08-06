import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { signToken } from '../utils/jwt.js';
import { serializeUser } from '../utils/serializers.js';

export async function signup(req, res) {
  const { name, email, password, phone, role } = req.body;

  if (!name || !name.trim()) return res.status(400).json({ error: 'Please enter your name.' });
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });
  if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ error: 'An account with this email already exists.' });

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase(),
    passwordHash,
    phone: phone || null,
    role: role === 'seller' ? 'seller' : 'customer',
  });

  const token = signToken({ id: user._id.toString(), email: user.email, name: user.name, role: user.role });
  res.status(201).json({ token, user: serializeUser(user) });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Please enter your email and password.' });

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Incorrect email or password.' });
  }

  const token = signToken({ id: user._id.toString(), email: user.email, name: user.name, role: user.role || 'customer' });
  res.json({ token, user: serializeUser(user) });
}

export async function me(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found.' });
  res.json({ user: serializeUser(user) });
}

export async function updateProfile(req, res) {
  const { name, phone, address } = req.body;
  const update = {};
  if (name !== undefined) update.name = name;
  if (phone !== undefined) update.phone = phone;
  if (address !== undefined) update.address = address;

  const user = await User.findByIdAndUpdate(req.user.id, update, { new: true });
  res.json({ user: serializeUser(user) });
}
