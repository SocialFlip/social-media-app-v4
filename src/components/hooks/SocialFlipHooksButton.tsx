import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export const SocialFlipHooksButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="primary"
      onClick={() => navigate('/dashboard/hooks/resources')}
      className="bg-gradient-to-r from-[#00C2CB] to-[#2940D3]"
    >
      SocialFlip Hooks
    </Button>
  );
};