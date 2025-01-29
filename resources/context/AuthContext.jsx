import { createContext, useContext, useState, useEffect } from 'react';

// Buat context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Status login
  const [loading, setLoading] = useState(true); // Status loading

  // Cek token di localStorage saat aplikasi pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token); // True jika ada token
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook untuk menggunakan context
export const useAuth = () => useContext(AuthContext);
