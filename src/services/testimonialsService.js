import { API_CONFIG } from '../config/api.config';
import apiClient from './apiClient';
import { testimonials as mockData } from '../data/travelData';

export const testimonialsService = {
  async getTestimonials() {
    if (API_CONFIG.USE_MOCK) {
      await new Promise(r => setTimeout(r, 150));
      return mockData;
    }
    return apiClient.get(API_CONFIG.ENDPOINTS.TESTIMONIALS.BASE);
  },
};

export default testimonialsService;
