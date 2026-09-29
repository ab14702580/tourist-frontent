import { API_CONFIG } from '../config/api.config';
import apiClient from './apiClient';

export const bookingService = {
  /**
   * Create a new booking reservation
   */
  async createBooking(bookingData) {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 500));
      const newBooking = {
        id: 'bk_' + Date.now(),
        ...bookingData,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      };
      // Save to local storage for realistic persistence
      const current = JSON.parse(localStorage.getItem('wanderly_bookings') || '[]');
      current.unshift(newBooking);
      localStorage.setItem('wanderly_bookings', JSON.stringify(current));
      return { success: true, booking: newBooking };
    }

    return apiClient.post(API_CONFIG.ENDPOINTS.BOOKINGS.BASE, bookingData);
  },

  /**
   * Retrieve current user's bookings
   */
  async getMyBookings() {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      return JSON.parse(localStorage.getItem('wanderly_bookings') || '[]');
    }

    return apiClient.get(API_CONFIG.ENDPOINTS.BOOKINGS.MY_BOOKINGS);
  },

  /**
   * Retrieve single booking by ID
   */
  async getBookingById(id) {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 150));
      const list = JSON.parse(localStorage.getItem('wanderly_bookings') || '[]');
      const found = list.find((b) => b.id === id);
      if (!found) throw new Error('Booking not found');
      return found;
    }

    return apiClient.get(API_CONFIG.ENDPOINTS.BOOKINGS.BY_ID(id));
  },
};

export default bookingService;
