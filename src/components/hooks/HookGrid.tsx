import React from 'react';
import { Hook } from '@/types/hooks';
import { HookCard } from './HookCard';
import { SocialFlipHookCard } from './SocialFlipHookCard';

interface HookGridProps {
  hooks: Hook[];
  onDeleteHook: (hook: Hook) => void;
  onUpdateHook: (hook: Hook) => void;
  isSocialFlip?: boolean;
}

export const HookGrid: React.FC<HookGridProps> = ({
  hooks,
  onDeleteHook,
  onUpdateHook,
  isSocialFlip = false,
}) => {
  const CardComponent = isSocialFlip ? SocialFlipHookCard : HookCard;

  if (hooks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No hooks found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {hooks.map((hook) => (
        <CardComponent
          key={hook.id}
          hook={hook}
          onDelete={onDeleteHook}
          onUpdate={onUpdateHook}
        />
      ))}
    </div>
  );
};