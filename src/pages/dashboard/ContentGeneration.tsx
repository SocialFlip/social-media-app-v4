import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useContent } from '@/contexts/ContentContext';
import { PlatformButtons } from '@/components/generation/PlatformButtons';
import { GeneratedContentList } from '@/components/generation/GeneratedContentList';
import { ContentEditor } from '@/components/generation/ContentEditor';
import { Platform, GeneratedContent } from '@/types/generation';
import { contentService } from '@/services/contentService';
import { useContentGeneration } from '@/hooks/useContentGeneration';

export const ContentGeneration: React.FC = () => {
  const { savePost } = useContent();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('linkedin');
  const [content, setContent] = useState('');
  const [generatedContents, setGeneratedContents] = useState<GeneratedContent[]>([]);
  const [editingContent, setEditingContent] = useState<GeneratedContent | null>(null);
  
  const { 
    isGenerating, 
    progress, 
    error, 
    generateContent 
  } = useContentGeneration();

  // Load saved content on mount
  useEffect(() => {
    const loadSavedContent = async () => {
      try {
        const savedPosts = await contentService.getAll();
        const contents: GeneratedContent[] = savedPosts.map(post => ({
          id: post.id,
          content: post.content,
          platform: post.platform,
          timestamp: new Date(post.date),
          isExpanded: false
        }));
        setGeneratedContents(contents);
      } catch (error) {
        console.error('Error loading saved content:', error);
      }
    };

    loadSavedContent();
  }, []);

  const handleGenerate = async () => {
    await generateContent(selectedPlatform, content, (newContent) => {
      setGeneratedContents(prev => [newContent, ...prev]);
      setContent('');
    });
  };

  const handleEdit = (id: string) => {
    const content = generatedContents.find(c => c.id === id);
    if (content) {
      setEditingContent(content);
    }
  };

  const handleSaveEdit = async (newContent: string) => {
    if (!editingContent) return;

    try {
      const updatedPost = createGeneratedPost(newContent, editingContent.platform);
      updatedPost.id = editingContent.id;
      await savePost(updatedPost);

      setGeneratedContents(prev =>
        prev.map(c => c.id === editingContent.id
          ? { ...c, content: newContent }
          : c
        )
      );
    } catch (error) {
      console.error('Error saving edit:', error);
    }

    setEditingContent(null);
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

  const handleDelete = async (id: string) => {
    try {
      await contentService.delete(id);
      setGeneratedContents(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const handleToggleExpand = (id: string) => {
    setGeneratedContents(prev =>
      prev.map(c => c.id === id ? { ...c, isExpanded: !c.isExpanded } : c)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Content Generation</h1>
        <p className="text-gray-600 mt-2">Generate AI-powered content for your social media</p>
      </div>

      <PlatformButtons
        selectedPlatform={selectedPlatform}
        onPlatformSelect={setSelectedPlatform}
      />

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste your viral content here..."
          className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
          disabled={isGenerating}
        />

        {error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {isGenerating && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Generating content...</span>
              <span className="text-sm text-gray-600">{progress}%</span>
            </div>
            <ProgressBar progress={progress} />
          </div>
        )}

        <Button
          variant="primary"
          onClick={handleGenerate}
          disabled={!content.trim() || isGenerating}
          className="mt-4"
        >
          Generate Content
        </Button>
      </div>

      <GeneratedContentList
        contents={generatedContents}
        onEdit={handleEdit}
        onCopy={handleCopy}
        onDelete={handleDelete}
        onToggleExpand={handleToggleExpand}
      />

      {editingContent && (
        <ContentEditor
          content={editingContent.content}
          onSave={handleSaveEdit}
          onClose={() => setEditingContent(null)}
        />
      )}
    </div>
  );
};