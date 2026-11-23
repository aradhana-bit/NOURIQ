import { getRecentRows } from '../models/cafeteria.model.js';
export async function listTable(req, res, next) {
  try {
    const rows = await getRecentRows(req.params.table, Math.min(Number(req.query.limit || 100), 500));
    res.json({ data: rows });
  } catch (err) { next(err); }
}
