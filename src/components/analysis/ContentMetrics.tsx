import React from 'react';
import { BarChart2, TrendingUp, Users, Share2 } from 'lucide-react';
import { PerformanceMetrics } from '@/types/analysis';

interface ContentMetricsProps {
  metrics: PerformanceMetrics;
}

export const ContentMetrics: React.FC<ContentMetricsProps> = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3]">
            <BarChart2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Engagement</p>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.total_engagement.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3]">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Avg. Engagement Rate</p>
            <p className="text-2xl font-semibold text-gray-900">
              {(metrics.average_engagement_rate * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3]">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Growth Rate</p>
            <p className="text-2xl font-semibold text-gray-900">
              {(metrics.growth_rate * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3]">
            <Share2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Best Time to Post</p>
            <p className="text-2xl font-semibold text-gray-900">
              {metrics.best_performing_time}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};