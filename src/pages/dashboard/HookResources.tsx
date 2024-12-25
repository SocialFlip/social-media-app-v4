import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HookCategory, Hook } from '@/types/hooks';
import { HookTabs } from '@/components/hooks/HookTabs';
import { HookGrid } from '@/components/hooks/HookGrid';
import { AdminHookGenerator } from '@/components/hooks/AdminHookGenerator';
import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';
import { useHooks } from '@/contexts/HookContext';
import { useAuthStore } from '@/stores/authStore';

export const HookResources = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { globalHooks, getGlobalHooksByCategory, deleteGlobalHook, updateGlobalHook } = useHooks();
  const [selectedCategory, setSelectedCategory] = useState<HookCategory | 'all'>('all');
  const [isCreating, setIsCreating] = useState(false);
  const [hookToDelete, setHookToDelete] = useState<Hook | null>(null);

  const isAdmin = user?.email === 'copywritingobsession@gmail.com';

  const hookCounts = {
    all: globalHooks.length,
    curiosity: globalHooks.filter(h => h.category === 'curiosity').length,
    'problem-solution': globalHooks.filter(h => h.category === 'problem-solution').length,
    story: globalHooks.filter(h => h.category === 'story').length,
    statistic: globalHooks.filter(h => h.category === 'statistic').length,
    questions: globalHooks.filter(h => h.category === 'questions').length,
    education: globalHooks.filter(h => h.category === 'education').length,
    myths: globalHooks.filter(h => h.category === 'myths').length,
    'step-by-step': globalHooks.filter(h => h.category === 'step-by-step').length,
    'common-mistakes': globalHooks.filter(h => h.category === 'common-mistakes').length,
    authority: globalHooks.filter(h => h.category === 'authority').length,
  };

  const handleCategorySelect = (category: HookCategory | 'all') => {
    setSelectedCategory(category);
    setIsCreating(false);
  };

  const handleDeleteConfirm = async () => {
    if (hookToDelete) {
      try {
        await deleteGlobalHook(hookToDelete.id);
        setHookToDelete(null);
      } catch (error) {
        console.error('Error deleting hook:', error);
      }
    }
  };

  const handleUpdateHook = async (updatedHook: Hook) => {
    try {
      await updateGlobalHook(updatedHook.id, updatedHook);
    } catch (error) {
      console.error('Error updating hook:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              onClick={() => navigate('/dashboard/hooks')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Hooks Library</span>
            </Button>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mt-4">SocialFlip Hooks</h1>
          <p className="text-gray-600 mt-2">Curated collection of high-performing hooks</p>
        </div>
      </div>

      <HookTabs
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
        hookCounts={hookCounts}
      />

      {isAdmin && isCreating ? (
        <AdminHookGenerator
          category={selectedCategory}
          onGenerate={() => setIsCreating(false)}
        />
      ) : isAdmin && (
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-[#00C2CB] to-[#2940D3]"
          >
            Generate Hook
          </Button>
        </div>
      )}

      <HookGrid
        hooks={getGlobalHooksByCategory(selectedCategory)}
        onDeleteHook={isAdmin ? setHookToDelete : undefined}
        onUpdateHook={isAdmin ? handleUpdateHook : undefined}
        isSocialFlip={true}
      />

      <DeleteConfirmationModal
        isOpen={!!hookToDelete}
        onClose={() => setHookToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};