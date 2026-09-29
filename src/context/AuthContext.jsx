import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Restore session from localStorage on mount
  useEffect(() => {
    try {
      const savedUser  = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');
      if (savedUser)  setUser(JSON.parse(savedUser));
      if (savedToken) setToken(savedToken);
    } catch (err) {
      console.error('Failed to restore auth session:', err);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  }, []);

  // ── helpers ────────────────────────────────────────────────────────────────
  const applyResponse = (res) => {
    setUser(res.user);
    setToken(res.token);
    return res;
  };

  // ── Email / password ───────────────────────────────────────────────────────
  const login = async (credentials) => {
    setError(null);
    try   { return applyResponse(await authService.login(credentials)); }
    catch (err) { setError(err.message || 'Login failed'); throw err; }
  };

  const register = async (userData) => {
    setError(null);
    try   { return applyResponse(await authService.register(userData)); }
    catch (err) { setError(err.message || 'Registration failed'); throw err; }
  };

  // ── Google OAuth ───────────────────────────────────────────────────────────
  const loginWithGoogle = async (credential) => {
    setError(null);
    try   { return applyResponse(await authService.loginWithGoogle(credential)); }
    catch (err) { setError(err.message || 'Google login failed'); throw err; }
  };

  // ── Facebook OAuth ─────────────────────────────────────────────────────────
  const loginWithFacebook = async (accessToken, userId) => {
    setError(null);
    try   { return applyResponse(await authService.loginWithFacebook(accessToken, userId)); }
    catch (err) { setError(err.message || 'Facebook login failed'); throw err; }
  };

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = async () => {
    try   { await authService.logout(); }
    finally { setUser(null); setToken(null); }
  };

  // ── Update user in state + localStorage (used after profile edit) ──────────
  const updateUser = (updatedFields) => {
    setUser(prev => {
      const merged = { ...prev, ...updatedFields };
      localStorage.setItem('user', JSON.stringify(merged));
      return merged;
    });
  };

  const value = {
    user,
    token,
    loading,
    error,
    login,
    register,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    updateUser,
    isAuthenticated: Boolean(user || token),
    isAdmin: user?.role === 'admin',
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export default AuthContext;
