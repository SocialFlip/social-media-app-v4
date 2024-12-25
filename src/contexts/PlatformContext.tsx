import React, { createContext, useContext, useState } from 'react';
import { Platform } from '@/types/platform';
import { PostAnalysis, PerformanceMetrics } from '@/types/analysis';
import { generateMockAnalytics } from '@/utils/analyticsGenerator';

interface Analytics {
  metrics: PerformanceMetrics;
  posts: PostAnalysis[];
}

interface PlatformContextType {
  platforms: Platform[];
  setPlatforms: (platforms: Platform[] | ((prev: Platform[]) => Platform[])) => void;
  analytics: Analytics;
  isLoading: boolean;
  updateAnalytics: (platformId: Platform['id']) => Promise<void>;
}

const defaultAnalytics: Analytics = {
  metrics: {
    total_engagement: 0,
    average_engagement_rate: 0,
    best_performing_day: '',
    best_performing_time: '',
    top_categories: [],
    growth_rate: 0,
  },
  posts: [],
};

const PlatformContext = createContext<PlatformContextType | null>(null);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [analytics, setAnalytics] = useState<Analytics>(defaultAnalytics);
  const [isLoading, setIsLoading] = useState(false);

  const updateAnalytics = async (platformId: Platform['id']) => {
    setIsLoading(true);
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate mock analytics data
      const newAnalytics = generateMockAnalytics(platformId);
      
      setAnalytics(current => ({
        metrics: {
          total_engagement: current.metrics.total_engagement + newAnalytics.metrics.total_engagement,
          average_engagement_rate: 0.045,
          best_performing_day: 'Wednesday',
          best_performing_time: '10:00 AM',
          top_categories: [platformId],
          growth_rate: 0.23,
        },
        posts: [...current.posts, ...newAnalytics.posts],
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PlatformContext.Provider
      value={{
        platforms,
        setPlatforms,
        analytics,
        isLoading,
        updateAnalytics,
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};