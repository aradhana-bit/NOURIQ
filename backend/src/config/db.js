import pg from 'pg';
const { Pool } = pg;
const rawPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000
});
function translate(sql) {
  let text = sql;
  text = text.replace(/SUM\(\s*([a-zA-Z_][\w.]*)\s*=\s*'([^']+)'\s*\)/gi, "COUNT(*) FILTER (WHERE $1 = '$2')");
  text = text.replace(/is_available\s*=\s*1/gi, 'is_available = TRUE');
  text = text.replace(/is_available\s*=\s*0/gi, 'is_available = FALSE');
  text = text.replace(/CAST\(([^)]+)\s+AS\s+CHAR\)/gi, 'CAST($1 AS TEXT)');
  text = text.replace(/CURDATE\(\)/gi, 'CURRENT_DATE');
  text = text.replace(/DATE_SUB\(CURRENT_DATE,\s*INTERVAL\s+(\d+)\s+DAY\)/gi, "(CURRENT_DATE - INTERVAL '$1 days')");
  text = text.replace(/FIELD\(meal_type,\s*'breakfast',\s*'lunch',\s*'snacks',\s*'dinner'\)/gi, "CASE meal_type WHEN 'breakfast' THEN 1 WHEN 'lunch' THEN 2 WHEN 'snacks' THEN 3 WHEN 'dinner' THEN 4 END");
  let index = 0;
  text = text.replace(/\?/g, () => '$' + (++index));
  if (/^\s*INSERT\s+INTO/i.test(text) && !/\bRETURNING\b/i.test(text)) text = text.replace(/;?\s*$/, ' RETURNING id');
  return text;
}
async function execute(executor, sql, params = []) {
  const result = await executor.query(translate(sql), params);
  if (/^\s*SELECT\b/i.test(sql) || /^\s*WITH\b/i.test(sql)) return [result.rows];
  if (/^\s*INSERT\b/i.test(sql)) return [{ insertId: result.rows[0]?.id == null ? null : Number(result.rows[0].id), affectedRows: result.rowCount }];
  return [{ affectedRows: result.rowCount }];
}
export const pool = {
  query: (sql, params = []) => execute(rawPool, sql, params),
  execute: (sql, params = []) => execute(rawPool, sql, params),
  async getConnection() {
    const client = await rawPool.connect();
    return {
      query: (sql, params = []) => execute(client, sql, params),
      execute: (sql, params = []) => execute(client, sql, params),
      beginTransaction: () => client.query('BEGIN'),
      commit: () => client.query('COMMIT'),
      rollback: () => client.query('ROLLBACK'),
      release: () => client.release()
    };
  },
  end: () => rawPool.end()
};
