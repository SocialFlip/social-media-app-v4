import { supabase } from '@/lib/supabase';
import { Hook, HookRecord } from '@/types/hooks';

export const hooksService = {
  // Keep read functionality
  async getAll(): Promise<Hook[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('hooks')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching hooks:', error);
      throw error;
    }

    return (data || []).map(this.mapToHook);
  },

  // Prevent write operations
  async create(): Promise<Hook> {
    throw new Error('Database changes must be made manually by the administrator.');
  },

  async update(): Promise<Hook> {
    throw new Error('Database changes must be made manually by the administrator.');
  },

  async delete(): Promise<void> {
    throw new Error('Database changes must be made manually by the administrator.');
  },

  mapToHook(record: HookRecord): Hook {
    return {
      id: record.id,
      content: record.content,
      category: record.category,
      source: record.source,
      dateCreated: new Date(record.created_at),
      lastModified: new Date(record.updated_at)
    };
  }
};