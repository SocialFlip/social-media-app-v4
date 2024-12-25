import React from 'react';
import { Search, Repeat } from 'lucide-react';

interface NextStepsProps {
  onNavigate: (path: string) => void;
}

export const NextSteps: React.FC<NextStepsProps> = ({ onNavigate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <button
        onClick={() => onNavigate('/')}
        className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#2940D3] transition-colors text-left group"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-white">
            <Search className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-[#2940D3] transition-colors">
              Discover Industry Content
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Analyze and repurpose top-performing content from industry leaders
            </p>
          </div>
        </div>
      </button>

      <button
        onClick={() => onNavigate('/revival')}
        className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#2940D3] transition-colors text-left group"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-white">
            <Repeat className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-[#2940D3] transition-colors">
              Revive Your Content
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Enhance your existing content with AI-powered insights
            </p>
          </div>
        </div>
      </button>
    </div>
  );
};