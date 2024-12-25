import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { REVIVAL_WEBHOOKS } from '@/config/revivalWebhooks';
import { useContent } from '@/contexts/ContentContext';
import { createGeneratedPost } from '@/utils/contentManager';
import { PlatformButtons } from '@/components/generation/PlatformButtons';
import { GeneratedContentList } from '@/components/generation/GeneratedContentList';
import { Platform, GeneratedContent } from '@/types/generation';

export const ContentRevival: React.FC = () => {
  const { savePost } = useContent();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('linkedin');
  const [url, setUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedContents, setGeneratedContents] = useState<GeneratedContent[]>([]);

  const handleGenerate = async () => {
    if (!url.trim()) return;

    setIsGenerating(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => Math.min(prev + 1, 90));
    }, 50);

    try {
      const response = await axios.post(
        REVIVAL_WEBHOOKS[selectedPlatform],
        { url: url.trim() },
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000
        }
      );

      const generatedContent = response.data.content || response.data;
      
      clearInterval(progressInterval);
      setProgress(100);

      const newContent: GeneratedContent = {
        id: Date.now().toString(),
        content: generatedContent,
        platform: selectedPlatform,
        timestamp: new Date(),
        isExpanded: true
      };

      setGeneratedContents(prev => [newContent, ...prev]);

      // Create and save the post to the database
      const generatedPost = createGeneratedPost(generatedContent, selectedPlatform);
      await savePost(generatedPost);

      setTimeout(() => {
        setIsGenerating(false);
        setUrl('');
        setProgress(0);
      }, 500);
    } catch (error) {
      console.error('Content revival error:', error);
      clearInterval(progressInterval);
      setIsGenerating(false);
      setProgress(0);
    }
  };

  const handleCopy = async (id: string) => {
    const content = generatedContents.find(c => c.id === id);
    if (!content) return;

    try {
      await navigator.clipboard.writeText(content.content);
      setGeneratedContents(prev =>
        prev.map(c => c.id === id ? { ...c, isCopied: true } : c)
      );
      setTimeout(() => {
        setGeneratedContents(prev =>
          prev.map(c => c.id === id ? { ...c, isCopied: false } : c)
        );
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleDelete = (id: string) => {
    setGeneratedContents(prev => prev.filter(c => c.id !== id));
  };

  const handleToggleExpand = (id: string) => {
    setGeneratedContents(prev =>
      prev.map(c => c.id === id ? { ...c, isExpanded: !c.isExpanded } : c)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Content Revival</h1>
        <p className="text-gray-600 mt-2">Transform your blog content into engaging social media posts</p>
      </div>

      <PlatformButtons
        selectedPlatform={selectedPlatform}
        onPlatformSelect={setSelectedPlatform}
      />

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter blog post URL..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
          disabled={isGenerating}
        />

        {isGenerating && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Reviving content...</span>
              <span className="text-sm text-gray-600">{progress}%</span>
            </div>
            <ProgressBar progress={progress} />
          </div>
        )}

        <Button
          variant="primary"
          onClick={handleGenerate}
          disabled={!url.trim() || isGenerating}
          className="mt-4"
        >
          Revive Content
        </Button>
      </div>

      <GeneratedContentList
        contents={generatedContents}
        onEdit={() => {}}
        onCopy={handleCopy}
        onDelete={handleDelete}
        onToggleExpand={handleToggleExpand}
      />
    </div>
  );
};