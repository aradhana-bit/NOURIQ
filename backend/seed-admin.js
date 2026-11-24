
import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { pool } from './src/config/db.js';

const name = 'Cafeteria Admin';
const email = 'admin@cafeteria.com';
const password = 'Admin@12345';

try {
  const passwordHash = await bcrypt.hash(password, 12);
  await pool.execute(
    `INSERT INTO app_users (name, email, password_hash, role)
     VALUES (?, ?, ?, 'admin')
     ON DUPLICATE KEY UPDATE
     name = VALUES(name),
     password_hash = VALUES(password_hash),
     role = 'admin'`,
    [name, email, passwordHash]
  );
  console.log('Admin account created successfully.');
  console.log('Email:', email);
  console.log('Password:', password);
} catch (error) {
  console.error('Admin creation failed:', error.message);
} finally {
  await pool.end();
}
