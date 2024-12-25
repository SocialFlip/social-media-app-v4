import { supabase } from '@/lib/supabase';
import { GeneratedPost } from '@/types/generation';

export interface SavedContentRecord {
  id: string;
  user_id: string;
  content: string;
  platform: string;
  category?: string;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
  };
  created_at: string;
  updated_at: string;
}

export const contentService = {
  async getAll(): Promise<GeneratedPost[]> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('saved_content')
      .select('*')
      .eq('user_id', user.user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching content:', error);
      throw error;
    }

    return (data || []).map(this.mapToGeneratedPost);
  },

  async create(post: GeneratedPost): Promise<GeneratedPost> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('saved_content')
      .insert([{
        user_id: user.user.id,
        content: post.content,
        platform: post.platform,
        category: post.category,
        metrics: {
          likes: post.likes || 0,
          comments: post.comments || 0,
          shares: post.shares || 0
        }
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating content:', error);
      throw error;
    }

    return this.mapToGeneratedPost(data);
  },

  async update(post: GeneratedPost): Promise<GeneratedPost> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('No authenticated user');

    const { data, error } = await supabase
      .from('saved_content')
      .update({
        content: post.content,
        platform: post.platform,
        category: post.category,
        metrics: {
          likes: post.likes || 0,
          comments: post.comments || 0,
          shares: post.shares || 0
        }
      })
      .eq('id', post.id)
      .eq('user_id', user.user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating content:', error);
      throw error;
    }

    return this.mapToGeneratedPost(data);
  },

  async delete(id: string): Promise<void> {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('No authenticated user');

    const { error } = await supabase
      .from('saved_content')
      .delete()
      .eq('id', id)
      .eq('user_id', user.user.id);

    if (error) {
      console.error('Error deleting content:', error);
      throw error;
    }
  },

  mapToGeneratedPost(record: SavedContentRecord): GeneratedPost {
    return {
      id: record.id,
      content: record.content,
      platform: record.platform,
      category: record.category || undefined,
      likes: record.metrics.likes,
      comments: record.metrics.comments,
      shares: record.metrics.shares,
      date: record.created_at,
    };
  }
};