import { SocialPlatform } from './platform';

export interface ScheduledPost extends GeneratedPost {
  scheduledDate?: Date;
}

export type WordCountOption = 'short' | 'medium' | 'long';

export interface WordCountRange {
  min: number;
  max: number;
}

export const WORD_COUNT_RANGES: Record<WordCountOption, WordCountRange> = {
  short: { min: 40, max: 90 },
  medium: { min: 125, max: 200 },
  long: { min: 255, max: 400 }
} as const;

export interface GeneratedContent {
  id: string;
  content: string;
  platform: SocialPlatform;
  timestamp: Date;
  isExpanded?: boolean;
  isCopied?: boolean;
}

export interface GeneratedPost {
  id: string;
  originalPostId?: string;
  author?: string;
  content: string;
  category?: string;
  likes?: number;
  comments?: number;
  shares?: number;
  date: string;
  platform: SocialPlatform;
  scheduledDate?: Date;
}

export interface PostLength {
  id: string;
  label: string;
  wordRange: string;
}

export interface SelectedPost {
  id: string;
  author: string;
  content: string;
  selectedLength?: string;
}

export interface Category {
  id: string;
  label: string;
  description: string;
  aspects: string[];
  structure: {
    hook: string;
    problem: string;
    solution: string;
  };
}