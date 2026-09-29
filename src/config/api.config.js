/**
 * Application & API Configuration
 * Central configuration for backend REST API endpoints and mock mode.
 */

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  USE_MOCK: import.meta.env.VITE_USE_MOCK_DATA !== 'false',
  TIMEOUT_MS: 15000,
  ENDPOINTS: {
    AUTH: {
      LOGIN: '/auth/login',
      REGISTER: '/auth/register',
      LOGOUT: '/auth/logout',
      ME: '/auth/me',
      REFRESH: '/auth/refresh',
      GOOGLE: '/auth/google',
      FACEBOOK: '/auth/facebook',
    },
    DESTINATIONS: {
      BASE: '/destinations',
      BY_ID: (id) => `/destinations/${id}`,
      FEATURED: '/destinations/featured',
    },
    PACKAGES: {
      BASE: '/packages',
      BY_ID: (id) => `/packages/${id}`,
    },
    BOOKINGS: {
      BASE: '/bookings',
      BY_ID: (id) => `/bookings/${id}`,
      MY_BOOKINGS: '/bookings/my-bookings',
    },
    BLOG: {
      ARTICLES: '/blogs',
      BY_ID: (id) => `/blogs/${id}`,
    },
    TESTIMONIALS: { BASE: '/testimonials' },
    GALLERY: { BASE: '/gallery' },
    CATEGORIES: { BASE: '/categories' },
    CONTACT: {
      SUBMIT: '/contact',
      NEWSLETTER: '/newsletter/subscribe',
    },
  },
};

export default API_CONFIG;
