export const OUTSETA_DOMAIN = 'socialflipio.outseta.com';

interface OutsetaUser {
  id: string;
  email: string;
  name?: string;
}

declare global {
  interface Window {
    Outseta?: any;
    o_options?: {
      domain: string;
      load?: 'immediate' | 'manual';
    };
  }
}

export const outsetaService = {
  initialize() {
    if (!window.o_options) {
      window.o_options = {
        domain: OUTSETA_DOMAIN,
        load: 'immediate'
      };
    }
  },

  async getUser(accessToken: string): Promise<OutsetaUser> {
    try {
      const response = await fetch(`https://${OUTSETA_DOMAIN}/api/v1/profile`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to get Outseta user profile');
      }

      const data = await response.json();
      return {
        id: data.Uid,
        email: data.Email,
        name: data.FullName
      };
    } catch (error) {
      console.error('Error getting Outseta user:', error);
      throw error;
    }
  },

  getAuthWidget() {
    return window.Outseta?.auth;
  },

  getProfileWidget() {
    return window.Outseta?.profile;
  },

  signOut() {
    const logoutLink = document.querySelector('[href*="o-logout-link"]');
    if (logoutLink) {
      (logoutLink as HTMLElement).click();
    }
  }
};