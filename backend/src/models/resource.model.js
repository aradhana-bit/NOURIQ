import { pool } from '../config/db.js';
const resources = {
  'menu-items': { table: 'menu_item', fields: ['menu_id','item_name','category','price','is_available'], required: ['item_name','price'], search: ['item_name','category'] },
  'menus': { table: 'menus', fields: ['menu_name','meal_type','menu_date','description'], required: ['menu_name','meal_type','menu_date'], search: ['menu_name','meal_type'] },
  'attendance': { table: 'attendance', fields: ['student_id','menu_id','meal_type','attendance_date','status'], required: ['student_id','attendance_date'], search: ['meal_type','status'] },
  'preparation': { table: 'food_preparation', fields: ['menu_item_id','preparation_date','quantity_prepared','quantity_unit','prepared_by'], required: ['preparation_date','quantity_prepared'], search: ['prepared_by','quantity_unit'] },
  'waste': { table: 'food_waste', fields: ['menu_item_id','waste_date','quantity','unit','reason','recorded_by'], required: ['waste_date','quantity'], search: ['reason','recorded_by'] },
  'inventory': { table: 'ingredients', fields: ['ingredient_name','quantity','unit','reorder_level','unit_price'], required: ['ingredient_name','quantity','unit'], search: ['ingredient_name','unit'] },
  'suppliers': { table: 'suppliers', fields: ['supplier_name','contact_person','email','phone','address','status'], required: ['supplier_name'], search: ['supplier_name','contact_person','email','phone'] },
  'purchases': { table: 'purchases', fields: ['ingredient_id','supplier_name','quantity','unit_price','total_amount','purchase_date','status'], required: ['quantity','unit_price','purchase_date'], search: ['supplier_name','status'] }
};
export function getResourceConfig(name) {
  const config = resources[name];
  if (!config) throw Object.assign(new Error('Unsupported resource'), { status: 404 });
  return config;
}
export async function listResource(name, search = '') {
  const config = getResourceConfig(name);
  const values = [];
  let where = '';
  if (search && config.search.length) {
    where = ' WHERE ' + config.search.map(field => `CAST(${field} AS CHAR) LIKE ?`).join(' OR ');
    values.push(...config.search.map(() => `%${search}%`));
  }
  const [rows] = await pool.execute(`SELECT * FROM ${config.table}${where} ORDER BY id DESC LIMIT 500`, values);
  return rows;
}
export async function createResource(name, data) {
  const config = getResourceConfig(name);
  const fields = config.fields.filter(field => data[field] !== undefined);
  if (config.required.some(field => data[field] === undefined || data[field] === null || data[field] === '')) throw Object.assign(new Error('Please complete all required fields'), { status: 400 });
  if (!fields.length) throw Object.assign(new Error('No valid fields supplied'), { status: 400 });
  const values = fields.map(field => data[field] === '' ? null : data[field]);
  if (name === 'purchases') {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();
      const [result] = await connection.execute(`INSERT INTO ${config.table} (${fields.join(',')}) VALUES (${fields.map(() => '?').join(',')})`, values);
      if (data.ingredient_id && (data.status || 'completed') === 'completed') await connection.execute('UPDATE ingredients SET quantity = quantity + ? WHERE id = ?', [Number(data.quantity), data.ingredient_id]);
      await connection.commit();
      return result.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  const [result] = await pool.execute(`INSERT INTO ${config.table} (${fields.join(',')}) VALUES (${fields.map(() => '?').join(',')})`, values);
  return result.insertId;
}
export async function updateResource(name, id, data) {
  const config = getResourceConfig(name);
  const fields = config.fields.filter(field => data[field] !== undefined);
  if (config.required.some(field => data[field] === undefined || data[field] === null || data[field] === '')) throw Object.assign(new Error('Please complete all required fields'), { status: 400 });
  if (!fields.length) throw Object.assign(new Error('No valid fields supplied'), { status: 400 });
  const values = fields.map(field => data[field] === '' ? null : data[field]);
  const [result] = await pool.execute(`UPDATE ${config.table} SET ${fields.map(field => `${field} = ?`).join(', ')} WHERE id = ?`, [...values, id]);
  return result.affectedRows;
}
export async function deleteResource(name, id) {
  const config = getResourceConfig(name);
  const [result] = await pool.execute(`DELETE FROM ${config.table} WHERE id = ?`, [id]);
  return result.affectedRows;
}
