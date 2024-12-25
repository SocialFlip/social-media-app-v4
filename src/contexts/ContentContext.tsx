import React, { createContext, useContext, useState, useEffect } from 'react';
import { Post } from '@/types/content';
import { GeneratedPost } from '@/types/generation';
import { PostAnalysis } from '@/types/analysis';
import { contentService } from '@/services/contentService';
import { useAuthStore } from '@/stores/authStore';

interface ContentContextType {
  selectedPosts: Post[];
  revivalPosts: PostAnalysis[];
  savedPosts: GeneratedPost[];
  setSelectedPosts: (posts: Post[]) => void;
  setRevivalPosts: (posts: PostAnalysis[]) => void;
  clearSelectedPosts: () => void;
  clearRevivalPosts: () => void;
  savePost: (post: GeneratedPost) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
}

const ContentContext = createContext<ContentContextType | null>(null);

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuthStore();
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);
  const [revivalPosts, setRevivalPosts] = useState<PostAnalysis[]>([]);
  const [savedPosts, setSavedPosts] = useState<GeneratedPost[]>([]);

  // Load saved posts when user is authenticated
  useEffect(() => {
    if (user) {
      loadSavedPosts();
    }
  }, [user]);

  const loadSavedPosts = async () => {
    try {
      const posts = await contentService.getAll();
      setSavedPosts(posts);
    } catch (error) {
      console.error('Error loading saved posts:', error);
    }
  };

  const clearSelectedPosts = () => {
    setSelectedPosts([]);
  };

  const clearRevivalPosts = () => {
    setRevivalPosts([]);
  };

  const savePost = async (post: GeneratedPost) => {
    try {
      const existingPost = savedPosts.find(p => p.id === post.id);
      
      if (existingPost) {
        const updatedPost = await contentService.update(post);
        setSavedPosts(current =>
          current.map(p => p.id === updatedPost.id ? updatedPost : p)
        );
      } else {
        const newPost = await contentService.create(post);
        setSavedPosts(current => [newPost, ...current]);
      }
    } catch (error) {
      console.error('Error saving post:', error);
      throw error;
    }
  };

  const deletePost = async (postId: string) => {
    try {
      await contentService.delete(postId);
      setSavedPosts(current => current.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        selectedPosts,
        revivalPosts,
        savedPosts,
        setSelectedPosts,
        setRevivalPosts,
        clearSelectedPosts,
        clearRevivalPosts,
        savePost,
        deletePost,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};