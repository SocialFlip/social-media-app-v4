import { supabase } from '@/lib/supabase';
import { UserPlan, PLAN_TOKENS } from '@/types/user';

export const userService = {
  async getUserPlan(): Promise<UserPlan | null> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) return null;

    const { data, error } = await supabase
      .from('user_plans')
      .select('*')
      .eq('user_id', user.user.id)
      .single();

    if (error) {
      console.error('Error fetching user plan:', error);
      return null;
    }

    return {
      type: data.plan_type,
      totalTokens: PLAN_TOKENS[data.plan_type],
      tokensUsed: data.tokens_used
    };
  },

  async updateTokenUsage(tokensUsed: number): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('No authenticated user');

    const { error } = await supabase
      .from('user_plans')
      .update({ tokens_used: tokensUsed })
      .eq('user_id', user.user.id);

    if (error) {
      console.error('Error updating token usage:', error);
      throw error;
    }
  }
};