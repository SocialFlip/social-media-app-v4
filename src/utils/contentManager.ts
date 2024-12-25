import { GeneratedPost } from '@/types/generation';

export const createGeneratedPost = (
  content: string,
  platform: string,
  author: string = 'AI Assistant'
): GeneratedPost => {
  return {
    id: `post-${Date.now()}`,
    originalPostId: `original-${Date.now()}`,
    author,
    content,
    category: 'business',
    likes: 0,
    comments: 0,
    shares: 0,
    date: new Date().toISOString(),
    platform,
  };
};