import { API_CONFIG } from '../config/api.config';
import apiClient from './apiClient';
import { travelCategories as mockData } from '../data/travelData';

export const categoriesService = {
  async getCategories() {
    if (API_CONFIG.USE_MOCK) {
      await new Promise(r => setTimeout(r, 150));
      return mockData;
    }
    return apiClient.get(API_CONFIG.ENDPOINTS.CATEGORIES.BASE);
  },
};

export default categoriesService;
