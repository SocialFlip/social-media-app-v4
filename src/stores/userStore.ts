import { create } from 'zustand';
import { UserPlan } from '@/types/user';
import { userService } from '@/services/userService';

interface UserState {
  plan: UserPlan | null;
  loading: boolean;
  error: string | null;
  fetchPlan: () => Promise<void>;
  updateTokens: (tokensUsed: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  plan: null,
  loading: false,
  error: null,
  fetchPlan: async () => {
    set({ loading: true, error: null });
    try {
      const plan = await userService.getUserPlan();
      set({ plan, loading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch user plan',
        loading: false 
      });
    }
  },
  updateTokens: async (tokensUsed: number) => {
    try {
      await userService.updateTokenUsage(tokensUsed);
      set((state) => ({
        plan: state.plan ? { ...state.plan, tokensUsed } : null
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update tokens'
      });
    }
  }
}));