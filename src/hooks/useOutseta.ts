import { useEffect } from 'react';
import { outsetaService } from '@/services/outsetaService';

export function useOutseta() {
  useEffect(() => {
    outsetaService.initialize();
  }, []);

  return {
    auth: outsetaService.getAuthWidget(),
    profile: outsetaService.getProfileWidget()
  };
}