import React from 'react';
import { ContentFilter } from '@/types/analysis';

interface ContentFiltersProps {
  filters: ContentFilter;
  onFilterChange: (filters: ContentFilter) => void;
}

export const ContentFilters: React.FC<ContentFiltersProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Platform
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
            value={filters.platform || ''}
            onChange={(e) => onFilterChange({ ...filters, platform: e.target.value })}
          >
            <option value="">All Platforms</option>
            <option value="linkedin">LinkedIn</option>
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date Range
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
            value={filters.dateRange?.toString() || ''}
            onChange={(e) => onFilterChange({ ...filters, dateRange: e.target.value })}
          >
            <option value="">All Time</option>
            <option value="7">Last 7 Days</option>
            <option value="30">Last 30 Days</option>
            <option value="90">Last 3 Months</option>
            <option value="180">Last 6 Months</option>
            <option value="270">Last 9 Months</option>
            <option value="365">Last 12 Months</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Performance
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
            value={filters.performanceThreshold || ''}
            onChange={(e) => onFilterChange({ ...filters, performanceThreshold: Number(e.target.value) })}
          >
            <option value="">All Performance</option>
            <option value="75">Top 25%</option>
            <option value="50">Top 50%</option>
            <option value="25">Top 75%</option>
          </select>
        </div>
      </div>
    </div>
  );
};