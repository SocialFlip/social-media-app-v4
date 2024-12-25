import { supabase } from '@/lib/supabase';
import { outsetaService } from './outsetaService';

export const authService = {
  async signInWithOutseta(accessToken: string) {
    try {
      // First authenticate with Outseta
      const outsetaUser = await outsetaService.getUser(accessToken);
      
      // Then sign in to Supabase using the Outseta email
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: outsetaUser.email,
        password: accessToken // Use Outseta token as password
      });

      if (error) {
        // If user doesn't exist in Supabase, create them
        if (error.message.includes('Invalid login credentials')) {
          const { data: { user: newUser }, error: signUpError } = await supabase.auth.signUp({
            email: outsetaUser.email,
            password: accessToken,
            options: {
              data: {
                username: outsetaUser.name || outsetaUser.email.split('@')[0],
                outseta_id: outsetaUser.id
              }
            }
          });

          if (signUpError) throw signUpError;
          return newUser;
        }
        throw error;
      }

      return user;
    } catch (error) {
      console.error('Error signing in with Outseta:', error);
      throw error;
    }
  },

  async signOut() {
    try {
      await Promise.all([
        supabase.auth.signOut(),
        outsetaService.signOut()
      ]);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
};