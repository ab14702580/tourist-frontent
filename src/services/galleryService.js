import { API_CONFIG } from '../config/api.config';
import apiClient from './apiClient';
import { galleryPhotos as mockData } from '../data/travelData';

export const galleryService = {
  async getGallery() {
    if (API_CONFIG.USE_MOCK) {
      await new Promise(r => setTimeout(r, 150));
      return mockData;
    }
    return apiClient.get(API_CONFIG.ENDPOINTS.GALLERY.BASE);
  },
};

export default galleryService;
