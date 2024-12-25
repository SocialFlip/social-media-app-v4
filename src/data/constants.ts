import { PostLength, Category } from '@/types/generation';

export const POST_LENGTHS: PostLength[] = [
  { id: 'short', label: 'Short', wordRange: '50-100 words' },
  { id: 'medium', label: 'Medium', wordRange: '150-200 words' },
  { id: 'long', label: 'Long', wordRange: '250-350 words' },
];

export const CATEGORIES: Category[] = [
  {
    id: 'health',
    label: 'Health',
    description: 'Wellness, lifestyle, and personal development content',
    aspects: [
      'Physical fitness and exercise',
      'Mental health and mindfulness',
      'Nutrition and diet',
      'Work-life balance',
    ],
    structure: {
      hook: 'Engage audience with compelling health transformation or discovery',
      problem: 'Address common health challenges or misconceptions',
      solution: 'Provide actionable wellness strategies and lifestyle improvements',
    },
  },
  {
    id: 'wealth',
    label: 'Wealth',
    description: 'Financial growth, success, and prosperity themes',
    aspects: [
      'Investment strategies',
      'Financial planning',
      'Wealth building',
      'Money management',
    ],
    structure: {
      hook: 'Present intriguing financial insight or opportunity',
      problem: 'Highlight financial challenges or missed opportunities',
      solution: 'Offer practical wealth-building strategies and advice',
    },
  },
  {
    id: 'relationships',
    label: 'Relationships',
    description: 'Interpersonal and professional connection aspects',
    aspects: [
      'Professional networking',
      'Team building',
      'Client relationships',
      'Community engagement',
    ],
    structure: {
      hook: 'Share relatable relationship scenario or insight',
      problem: 'Identify common relationship challenges or barriers',
      solution: 'Provide relationship-building techniques and strategies',
    },
  },
  {
    id: 'business',
    label: 'Business',
    description: 'Entrepreneurship and organizational development',
    aspects: [
      'Business strategy',
      'Leadership development',
      'Operational efficiency',
      'Market growth',
    ],
    structure: {
      hook: 'Present compelling business insight or opportunity',
      problem: 'Address key business challenges or market gaps',
      solution: 'Deliver actionable business strategies and solutions',
    },
  },
];