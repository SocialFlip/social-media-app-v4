import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { HookCategory } from '@/types/hooks';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useHooks } from '@/contexts/HookContext';

interface AdminHookGeneratorProps {
  category: HookCategory | 'all';
  onGenerate: () => void;
}

export const AdminHookGenerator: React.FC<AdminHookGeneratorProps> = ({
  category,
  onGenerate,
}) => {
  const { addGlobalHook } = useHooks();
  const [content, setContent] = useState('');
  const [source, setSource] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!content.trim() || category === 'all') return;

    setIsGenerating(true);
    setError(null);
    setProgress(0);

    try {
      await addGlobalHook({
        content: content.trim(),
        category: category as HookCategory,
        source: source.trim()
      });
      
      setProgress(100);
      
      setTimeout(() => {
        setContent('');
        setSource('');
        setIsGenerating(false);
        setProgress(0);
        onGenerate();
      }, 500);
    } catch (error) {
      console.error('Hook generation error:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate hook. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Global Hook</h3>
        
        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter hook content..."
            className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
            disabled={isGenerating}
          />

          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source (optional)"
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
            disabled={isGenerating}
          />

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {isGenerating ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Generating hook...</p>
                <span className="text-sm font-medium text-gray-900">{progress}%</span>
              </div>
              <ProgressBar progress={progress} />
            </div>
          ) : (
            <Button
              variant="primary"
              onClick={handleGenerate}
              disabled={!content.trim() || category === 'all'}
              className="flex items-center space-x-2"
            >
              <Wand2 className="h-4 w-4" />
              <span>Generate Hook</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};