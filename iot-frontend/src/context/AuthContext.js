import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem('token');
  try {
    if (token && token.split('.').length === 3) {
      setUser(jwtDecode(token));
    } else {
      localStorage.removeItem('token');
    }
  } catch {
    localStorage.removeItem('token');
  }
}, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
