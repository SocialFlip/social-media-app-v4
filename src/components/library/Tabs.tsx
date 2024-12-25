import React from 'react';
import { Twitter, Linkedin, Instagram, ImagePlus, BookOpen, BookText } from 'lucide-react';
import { cn } from '@/lib/utils';

const platforms = [
  { id: 'all', label: 'All Content', icon: null },
  { id: 'twitter', label: 'Twitter', icon: Twitter },
  { id: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { id: 'instagram', label: 'Instagram', icon: Instagram },
  { id: 'carousel', label: 'Carousel', icon: ImagePlus },
  { id: 'story', label: 'Story', icon: BookOpen },
  { id: 'mini-guide', label: 'Mini-Guide', icon: BookText },
];

interface TabsProps {
  selectedPlatform: string;
  onPlatformSelect: (platform: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({
  selectedPlatform,
  onPlatformSelect,
}) => {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 overflow-x-auto pb-2">
        {platforms.map((platform) => {
          const Icon = platform.icon;
          return (
            <button
              key={platform.id}
              onClick={() => onPlatformSelect(platform.id)}
              className={cn(
                "py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors flex-shrink-0",
                selectedPlatform === platform.id
                  ? "border-[#2940D3] text-[#2940D3]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              )}
            >
              <div className="flex items-center space-x-2">
                {Icon && <Icon className="h-4 w-4" />}
                <span>{platform.label}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};