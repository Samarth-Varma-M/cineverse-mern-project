import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('cineverse_token') || null);
  const [loading, setLoading] = useState(true);

  // Verify and fetch current user profile on initial load
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/auth/me');
        setUser(data.data);
      } catch (err) {
        console.warn('Session expired or invalid token:', err.message);
        localStorage.removeItem('cineverse_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, [token]);

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    const { token: receivedToken, ...userData } = data.data;
    localStorage.setItem('cineverse_token', receivedToken);
    setToken(receivedToken);
    setUser(userData);
    return data;
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/auth/register', { name, email, password });
    const { token: receivedToken, ...userData } = data.data;
    localStorage.setItem('cineverse_token', receivedToken);
    setToken(receivedToken);
    setUser(userData);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('cineverse_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

