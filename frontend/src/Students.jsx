
import { useEffect, useState } from 'react';
import { Search, Plus, Pencil, Trash2, X, Users, RefreshCw } from 'lucide-react';

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5050/api').replace(/\/$/, '');

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');
  const [token, setToken] = useState(sessionStorage.getItem('canteeniq_token') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ student_id: '', name: '', email: '', department: '', phone: '', status: 'active' });

  async function login(e) {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Login failed');
      sessionStorage.setItem('canteeniq_token', result.accessToken);
      sessionStorage.setItem('canteeniq_user', result.user?.name || result.user?.email || 'Admin');
      setToken(result.accessToken);
    } catch (err) {
      setError(err.message);
    }
  }

  async function loadStudents() {
    if (!token) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API}/students?search=${encodeURIComponent(search)}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to load students');
      setStudents(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) loadStudents();
  }, [token, search]);

  function openAdd() {
    setEditing(null);
    setForm({ student_id: '', name: '', email: '', department: '', phone: '', status: 'active' });
    setFormOpen(true);
  }

  function openEdit(student) {
    setEditing(student.id);
    setForm({
      student_id: student.student_id || '',
      name: student.name || '',
      email: student.email || '',
      department: student.department || '',
      phone: student.phone || '',
      status: student.status || 'active'
    });
    setFormOpen(true);
  }

  async function saveStudent(e) {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`${API}/students${editing ? `/${editing}` : ''}`, {
        method: editing ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to save student');
      setFormOpen(false);
      await loadStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteStudent(id) {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      const response = await fetch(`${API}/students/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Unable to delete student');
      await loadStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  if (!token) {
    return <div className="panel" style={{ padding: 28, maxWidth: 480 }}>
      <h2>Admin Login</h2>
      <p>Sign in to manage student records.</p>
      {error && <p style={{ color: '#c0392b' }}>{error}</p>}
      <form onSubmit={login} style={{ display: 'grid', gap: 14 }}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Admin email" required />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
    </div>;
  }

  return <div style={{ display: 'grid', gap: 20 }}>
    <div className="metrics">
      <div className="metric">
        <div className="metric-top"><span>Total students</span><Users size={17} /></div>
        <strong>{students.length}</strong>
        <div className="metric-foot"><span>Student records</span></div>
      </div>
      <div className="metric">
        <div className="metric-top"><span>Active students</span></div>
        <strong>{students.filter(s => s.status === 'active').length}</strong>
        <div className="metric-foot"><span>Currently active</span></div>
      </div>
      <div className="metric">
        <div className="metric-top"><span>Inactive students</span></div>
        <strong>{students.filter(s => s.status === 'inactive').length}</strong>
        <div className="metric-foot"><span>Currently inactive</span></div>
      </div>
    </div>
    <div className="panel" style={{ padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h2>Student directory</h2>
          <p>Manage registered university students.</p>
        </div>
        <button onClick={openAdd}><Plus size={16} /> Add student</button>
      </div>
      {error && <p style={{ color: '#c0392b', marginBottom: 14 }}>{error}</p>}
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
        <label className="search" style={{ flex: 1, minWidth: 200 }}>
          <Search size={16} />
          <input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} />
        </label>
        <button onClick={loadStudents}><RefreshCw size={16} /> Refresh</button>
      </div>
      {loading ? <p>Loading students...</p> : <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr>{['Student ID', 'Name', 'Email', 'Department', 'Phone', 'Status', 'Actions'].map(item => <th key={item} style={{ padding: 12, borderBottom: '1px solid #e8ece8' }}>{item}</th>)}</tr>
          </thead>
          <tbody>
            {students.map(student => <tr key={student.id}>
              <td style={{ padding: 12 }}>{student.student_id}</td>
              <td style={{ padding: 12 }}>{student.name}</td>
              <td style={{ padding: 12 }}>{student.email || '—'}</td>
              <td style={{ padding: 12 }}>{student.department || '—'}</td>
              <td style={{ padding: 12 }}>{student.phone || '—'}</td>
              <td style={{ padding: 12 }}>{student.status}</td>
              <td style={{ padding: 12, whiteSpace: 'nowrap' }}>
                <button onClick={() => openEdit(student)} title="Edit"><Pencil size={15} /></button>
                <button onClick={() => deleteStudent(student.id)} title="Delete"><Trash2 size={15} /></button>
              </td>
            </tr>)}
            {!students.length && <tr><td colSpan="7" style={{ padding: 20, textAlign: 'center' }}>No students found.</td></tr>}
          </tbody>
        </table>
      </div>}
    </div>
    {formOpen && <div style={{ position: 'fixed', inset: 0, background: '#0008', zIndex: 1000, display: 'grid', placeItems: 'center', padding: 16 }}>
      <form onSubmit={saveStudent} className="panel" style={{ padding: 24, width: 'min(100%, 520px)', display: 'grid', gap: 13, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{editing ? 'Edit student' : 'Add student'}</h2>
          <button type="button" onClick={() => setFormOpen(false)}><X size={18} /></button>
        </div>
        {[
          ['student_id', 'Student ID'],
          ['name', 'Full name'],
          ['email', 'Email address'],
          ['department', 'Department'],
          ['phone', 'Phone number']
        ].map(([key, label]) => <label key={key} style={{ display: 'grid', gap: 6 }}>
          <span>{label}</span>
          <input value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} required={key === 'student_id' || key === 'name'} />
        </label>)}
        <label style={{ display: 'grid', gap: 6 }}>
          <span>Status</span>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <button type="submit">{editing ? 'Save changes' : 'Create student'}</button>
      </form>
    </div>}
  </div>;
}
