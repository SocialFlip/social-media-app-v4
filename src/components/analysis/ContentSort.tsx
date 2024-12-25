import React from 'react';
import { SortAsc, TrendingUp, Calendar } from 'lucide-react';

interface ContentSortProps {
  value: 'engagement' | 'performance' | 'date';
  onChange: (value: 'engagement' | 'performance' | 'date') => void;
}

export const ContentSort: React.FC<ContentSortProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">Sort by:</span>
      <div className="flex space-x-2">
        <button
          onClick={() => onChange('engagement')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            value === 'engagement'
              ? 'bg-[#2940D3] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <SortAsc className="h-4 w-4" />
          <span>Engagement</span>
        </button>
        <button
          onClick={() => onChange('performance')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            value === 'performance'
              ? 'bg-[#2940D3] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <TrendingUp className="h-4 w-4" />
          <span>Performance</span>
        </button>
        <button
          onClick={() => onChange('date')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            value === 'date'
              ? 'bg-[#2940D3] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Calendar className="h-4 w-4" />
          <span>Date</span>
        </button>
      </div>
    </div>
  );
};