export type HookCategory = 'curiosity' | 'problem-solution' | 'story' | 'statistic' | 'questions' | 
  'education' | 'myths' | 'step-by-step' | 'common-mistakes' | 'authority';

export interface Hook {
  id: string;
  content: string;
  category: HookCategory;
  source?: string;
  dateCreated: Date;
  lastModified: Date;
  isGlobal?: boolean;
}

export interface HookRecord {
  id: string;
  user_id?: string;
  content: string;
  category: HookCategory;
  source?: string;
  created_at: string;
  updated_at: string;
}

export interface GlobalHookRecord extends Omit<HookRecord, 'user_id'> {}