import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HookCategory, Hook } from '@/types/hooks';
import { HookTabs } from '@/components/hooks/HookTabs';
import { HookCreator } from '@/components/hooks/HookCreator';
import { HookGrid } from '@/components/hooks/HookGrid';
import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal';
import { Button } from '@/components/ui/Button';
import { useHooks } from '@/contexts/HookContext';

export const Hooks: React.FC = () => {
  const navigate = useNavigate();
  const { hooks, getHooksByCategory, deleteHook, updateHook } = useHooks();
  const [selectedCategory, setSelectedCategory] = useState<HookCategory | 'all'>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [hookToDelete, setHookToDelete] = useState<Hook | null>(null);

  const hookCounts = {
    all: hooks.length,
    curiosity: hooks.filter(h => h.category === 'curiosity').length,
    'problem-solution': hooks.filter(h => h.category === 'problem-solution').length,
    story: hooks.filter(h => h.category === 'story').length,
    statistic: hooks.filter(h => h.category === 'statistic').length,
    questions: hooks.filter(h => h.category === 'questions').length,
    education: hooks.filter(h => h.category === 'education').length,
    myths: hooks.filter(h => h.category === 'myths').length,
    'step-by-step': hooks.filter(h => h.category === 'step-by-step').length,
    'common-mistakes': hooks.filter(h => h.category === 'common-mistakes').length,
    authority: hooks.filter(h => h.category === 'authority').length,
  };

  const handleCategorySelect = (category: HookCategory | 'all') => {
    setSelectedCategory(category);
    setIsCreating(false);
  };

  const handleDeleteConfirm = () => {
    if (hookToDelete) {
      deleteHook(hookToDelete.id);
      setHookToDelete(null);
    }
  };

  const handleUpdateHook = (updatedHook: Hook) => {
    updateHook(updatedHook.id, updatedHook);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Hooks Library</h1>
          <p className="text-gray-600 mt-2">Save and organize your content hooks</p>
        </div>
        <Button
          variant="primary"
          onClick={() => navigate('/dashboard/hooks/resources')}
          className="bg-gradient-to-r from-[#00C2CB] to-[#2940D3]"
        >
          SocialFlip Hooks
        </Button>
      </div>

      <HookTabs
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        hookCounts={hookCounts}
      />

      {isCreating ? (
        <HookCreator
          category={selectedCategory}
          onSave={() => setIsCreating(false)}
        />
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-[#2940D3] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Create Hook
          </button>
        </div>
      )}

      {!isCreating && (
        <HookGrid
          hooks={getHooksByCategory(selectedCategory)}
          onDeleteHook={setHookToDelete}
          onUpdateHook={handleUpdateHook}
        />
      )}

      <DeleteConfirmationModal
        isOpen={!!hookToDelete}
        onClose={() => setHookToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};