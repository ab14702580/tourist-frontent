import { API_CONFIG } from '../config/api.config';
import apiClient from './apiClient';
import { travelPackages } from '../data/travelData';

export const packageService = {
  /**
   * Fetch all travel packages
   */
  async getPackages(params = {}) {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      let results = [...travelPackages];
      if (params.search) {
        const q = params.search.toLowerCase();
        results = results.filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.location.toLowerCase().includes(q)
        );
      }
      return results;
    }

    return apiClient.get(API_CONFIG.ENDPOINTS.PACKAGES.BASE, params);
  },

  /**
   * Get single package details by ID
   */
  async getPackageById(id) {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 150));
      const found = travelPackages.find((p) => String(p.id) === String(id));
      if (!found) {
        throw new Error('Travel package not found');
      }
      return found;
    }

    return apiClient.get(API_CONFIG.ENDPOINTS.PACKAGES.BY_ID(id));
  },
};

export default packageService;
