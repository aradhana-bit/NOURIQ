import { getCounts } from '../models/cafeteria.model.js';
export async function dashboard(req, res, next) {
  try { res.json({ counts: await getCounts() }); } catch (err) { next(err); }
}
