import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hook, HookCategory } from '@/types/hooks';
import { hooksService } from '@/services/hooksService';
import { globalHooksService } from '@/services/globalHooksService';
import { useAuthStore } from '@/stores/authStore';

interface HookContextType {
  hooks: Hook[];
  globalHooks: Hook[];
  loading: boolean;
  addHook: (hook: Omit<Hook, 'id' | 'dateCreated' | 'lastModified'>) => Promise<void>;
  deleteHook: (id: string) => Promise<void>;
  updateHook: (id: string, updates: Partial<Hook>) => Promise<void>;
  getHooksByCategory: (category: HookCategory | 'all') => Hook[];
  getGlobalHooksByCategory: (category: HookCategory | 'all') => Hook[];
  addGlobalHook: (hook: Omit<Hook, 'id' | 'dateCreated' | 'lastModified'>) => Promise<void>;
  deleteGlobalHook: (id: string) => Promise<void>;
  updateGlobalHook: (id: string, updates: Partial<Hook>) => Promise<void>;
}

const HookContext = createContext<HookContextType | null>(null);

export const HookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthStore();
  const [hooks, setHooks] = useState<Hook[]>([]);
  const [globalHooks, setGlobalHooks] = useState<Hook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadHooks();
      loadGlobalHooks();
    }
  }, [user]);

  const loadHooks = async () => {
    try {
      const hooks = await hooksService.getAll();
      setHooks(hooks);
    } catch (error) {
      console.error('Error loading hooks:', error);
    }
  };

  const loadGlobalHooks = async () => {
    try {
      const hooks = await globalHooksService.getAll();
      setGlobalHooks(hooks);
    } catch (error) {
      console.error('Error loading global hooks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addHook = async (hook: Omit<Hook, 'id' | 'dateCreated' | 'lastModified'>) => {
    try {
      const newHook = await hooksService.create(hook);
      setHooks(prev => [newHook, ...prev]);
    } catch (error) {
      console.error('Error adding hook:', error);
      throw error;
    }
  };

  const deleteHook = async (id: string) => {
    try {
      await hooksService.delete(id);
      setHooks(prev => prev.filter(hook => hook.id !== id));
    } catch (error) {
      console.error('Error deleting hook:', error);
      throw error;
    }
  };

  const updateHook = async (id: string, updates: Partial<Hook>) => {
    try {
      const hook = hooks.find(h => h.id === id);
      if (!hook) return;

      const updatedHook = await hooksService.update({
        ...hook,
        ...updates
      });

      setHooks(prev =>
        prev.map(h => h.id === id ? updatedHook : h)
      );
    } catch (error) {
      console.error('Error updating hook:', error);
      throw error;
    }
  };

  const addGlobalHook = async (hook: Omit<Hook, 'id' | 'dateCreated' | 'lastModified'>) => {
    try {
      const newHook = await globalHooksService.create(hook);
      setGlobalHooks(prev => [newHook, ...prev]);
    } catch (error) {
      console.error('Error adding global hook:', error);
      throw error;
    }
  };

  const deleteGlobalHook = async (id: string) => {
    try {
      await globalHooksService.delete(id);
      setGlobalHooks(prev => prev.filter(hook => hook.id !== id));
    } catch (error) {
      console.error('Error deleting global hook:', error);
      throw error;
    }
  };

  const updateGlobalHook = async (id: string, updates: Partial<Hook>) => {
    try {
      const hook = globalHooks.find(h => h.id === id);
      if (!hook) return;

      const updatedHook = await globalHooksService.update({
        ...hook,
        ...updates
      });

      setGlobalHooks(prev =>
        prev.map(h => h.id === id ? updatedHook : h)
      );
    } catch (error) {
      console.error('Error updating global hook:', error);
      throw error;
    }
  };

  const getHooksByCategory = (category: HookCategory | 'all') => {
    return category === 'all' ? hooks : hooks.filter(hook => hook.category === category);
  };

  const getGlobalHooksByCategory = (category: HookCategory | 'all') => {
    return category === 'all' ? globalHooks : globalHooks.filter(hook => hook.category === category);
  };

  return (
    <HookContext.Provider value={{
      hooks,
      globalHooks,
      loading,
      addHook,
      deleteHook,
      updateHook,
      getHooksByCategory,
      getGlobalHooksByCategory,
      addGlobalHook,
      deleteGlobalHook,
      updateGlobalHook,
    }}>
      {children}
    </HookContext.Provider>
  );
};

export const useHooks = () => {
  const context = useContext(HookContext);
  if (!context) {
    throw new Error('useHooks must be used within a HookProvider');
  }
  return context;
};