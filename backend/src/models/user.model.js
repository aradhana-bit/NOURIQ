import { pool } from '../config/db.js';
export async function findUserByEmail(email) {
  const [rows] = await pool.execute('SELECT id, name, email, password_hash, role FROM app_users WHERE email = ? LIMIT 1', [email]);
  return rows[0];
}
