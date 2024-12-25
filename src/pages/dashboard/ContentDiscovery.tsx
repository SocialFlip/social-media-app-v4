import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlatformSelector } from '@/components/dashboard/PlatformSelector';
import { IndustryLeaderInput } from '@/components/dashboard/IndustryLeaderInput';
import { Button } from '@/components/ui/Button';
import { ContentDiscoveryModal } from '@/components/modals/ContentDiscoveryModal';
import { generateMockPosts } from '@/data/mockPosts';
import { Post } from '@/types/content';
import { useContent } from '@/contexts/ContentContext';

export const ContentDiscovery: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedPosts } = useContent();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [industryLeaders, setIndustryLeaders] = useState<string[]>(['']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [discoveredContent, setDiscoveredContent] = useState<ReturnType<typeof generateMockPosts>>([]);

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId === selectedPlatform ? '' : platformId);
  };

  const handleLeaderChange = (index: number, value: string) => {
    setIndustryLeaders((current) => {
      const updated = [...current];
      updated[index] = value;
      return updated;
    });
  };

  const handleLeaderRemove = (index: number) => {
    setIndustryLeaders((current) =>
      current.filter((_, i) => i !== index)
    );
  };

  const handleAddLeader = () => {
    if (industryLeaders.length < 3) {
      setIndustryLeaders((current) => [...current, '']);
    }
  };

  const handleAnalyze = () => {
    const validLeaders = industryLeaders.filter(Boolean);
    if (validLeaders.length > 0) {
      const mockData = generateMockPosts(validLeaders);
      setDiscoveredContent(mockData);
      setIsModalOpen(true);
    }
  };

  const handleRepurpose = (selectedPosts: Post[]) => {
    setSelectedPosts(selectedPosts);
    setIsModalOpen(false);
    navigate('/generation');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Content Discovery</h1>
        <p className="text-gray-600 mt-2">Analyze top-performing content from industry leaders</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Platform Selection */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="font-semibold mb-4">Select Platform</h2>
          <PlatformSelector
            selectedPlatform={selectedPlatform}
            onPlatformSelect={handlePlatformSelect}
          />
        </div>

        {/* Industry Leaders */}
        <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
          <h2 className="font-semibold mb-4">Industry Leaders</h2>
          <IndustryLeaderInput
            leaders={industryLeaders}
            onLeaderChange={handleLeaderChange}
            onLeaderRemove={handleLeaderRemove}
            onAddLeader={handleAddLeader}
          />
        </div>
      </div>

      {/* Analysis Button */}
      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={handleAnalyze}
          disabled={!selectedPlatform || !industryLeaders[0]}
        >
          Discover Content
        </Button>
      </div>

      {/* Content Discovery Modal */}
      <ContentDiscoveryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        industryLeaders={discoveredContent}
        onRepurpose={handleRepurpose}
      />
    </div>
  );
};