import React from 'react';
import { Layout, Wand2, Repeat } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-r from-[#00C2CB] to-[#2940D3] rounded-lg flex items-center justify-center mb-6">
            <Layout className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Template Hook Library
          </h3>
          <p className="text-gray-600">
            Access 90+ proven content hook templates or create your own for engaging posts that drive results.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-r from-[#00C2CB] to-[#2940D3] rounded-lg flex items-center justify-center mb-6">
            <Wand2 className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Industry Expert Repurposing
          </h3>
          <p className="text-gray-600">
            Copy and paste content that inspires you and turn it into cross-platform posts in seconds.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-gradient-to-r from-[#00C2CB] to-[#2940D3] rounded-lg flex items-center justify-center mb-6">
            <Repeat className="h-6 w-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Content Revival
          </h3>
          <p className="text-gray-600">
            Old blog content doesn't have to stay old and out of sight. Polish it fast to make it social media ready.
          </p>
        </div>
      </div>
    </div>
  );
};