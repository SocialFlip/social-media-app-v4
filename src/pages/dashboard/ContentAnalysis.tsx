import React from 'react';
import { PlatformList } from '@/components/analysis/PlatformList';

export const ContentAnalysis: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Content Analysis</h1>
        <p className="text-gray-600 mt-2">
          Connect your social media accounts to enable content analysis
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Platform Connections</h2>
        <p className="text-gray-600 mb-6">
          Connect your social media accounts to enable content analysis and performance tracking.
        </p>
        <PlatformList />
      </div>
    </div>
  );
};