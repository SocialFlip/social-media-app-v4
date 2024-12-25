import React, { useState, useMemo } from 'react';
import { ContentMetrics } from '@/components/analysis/ContentMetrics';
import { ContentFilters } from '@/components/analysis/ContentFilters';
import { ContentGrid } from '@/components/analysis/ContentGrid';
import { ComparisonFilter } from '@/components/analysis/ComparisonFilter';
import { ComparisonChart } from '@/components/analysis/ComparisonChart';
import { ContentFilter, PostAnalysis } from '@/types/analysis';
import { usePlatform } from '@/contexts/PlatformContext';

export const Analytics: React.FC = () => {
  const [filters, setFilters] = useState<ContentFilter>({});
  const [comparisonMetric, setComparisonMetric] = useState<'engagement' | 'performance' | 'growth'>('engagement');
  const { analytics, isLoading } = usePlatform();

  const filteredPosts = useMemo(() => {
    let filtered = [...analytics.posts];

    // Filter by platform
    if (filters.platform) {
      filtered = filtered.filter(post => post.platform === filters.platform);
    }

    // Filter by date range
    if (filters.dateRange) {
      const days = Number(filters.dateRange);
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);
      filtered = filtered.filter(post => new Date(post.published_at) >= cutoffDate);
    }

    // Filter by performance threshold
    if (filters.performanceThreshold) {
      const threshold = Number(filters.performanceThreshold);
      filtered = filtered.filter(post => post.performance_score >= threshold);
    }

    return filtered;
  }, [analytics.posts, filters]);

  // Update metrics based on filtered posts
  const filteredMetrics = useMemo(() => {
    const totalEngagement = filteredPosts.reduce((sum, post) => 
      sum + post.metrics.likes + post.metrics.comments + post.metrics.shares, 0
    );

    const avgEngagementRate = filteredPosts.reduce((sum, post) => 
      sum + post.metrics.engagement_rate, 0
    ) / (filteredPosts.length || 1);

    return {
      ...analytics.metrics,
      total_engagement: totalEngagement,
      average_engagement_rate: avgEngagementRate,
    };
  }, [filteredPosts, analytics.metrics]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#2940D3]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <p className="text-gray-600 mt-2">Track and analyze your content performance</p>
      </div>

      <ContentMetrics metrics={filteredMetrics} />
      
      <ContentFilters
        filters={filters}
        onFilterChange={setFilters}
      />

      <ComparisonFilter
        value={comparisonMetric}
        onChange={setComparisonMetric}
      />

      <ComparisonChart
        posts={analytics.posts}
        dateRange={filters.dateRange || '365'}
        metric={comparisonMetric}
      />

      <ContentGrid posts={filteredPosts} />
    </div>
  );
};