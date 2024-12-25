import { SocialPlatform } from './platform';

export interface BasePostMetrics {
  likes: number;
  comments: number;
  shares: number;
  engagement_rate: number;
  reach: number;
  impressions: number;
}

export interface ContentStructure {
  hook: string;
  body: string;
  call_to_action: string;
  hashtags: string[];
  media_type: 'image' | 'video' | 'text' | 'link';
}

export interface PostAnalysis {
  id: string;
  platform: SocialPlatform;
  content: string;
  published_at: string;
  metrics: BasePostMetrics;
  structure: ContentStructure;
  category?: string;
  performance_score: number;
  trending_score: number;
}

export interface PerformanceMetrics {
  total_engagement: number;
  average_engagement_rate: number;
  best_performing_day: string;
  best_performing_time: string;
  top_categories: string[];
  growth_rate: number;
}

export interface ContentFilter {
  platform?: string;
  dateRange?: string;
  category?: string;
  performanceThreshold?: number;
}