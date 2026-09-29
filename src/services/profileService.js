import apiClient from './apiClient';

export const profileService = {
  /** GET /api/auth/me — fetch fresh user data from DB */
  async getProfile() {
    return apiClient.get('/auth/me');
  },

  /**
   * PATCH /api/auth/profile — update name, phone, avatar URL
   * @param {{ name?: string, phone?: string, avatar?: string }} data
   */
  async updateProfile(data) {
    return apiClient.patch('/auth/profile', data);
  },
};

export default profileService;
