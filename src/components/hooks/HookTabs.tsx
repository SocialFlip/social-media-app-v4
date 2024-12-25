import React from 'react';
import { 
  Brain, 
  Lightbulb, 
  BookOpen, 
  BarChart2, 
  Blocks, 
  GraduationCap, 
  AlertTriangle, 
  ListChecks,
  AlertOctagon,
  Crown,
  HelpCircle
} from 'lucide-react';
import { HookCategory } from '@/types/hooks';
import { cn } from '@/lib/utils';

interface HookTabsProps {
  selectedCategory: HookCategory | 'all';
  onCategorySelect: (category: HookCategory | 'all') => void;
  hookCounts: Record<HookCategory | 'all', number>;
}

export const HookTabs: React.FC<HookTabsProps> = ({
  selectedCategory,
  onCategorySelect,
  hookCounts,
}) => {
  const categories = [
    { id: 'all', label: 'All Hooks', icon: Brain },
    { id: 'curiosity', label: 'Curiosity', icon: Lightbulb },
    { id: 'problem-solution', label: 'Problem-Solution', icon: Blocks },
    { id: 'story', label: 'Story', icon: BookOpen },
    { id: 'statistic', label: 'Statistics', icon: BarChart2 },
    { id: 'questions', label: 'Questions', icon: HelpCircle },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'myths', label: 'Myths', icon: AlertTriangle },
    { id: 'step-by-step', label: 'Step-by-step', icon: ListChecks },
    { id: 'common-mistakes', label: 'Common Mistakes', icon: AlertOctagon },
    { id: 'authority', label: 'Authority', icon: Crown },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex flex-wrap gap-8 pb-2">
        {categories.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onCategorySelect(id as HookCategory | 'all')}
            className={cn(
              "py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors flex items-center space-x-2",
              selectedCategory === id
                ? "border-[#2940D3] text-[#2940D3]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{label}</span>
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">
              {hookCounts[id] || 0}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};