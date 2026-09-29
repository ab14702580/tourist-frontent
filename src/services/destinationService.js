import { API_CONFIG } from '../config/api.config';
import apiClient from './apiClient';
import { destinationItems } from '../data/travelData';

export const destinationService = {
  /**
   * Fetch all destinations with optional filtering
   */
  async getDestinations(params = {}) {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      let results = [...destinationItems];

      if (params.category && params.category !== 'All') {
        results = results.filter(
          (d) => d.category && d.category.toLowerCase() === params.category.toLowerCase()
        );
      }
      if (params.search) {
        const q = params.search.toLowerCase();
        results = results.filter(
          (d) =>
            d.title.toLowerCase().includes(q) ||
            d.country.toLowerCase().includes(q)
        );
      }
      return results;
    }

    return apiClient.get(API_CONFIG.ENDPOINTS.DESTINATIONS.BASE, params);
  },

  /**
   * Get single destination details by ID
   */
  async getDestinationById(id) {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 150));
      const found = destinationItems.find((d) => String(d.id) === String(id));
      if (!found) {
        throw new Error('Destination not found');
      }
      return found;
    }

    return apiClient.get(API_CONFIG.ENDPOINTS.DESTINATIONS.BY_ID(id));
  },

  /**
   * Get featured/trending destinations
   */
  async getFeatured() {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 150));
      return destinationItems.filter((d) => d.badge);
    }

    return apiClient.get(API_CONFIG.ENDPOINTS.DESTINATIONS.FEATURED);
  },
};

export default destinationService;
