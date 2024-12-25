import { useState } from 'react';
import { Platform, GeneratedContent } from '@/types/generation';
import { generationService } from '@/services/generationService';
import { contentService } from '@/services/contentService';
import { createGeneratedPost } from '@/utils/contentManager';
import { useAuthStore } from '@/stores/authStore';
import { useUserStore } from '@/stores/userStore';

export const useContentGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuthStore();
  const { plan, updateTokens } = useUserStore();

  const generateContent = async (
    platform: Platform, 
    content: string,
    onSuccess: (newContent: GeneratedContent) => void
  ) => {
    if (!content.trim()) return;

    // Check token limit for non-admin users
    const isAdmin = user?.email === 'copywritingobsession@gmail.com';
    if (!isAdmin && plan) {
      const remainingTokens = plan.totalTokens - plan.tokensUsed;
      if (remainingTokens <= 0) {
        setError('You have reached your token limit. Please upgrade your plan.');
        return;
      }
    }

    setIsGenerating(true);
    setProgress(0);
    setError(null);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 90));
    }, 50);

    try {
      const generatedContent = await generationService.generateContent(platform, content);
      
      clearInterval(progressInterval);
      setProgress(100);

      // Save to database
      const generatedPost = createGeneratedPost(generatedContent, platform);
      const savedPost = await contentService.create(generatedPost);
      
      // Update token usage for non-admin users
      if (!isAdmin && plan) {
        const tokensUsed = Math.min(plan.tokensUsed + 1, plan.totalTokens);
        await updateTokens(tokensUsed);
      }

      // Create content object
      const newContent: GeneratedContent = {
        id: savedPost.id,
        content: generatedContent,
        platform,
        timestamp: new Date(),
        isExpanded: true
      };

      onSuccess(newContent);

      setTimeout(() => {
        setIsGenerating(false);
        setProgress(0);
      }, 500);
    } catch (error) {
      clearInterval(progressInterval);
      setError(error instanceof Error ? error.message : 'Failed to generate content');
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return {
    isGenerating,
    progress,
    error,
    generateContent
  };
};