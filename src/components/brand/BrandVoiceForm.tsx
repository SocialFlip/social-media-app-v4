import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useBrandVoice } from '@/contexts/BrandVoiceContext';

export const BrandVoiceForm: React.FC = () => {
  const { brandVoice, setBrandVoice, setIsAnalyzed } = useBrandVoice();
  const [formData, setFormData] = useState({
    problem: '',
    solution: '',
    results: '',
    impact: '',
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  // Load existing data if available
  useEffect(() => {
    if (brandVoice) {
      setFormData({
        problem: brandVoice.problem,
        solution: brandVoice.solution,
        results: brandVoice.results,
        impact: brandVoice.impact,
      });
    }
  }, [brandVoice]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    // Simulate analysis progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Mock analysis result
    const analyzedStatement = `Your brand voice emphasizes empowering ${formData.problem.toLowerCase()} through ${formData.solution.toLowerCase()}, delivering ${formData.results.toLowerCase()} while ensuring ${formData.impact.toLowerCase()}.`;

    setBrandVoice({
      ...formData,
      analyzedStatement,
    });
    setIsAnalyzing(false);
    setIsAnalyzed(true);
    setIsExpanded(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 border-b border-gray-200"
        >
          <span className="font-medium text-gray-900">Brand Voice Questions</span>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>

        <div className={`space-y-6 transition-all duration-300 ease-in-out ${
          isExpanded ? 'p-6' : 'h-0 p-0 overflow-hidden'
        }`}>
          <div className="space-y-6">
            <div>
              <label className="block mb-2">
                <span className="text-gray-700 font-medium">What problem do you solve for your audience?</span>
                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-[#2940D3] focus:ring focus:ring-[#2940D3] focus:ring-opacity-50"
                  rows={3}
                  required
                />
              </label>
            </div>

            <div>
              <label className="block mb-2">
                <span className="text-gray-700 font-medium">How do you solve this problem?</span>
                <textarea
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-[#2940D3] focus:ring focus:ring-[#2940D3] focus:ring-opacity-50"
                  rows={3}
                  required
                />
              </label>
            </div>

            <div>
              <label className="block mb-2">
                <span className="text-gray-700 font-medium">What results do your customers typically achieve?</span>
                <textarea
                  name="results"
                  value={formData.results}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-[#2940D3] focus:ring focus:ring-[#2940D3] focus:ring-opacity-50"
                  rows={3}
                  required
                />
              </label>
            </div>

            <div>
              <label className="block mb-2">
                <span className="text-gray-700 font-medium">What impact do you hope every customer experiences?</span>
                <textarea
                  name="impact"
                  value={formData.impact}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:border-[#2940D3] focus:ring focus:ring-[#2940D3] focus:ring-opacity-50"
                  rows={3}
                  required
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {isAnalyzing ? (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">Analyzing your brand voice...</p>
          <ProgressBar progress={progress} />
        </div>
      ) : (
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            disabled={!Object.values(formData).every(Boolean)}
          >
            {isExpanded ? 'Analyze Brand Voice' : 'Reanalyze Brand Voice'}
          </Button>
        </div>
      )}
    </form>
  );
};