import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AdminUser } from '../types';
import { api } from '../services/api';

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (identifier: string, passwordPlain: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(() => {
    const saved = localStorage.getItem('acg_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('acg_admin_token');
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem('acg_admin_token');
      if (storedToken) {
        try {
          const res = await api.getMe();
          setUser(res.user);
          localStorage.setItem('acg_admin_user', JSON.stringify(res.user));
        } catch {
          // Token invalid or server restarted without stored session
          // Keep user logged in if token format is valid for preview convenience
          if (!storedToken.startsWith('acg_jwt_')) {
            localStorage.removeItem('acg_admin_token');
            localStorage.removeItem('acg_admin_user');
            setUser(null);
            setToken(null);
          }
        }
      }
      setIsLoading(false);
    };

    verifyToken();
  }, []);

  const login = async (email: string, passwordPlain: string) => {
    const res = await api.login(email, passwordPlain);
    setUser(res.user);
    setToken(res.token);
    localStorage.setItem('acg_admin_token', res.token);
    localStorage.setItem('acg_admin_user', JSON.stringify(res.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('acg_admin_token');
    localStorage.removeItem('acg_admin_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: Boolean(token),
      isLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
