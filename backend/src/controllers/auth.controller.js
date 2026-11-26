import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../models/user.model.js';
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
    const demoEnabled = process.env.DEMO_LOGIN_ENABLED === 'true';
    if (demoEnabled && email === process.env.DEMO_ADMIN_EMAIL && password === process.env.DEMO_ADMIN_PASSWORD && process.env.DEMO_ACCESS_TOKEN) {
      return res.json({
        user: { id: 'nouriq-demo-admin', email: process.env.DEMO_ADMIN_EMAIL, role: 'admin', name: 'NOURIQ Demo Admin', demo: true },
        accessToken: process.env.DEMO_ACCESS_TOKEN,
        refreshToken: null,
        demo: true
      });
    }
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password_hash))) return res.status(401).json({ message: 'Invalid credentials' });
    const payload = { id: user.id, email: user.email, role: user.role, name: user.name };
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: user.id, tokenType: 'refresh' }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    res.json({ user: payload, accessToken, refreshToken });
  } catch (err) { next(err); }
}
