import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Configure axios defaults
  axios.defaults.baseURL = 'http://localhost:8000';
  axios.defaults.headers.common['Accept'] = 'application/json';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.withCredentials = true;

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  const getCsrfToken = async () => {
    try {
      await axios.get('/sanctum/csrf-cookie');
    } catch (error) {
      console.error('CSRF token fetch failed:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/user');
      if (response.data.success) {
        setCurrentUser(response.data.user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Get CSRF token first
      await getCsrfToken();
      
      const response = await axios.post('/api/login', { email, password });
      if (response.data.success) {
        const { user, token } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        setCurrentUser(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (formData) => {
    try {
      // Get CSRF token first
      await getCsrfToken();
      
      const response = await axios.post('/api/register', formData);
      if (response.data.success) {
        const { user, token } = response.data;
        localStorage.setItem('token', token);
        setToken(token);
        setCurrentUser(user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors || {}
      };
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await axios.post('/api/logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      setToken(null);
      setCurrentUser(null);
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};