import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { authService } from '@/services/authService';
import { outsetaService } from '@/services/outsetaService';

export function useAuth() {
  const navigate = useNavigate();
  const { setUser, clearUser } = useAuthStore();

  useEffect(() => {
    const handleOutsetaAuth = async (event: any) => {
      if (event.detail?.accessToken) {
        try {
          const user = await authService.signInWithOutseta(event.detail.accessToken);
          setUser(user);
          navigate('/dashboard');
        } catch (error) {
          console.error('Auth error:', error);
          clearUser();
        }
      }
    };

    window.addEventListener('outseta:auth', handleOutsetaAuth);
    return () => window.removeEventListener('outseta:auth', handleOutsetaAuth);
  }, [navigate, setUser, clearUser]);

  return {
    signOut: authService.signOut
  };
}