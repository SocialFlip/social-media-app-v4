import React from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { Platform } from '@/types/templates';
import { cn } from '@/lib/utils';

interface TemplateTabsProps {
  selectedPlatform: Platform;
  onPlatformSelect: (platform: Platform) => void;
  templateCounts: Record<Platform, number>;
}

export const TemplateTabs: React.FC<TemplateTabsProps> = ({
  selectedPlatform,
  onPlatformSelect,
  templateCounts,
}) => {
  const platforms = [
    { id: 'linkedin' as Platform, label: 'LinkedIn', icon: Linkedin },
    { id: 'twitter' as Platform, label: 'Twitter', icon: Twitter },
    { id: 'instagram' as Platform, label: 'Instagram', icon: Instagram },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {platforms.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onPlatformSelect(id)}
            className={cn(
              "py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors",
              selectedPlatform === id
                ? "border-[#2940D3] text-[#2940D3]"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <div className="flex items-center space-x-2">
              <Icon className="h-4 w-4" />
              <span>{label}</span>
              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-100">
                {templateCounts[id]}/25
              </span>
            </div>
          </button>
        ))}
      </nav>
    </div>
  );
};