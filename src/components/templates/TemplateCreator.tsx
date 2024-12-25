import React, { useState } from 'react';
import { Wand2 } from 'lucide-react';
import { Platform } from '@/types/templates';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useTemplates } from '@/contexts/TemplateContext';

interface TemplateCreatorProps {
  platform: Platform;
  onSave: () => void;
}

export const TemplateCreator: React.FC<TemplateCreatorProps> = ({
  platform,
  onSave,
}) => {
  const { analyzeContent, addTemplate } = useTemplates();
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleAnalyze = async () => {
    if (!content.trim()) return;

    setIsAnalyzing(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 1;
      });
    }, 50);

    try {
      const result = await analyzeContent(platform, content);
      
      // Ensure progress reaches 100%
      clearInterval(progressInterval);
      setProgress(100);
      
      const newTemplate = {
        id: `template-${Date.now()}`,
        platform,
        structure: result.structure,
        originalContent: content,
        dateCreated: new Date(),
        lastModified: new Date(),
      };

      // Add a small delay to show 100% completion
      setTimeout(() => {
        addTemplate(newTemplate);
        onSave();
      }, 500);
    } catch (error) {
      console.error('Template analysis error:', error);
    } finally {
      setTimeout(() => {
        setIsAnalyzing(false);
        setProgress(0);
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Template</h3>
        
        <div className="space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Paste your viral content here..."
            className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
          />

          {isAnalyzing ? (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Analyzing template structure...</p>
                <span className="text-sm font-medium text-gray-900">{progress}%</span>
              </div>
              <ProgressBar progress={progress} />
            </div>
          ) : (
            <Button
              variant="primary"
              onClick={handleAnalyze}
              disabled={!content.trim()}
              className="flex items-center space-x-2"
            >
              <Wand2 className="h-4 w-4" />
              <span>Analyze Structure</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};