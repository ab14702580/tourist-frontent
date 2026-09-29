import { API_CONFIG } from '../config/api.config';
import apiClient from './apiClient';

export const contactService = {
  /**
   * Submit inquiry message from contact form
   */
  async sendMessage(formData) {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      return { success: true, message: 'Message sent successfully.' };
    }

    return apiClient.post(API_CONFIG.ENDPOINTS.CONTACT.SUBMIT, formData);
  },

  /**
   * Subscribe email address to newsletter
   */
  async subscribeNewsletter(email) {
    if (API_CONFIG.USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      return { success: true, message: 'Subscribed successfully.' };
    }

    return apiClient.post(API_CONFIG.ENDPOINTS.CONTACT.NEWSLETTER, { email });
  },
};

export default contactService;
