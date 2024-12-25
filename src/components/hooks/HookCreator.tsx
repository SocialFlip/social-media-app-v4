import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { HookCategory } from '@/types/hooks';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useHooks } from '@/contexts/HookContext';

interface HookCreatorProps {
  category: HookCategory | 'all';
  onSave: () => void;
}

export const HookCreator: React.FC<HookCreatorProps> = ({ category, onSave }) => {
  const { addHook } = useHooks();
  const [content, setContent] = useState('');
  const [source, setSource] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!content.trim() || category === 'all') return;

    setIsAnalyzing(true);
    setError(null);
    setProgress(0);

    try {
      // Create the hook directly without analysis
      await addHook({
        content: content.trim(),
        category: category as HookCategory,
        source: source.trim()
      });
      
      setProgress(100);
      
      setTimeout(() => {
        setContent('');
        setSource('');
        setIsAnalyzing(false);
        setProgress(0);
        onSave();
      }, 500);
    } catch (error) {
      console.error('Hook creation error:', error);
      setError('Failed to create hook. Please try again.');
      setIsAnalyzing(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Hook</h3>
        
        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your hook content here..."
            className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
          />

          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="Source (optional)"
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
          />

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {isAnalyzing ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Creating hook...</p>
                <span className="text-sm font-medium text-gray-900">{progress}%</span>
              </div>
              <ProgressBar progress={progress} />
            </div>
          ) : (
            <Button
              variant="primary"
              onClick={handleAnalyze}
              disabled={!content.trim() || category === 'all'}
              className="flex items-center space-x-2"
            >
              <Wand2 className="h-4 w-4" />
              <span>Create Hook</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};