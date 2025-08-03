import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '', role: '' });
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: form.username,
        email: form.email,
        password: form.password,
        role: form.role
      });
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl">Register</h2>
      <input type="text" placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className="block border my-2 p-2" />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="block border my-2 p-2" />
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="block border my-2 p-2" />
      <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="block border my-2 p-2">
        <option>User</option>
        <option>Admin</option>
      </select>
      <button onClick={handleRegister} className="bg-green-500 text-white p-2 rounded">Register</button>
    </div>
  );
}

export default Register;
