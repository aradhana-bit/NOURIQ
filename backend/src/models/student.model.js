
import { pool } from '../config/db.js';

export async function getAllStudents(search = '') {
  const term = `%${search}%`;
  const [rows] = await pool.execute(
    `SELECT * FROM students
     WHERE student_id LIKE ?
     OR name LIKE ?
     OR email LIKE ?
     OR department LIKE ?
     ORDER BY id DESC`,
    [term, term, term, term]
  );
  return rows;
}

export async function getStudentById(id) {
  const [rows] = await pool.execute(
    'SELECT * FROM students WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0];
}

export async function createStudent(data) {
  const { student_id, name, email, department, phone, status } = data;
  const [result] = await pool.execute(
    `INSERT INTO students
    (student_id, name, email, department, phone, status)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [student_id, name, email || null, department || null, phone || null, status || 'active']
  );
  return result.insertId;
}

export async function updateStudent(id, data) {
  const { student_id, name, email, department, phone, status } = data;
  const [result] = await pool.execute(
    `UPDATE students
     SET student_id = ?, name = ?, email = ?, department = ?, phone = ?, status = ?
     WHERE id = ?`,
    [student_id, name, email || null, department || null, phone || null, status || 'active', id]
  );
  return result.affectedRows;
}

export async function deleteStudent(id) {
  const [result] = await pool.execute(
    'DELETE FROM students WHERE id = ?',
    [id]
  );
  return result.affectedRows;
}
