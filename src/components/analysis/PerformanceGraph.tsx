import React from 'react';
import { BasePostMetrics } from '@/types/analysis';

interface PerformanceGraphProps {
  data: BasePostMetrics;
}

export const PerformanceGraph: React.FC<PerformanceGraphProps> = ({ data }) => {
  const maxValue = Math.max(data.likes, data.comments, data.shares);
  
  const getHeight = (value: number) => {
    return `${(value / maxValue) * 100}%`;
  };

  return (
    <div className="h-24 flex items-end space-x-2">
      <div className="flex-1 flex flex-col items-center">
        <div 
          className="w-full bg-blue-100 rounded-t"
          style={{ height: getHeight(data.likes) }}
        />
        <span className="text-xs text-gray-500 mt-1">Likes</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div 
          className="w-full bg-purple-100 rounded-t"
          style={{ height: getHeight(data.comments) }}
        />
        <span className="text-xs text-gray-500 mt-1">Comments</span>
      </div>
      <div className="flex-1 flex flex-col items-center">
        <div 
          className="w-full bg-green-100 rounded-t"
          style={{ height: getHeight(data.shares) }}
        />
        <span className="text-xs text-gray-500 mt-1">Shares</span>
      </div>
    </div>
  );
};