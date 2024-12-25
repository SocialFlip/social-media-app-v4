import { supabase } from '@/lib/supabase';
import { Hook, GlobalHookRecord } from '@/types/hooks';

export const globalHooksService = {
  async getAll(): Promise<Hook[]> {
    const { data, error } = await supabase
      .from('global_hooks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching global hooks:', error);
      throw error;
    }

    return (data || []).map(this.mapToHook);
  },

  async create(hook: Omit<Hook, 'id' | 'dateCreated' | 'lastModified'>): Promise<Hook> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user?.email?.includes('copywritingobsession@gmail.com')) {
      throw new Error('Only administrators can create global hooks');
    }

    const { data, error } = await supabase
      .from('global_hooks')
      .insert([{
        content: hook.content,
        category: hook.category,
        source: hook.source
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating global hook:', error);
      throw error;
    }

    return this.mapToHook(data);
  },

  async update(hook: Hook): Promise<Hook> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user?.email?.includes('copywritingobsession@gmail.com')) {
      throw new Error('Only administrators can update global hooks');
    }

    const { data, error } = await supabase
      .from('global_hooks')
      .update({
        content: hook.content,
        category: hook.category,
        source: hook.source
      })
      .eq('id', hook.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating global hook:', error);
      throw error;
    }

    return this.mapToHook(data);
  },

  async delete(id: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user?.email?.includes('copywritingobsession@gmail.com')) {
      throw new Error('Only administrators can delete global hooks');
    }

    const { error } = await supabase
      .from('global_hooks')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting global hook:', error);
      throw error;
    }
  },

  mapToHook(record: GlobalHookRecord): Hook {
    return {
      id: record.id,
      content: record.content,
      category: record.category,
      source: record.source,
      dateCreated: new Date(record.created_at),
      lastModified: new Date(record.updated_at),
      isGlobal: true
    };
  }
};