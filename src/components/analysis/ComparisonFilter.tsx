import React from 'react';
import { BarChart2, TrendingUp, LineChart } from 'lucide-react';

interface ComparisonFilterProps {
  value: 'engagement' | 'performance' | 'growth';
  onChange: (value: 'engagement' | 'performance' | 'growth') => void;
}

export const ComparisonFilter: React.FC<ComparisonFilterProps> = ({
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <span className="text-sm text-gray-600">Compare:</span>
      <div className="flex space-x-2">
        <button
          onClick={() => onChange('engagement')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            value === 'engagement'
              ? 'bg-[#2940D3] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <BarChart2 className="h-4 w-4" />
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
          onClick={() => onChange('growth')}
          className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
            value === 'growth'
              ? 'bg-[#2940D3] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <LineChart className="h-4 w-4" />
          <span>Growth</span>
        </button>
      </div>
    </div>
  );
};