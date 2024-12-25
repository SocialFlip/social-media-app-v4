export type Platform = 'linkedin' | 'twitter' | 'instagram';

export interface Template {
  id: string;
  platform: Platform;
  structure: string;
  originalContent: string;
  dateCreated: Date;
  lastModified: Date;
}

export interface TemplateAnalysis {
  structure: string;
  analysis: {
    elements: string[];
    patterns: string[];
    keywords: string[];
  }
}

export interface TemplateFilter {
  platform: Platform;
  searchQuery?: string;
}