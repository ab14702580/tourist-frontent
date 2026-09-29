import { API_CONFIG } from '../config/api.config';
import apiClient from './apiClient';
import { blogPosts } from '../data/travelData';

export const blogService = {
  /**
   * Fetch all blog articles
   */
  async getArticles(params = {}) {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      return blogPosts;
    }

    return apiClient.get(API_CONFIG.ENDPOINTS.BLOG.ARTICLES, params);
  },

  /**
   * Get single blog article by ID
   */
  async getArticleById(id) {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 150));
      const found = blogPosts.find((p) => String(p.id) === String(id));
      if (!found) {
        throw new Error('Article not found');
      }
      return found;
    }

    return apiClient.get(API_CONFIG.ENDPOINTS.BLOG.BY_ID(id));
  },
};

export default blogService;
