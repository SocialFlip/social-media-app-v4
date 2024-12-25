export interface UserPlan {
  type: 'growth' | 'premium' | 'elite';
  totalTokens: number;
  tokensUsed: number;
}

export const PLAN_TOKENS = {
  growth: 35000,
  premium: 55000,
  elite: 90000,
} as const;