import { Platform } from '@/types/platform';
import { Analytics, PostAnalysis } from '@/types/analysis';

const generatePosts = (platformId: Platform['id'], count: number): PostAnalysis[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${platformId}-${i}`,
    platform: platformId,
    content: `Sample content for ${platformId} post ${i + 1}`,
    published_at: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    metrics: {
      likes: Math.floor(Math.random() * 1000) + 100,
      comments: Math.floor(Math.random() * 200) + 20,
      shares: Math.floor(Math.random() * 100) + 10,
      engagement_rate: Math.random() * 0.05 + 0.01,
      reach: Math.floor(Math.random() * 5000) + 1000,
      impressions: Math.floor(Math.random() * 10000) + 2000,
    },
    structure: {
      hook: 'Sample hook',
      body: 'Sample body',
      call_to_action: 'Sample CTA',
      hashtags: ['sample', 'hashtags'],
      media_type: 'text',
    },
    category: platformId,
    performance_score: Math.floor(Math.random() * 20) + 80,
    trending_score: Math.random() * 0.3 + 0.7,
  }));
};

export const generateMockAnalytics = (platformId: Platform['id']): Analytics => {
  const posts = generatePosts(platformId, 10);
  const totalEngagement = posts.reduce((sum, post) => 
    sum + post.metrics.likes + post.metrics.comments + post.metrics.shares, 0
  );

  return {
    metrics: {
      total_engagement: totalEngagement,
      average_engagement_rate: 0.045,
      best_performing_day: 'Wednesday',
      best_performing_time: '10:00 AM',
      top_categories: [platformId],
      growth_rate: 0.23,
    },
    posts,
  };
};