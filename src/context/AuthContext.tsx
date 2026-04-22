/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api/auth';

interface AuthContextType {
  token: string | null;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = useCallback(async (username: string, password: string) => {
    const t = await apiLogin(username, password);
    localStorage.setItem('token', t);
    setToken(t);
  }, []);

  const logout = useCallback(async () => {
    if (token) await apiLogout(token);
    localStorage.removeItem('token');
    setToken(null);
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, isAdmin: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}