import { pool } from '../config/db.js';
const allowedTables = new Set(['students','menus','menu_item','attendance','ingredients','purchases','food_preparation','food_waste']);
export async function getRecentRows(table, limit = 100) {
  if (!allowedTables.has(table)) throw new Error('Unsupported table');
  const [rows] = await pool.query(`SELECT * FROM ${table} LIMIT ?`, [Number(limit)]);
  return rows;
}
export async function getCounts() {
  const tables = ['students','menus','menu_item','attendance','ingredients','purchases','food_preparation','food_waste'];
  const output = {};
  for (const table of tables) {
    try {
      const [rows] = await pool.query(`SELECT COUNT(*) AS total FROM ${table}`);
      output[table] = rows[0].total;
    } catch { output[table] = null; }
  }
  return output;
}
