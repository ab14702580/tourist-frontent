import { API_CONFIG } from '../config/api.config';
import apiClient from './apiClient';

const saveSession = (token, user) => {
  if (token) apiClient.setToken(token);
  if (user) localStorage.setItem('user', JSON.stringify(user));
};

const clearSession = () => {
  apiClient.setToken(null);
  localStorage.removeItem('user');
};

export const authService = {
  /** Email / password login */
  async login(credentials) {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, credentials);
    saveSession(response.token, response.user);
    return response;
  },

  /** Email / password register */
  async register(userData) {
    // normalise fullName → name
    const payload = { ...userData, name: userData.name || userData.fullName };
    delete payload.fullName;
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.REGISTER, payload);
    saveSession(response.token, response.user);
    return response;
  },

  /** Google OAuth — send Google ID token to backend */
  async loginWithGoogle(credential) {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.GOOGLE, { credential });
    saveSession(response.token, response.user);
    return response;
  },

  /** Facebook OAuth — send FB access token + userId to backend */
  async loginWithFacebook(accessToken, userId) {
    const response = await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.FACEBOOK, {
      accessToken,
      userId,
    });
    saveSession(response.token, response.user);
    return response;
  },

  /** Logout — clear local session */
  async logout() {
    try {
      await apiClient.post(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch {
      // backend logout endpoint may not exist — that's fine
    }
    clearSession();
    return true;
  },

  /** Get current user profile */
  async getCurrentUser() {
    const response = await apiClient.get(API_CONFIG.ENDPOINTS.AUTH.ME);
    if (response.user) {
      localStorage.setItem('user', JSON.stringify(response.user));
      return response.user;
    }
    return response;
  },
};

export default authService;
