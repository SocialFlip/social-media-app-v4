import React from 'react';
import { Coins } from 'lucide-react';
import { UserPlan, PLAN_TOKENS } from '@/types/user';
import { useAuthStore } from '@/stores/authStore';

interface TokenDisplayProps {
  plan: UserPlan;
  isExpanded: boolean;
}

export const TokenDisplay: React.FC<TokenDisplayProps> = ({ plan, isExpanded }) => {
  const { user } = useAuthStore();
  const isAdmin = user?.email === 'copywritingobsession@gmail.com';

  // Don't show token display for admin
  if (isAdmin) {
    return null;
  }

  const remainingTokens = PLAN_TOKENS[plan.type] - plan.tokensUsed;
  const progress = (remainingTokens / PLAN_TOKENS[plan.type]) * 100;

  if (!isExpanded) {
    return (
      <div className="p-4 flex justify-center" title={`${remainingTokens.toLocaleString()} tokens remaining`}>
        <Coins className="h-6 w-6 text-[#2940D3]" />
      </div>
    );
  }

  return (
    <div className="p-4 border-t">
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 flex items-center">
            <Coins className="h-4 w-4 mr-2 text-[#2940D3]" />
            Tokens Remaining
          </span>
          <span className="font-medium text-gray-900">
            {remainingTokens.toLocaleString()}
          </span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#00C2CB] to-[#2940D3] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-gray-500 text-right">
          {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)} Plan
        </div>
      </div>
    </div>
  );
};