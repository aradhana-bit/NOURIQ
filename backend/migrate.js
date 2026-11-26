import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pool } from './src/config/db.js';

const schemaPath = fileURLToPath(new URL('./database/1. schema.sql', import.meta.url));

try {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is required to run PostgreSQL migrations');
  const schema = await readFile(schemaPath, 'utf8');
  await pool.query(schema);
  console.log('PostgreSQL schema is ready.');
} catch (error) {
  console.error('PostgreSQL migration failed:', error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
