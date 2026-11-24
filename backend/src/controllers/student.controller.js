
import {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} from '../models/student.model.js';

export async function listStudents(req, res, next) {
  try {
    const students = await getAllStudents(req.query.search || '');
    res.json({ data: students });
  } catch (err) {
    next(err);
  }
}

export async function showStudent(req, res, next) {
  try {
    const student = await getStudentById(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json({ data: student });
  } catch (err) {
    next(err);
  }
}

export async function addStudent(req, res, next) {
  try {
    const { student_id, name, email, department, phone, status } = req.body;
    if (!student_id || !name) {
      return res.status(400).json({ message: 'Student ID and name are required' });
    }
    const id = await createStudent({ student_id, name, email, department, phone, status });
    res.status(201).json({ message: 'Student created successfully', id });
  } catch (err) {
    next(err);
  }
}

export async function editStudent(req, res, next) {
  try {
    const { student_id, name, email, department, phone, status } = req.body;
    if (!student_id || !name) {
      return res.status(400).json({ message: 'Student ID and name are required' });
    }
    const affected = await updateStudent(req.params.id, { student_id, name, email, department, phone, status });
    if (!affected) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student updated successfully' });
  } catch (err) {
    next(err);
  }
}

export async function removeStudent(req, res, next) {
  try {
    const affected = await deleteStudent(req.params.id);
    if (!affected) return res.status(404).json({ message: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    next(err);
  }
}
