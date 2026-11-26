import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool } from './src/config/db.js';
const name = process.env.ADMIN_NAME || 'Cafeteria Admin';
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
if (!email || !password || password.length < 12) {
  console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD (minimum 12 characters) in backend/.env before running this script.');
  process.exitCode = 1;
  await pool.end();
} else {
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    await pool.execute(
      `INSERT INTO app_users (name, email, password_hash, role)
       VALUES (?, ?, ?, 'admin')
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, password_hash = EXCLUDED.password_hash, role = 'admin'`,
      [name, email, passwordHash]
    );
    console.log('Admin account created or updated.');
  } catch (error) {
    console.error('Admin creation failed:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}
