import { pool } from '../config/db.js';
export async function summary(req, res, next) {
  try {
    const [[students]] = await pool.query("SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE status = 'active') AS active FROM students");
    const [[menu]] = await pool.query('SELECT COUNT(*) AS total FROM menu_item WHERE is_available = TRUE');
    const [[attendance]] = await pool.query("SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE status = 'present') AS present FROM attendance WHERE attendance_date = CURRENT_DATE");
    const [[prepared]] = await pool.query("SELECT COALESCE(SUM(quantity_prepared),0) AS total FROM food_preparation WHERE preparation_date >= CURRENT_DATE - INTERVAL '7 days'");
    const [[waste]] = await pool.query("SELECT COALESCE(SUM(quantity),0) AS total FROM food_waste WHERE waste_date >= CURRENT_DATE - INTERVAL '7 days'");
    const [demandForecast] = await pool.query(`
      SELECT meal_type, ROUND(AVG(daily_present)) AS estimated_attendance, COUNT(*) AS days_observed
      FROM (
        SELECT meal_type, attendance_date, COUNT(*) FILTER (WHERE status = 'present') AS daily_present
        FROM attendance
        WHERE attendance_date >= CURRENT_DATE - INTERVAL '13 days'
        GROUP BY meal_type, attendance_date
      ) AS daily_meals
      GROUP BY meal_type
      ORDER BY CASE meal_type WHEN 'breakfast' THEN 1 WHEN 'lunch' THEN 2 WHEN 'snacks' THEN 3 WHEN 'dinner' THEN 4 END
    `);
    const [lowStock] = await pool.query('SELECT id, ingredient_name, quantity, unit, reorder_level FROM ingredients WHERE quantity <= reorder_level ORDER BY quantity ASC');
    const [wasteByDay] = await pool.query('SELECT waste_date AS date, SUM(quantity) AS quantity FROM food_waste WHERE waste_date >= CURRENT_DATE - INTERVAL \'6 days\' GROUP BY waste_date ORDER BY waste_date');
    res.json({ students, menu, attendance, prepared: prepared.total, waste: waste.total, lowStock, wasteByDay, demandForecast });
  } catch (error) { next(error); }
}
export async function report(req, res, next) {
  try {
    const from = req.query.from || new Date().toISOString().slice(0,10);
    const to = req.query.to || from;
    const [attendance] = await pool.execute("SELECT attendance_date, meal_type, COUNT(*) AS marked, COUNT(*) FILTER (WHERE status = 'present') AS present, COUNT(*) FILTER (WHERE status = 'absent') AS absent FROM attendance WHERE attendance_date BETWEEN ? AND ? GROUP BY attendance_date, meal_type ORDER BY attendance_date DESC", [from, to]);
    const [preparation] = await pool.execute('SELECT preparation_date, SUM(quantity_prepared) AS quantity_prepared FROM food_preparation WHERE preparation_date BETWEEN ? AND ? GROUP BY preparation_date ORDER BY preparation_date DESC', [from, to]);
    const [waste] = await pool.execute('SELECT waste_date, SUM(quantity) AS quantity, unit FROM food_waste WHERE waste_date BETWEEN ? AND ? GROUP BY waste_date, unit ORDER BY waste_date DESC', [from, to]);
    const [purchases] = await pool.execute('SELECT purchase_date, SUM(total_amount) AS total_amount FROM purchases WHERE purchase_date BETWEEN ? AND ? GROUP BY purchase_date ORDER BY purchase_date DESC', [from, to]);
    res.json({ range: { from, to }, attendance, preparation, waste, purchases });
  } catch (error) { next(error); }
}
