import axios from 'axios';
import { WEBHOOKS } from '@/config/webhooks';
import { Platform } from '@/types/generation';

export const generationService = {
  async generateContent(platform: Platform, content: string) {
    try {
      const response = await axios.post(
        WEBHOOKS[platform],
        { content: content.trim() },
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000 // 30 second timeout
        }
      );

      // Handle different response formats
      if (typeof response.data === 'string') {
        return response.data;
      }
      
      return response.data.content || response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to generate content');
      }
      throw error;
    }
  }
};