import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {jwtDecode} from 'jwt-decode';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      setUser(jwtDecode(res.data.token));
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl">Login</h2>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="block border my-2 p-2" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="block border my-2 p-2" />
      <button onClick={handleLogin} className="bg-blue-500 text-white p-2 rounded">Login</button>
    </div>
  );
}

export default Login;