import React from 'react';
import { Twitter, Linkedin, Instagram, MessageSquare, ImagePlus, BookOpen, BookText } from 'lucide-react';
import { Platform } from '@/types/generation';

interface PlatformButtonsProps {
  selectedPlatform: Platform;
  onPlatformSelect: (platform: Platform) => void;
}

export const PlatformButtons: React.FC<PlatformButtonsProps> = ({
  selectedPlatform,
  onPlatformSelect,
}) => {
  return (
    <div className="flex flex-wrap gap-4">
      <button
        onClick={() => onPlatformSelect('linkedin')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          selectedPlatform === 'linkedin'
            ? 'bg-[#0077B5] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Linkedin className="h-5 w-5" />
        <span>LinkedIn</span>
      </button>
      <button
        onClick={() => onPlatformSelect('twitter')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          selectedPlatform === 'twitter'
            ? 'bg-black text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Twitter className="h-5 w-5" />
        <span>Twitter Post</span>
      </button>
      <button
        onClick={() => onPlatformSelect('twitter-thread')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          selectedPlatform === 'twitter-thread'
            ? 'bg-[#374151] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <MessageSquare className="h-5 w-5" />
        <span>Twitter Thread</span>
      </button>
      <button
        onClick={() => onPlatformSelect('instagram')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          selectedPlatform === 'instagram'
            ? 'bg-[#E4405F] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <Instagram className="h-5 w-5" />
        <span>Instagram</span>
      </button>
      <button
        onClick={() => onPlatformSelect('carousel')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          selectedPlatform === 'carousel'
            ? 'bg-[#01BDCB] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <ImagePlus className="h-5 w-5" />
        <span>Carousel</span>
      </button>
      <button
        onClick={() => onPlatformSelect('story')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          selectedPlatform === 'story'
            ? 'bg-[#1384CE] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <BookOpen className="h-5 w-5" />
        <span>Story Breakdown</span>
      </button>
      <button
        onClick={() => onPlatformSelect('mini-guide')}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
          selectedPlatform === 'mini-guide'
            ? 'bg-[#8FAEE8] text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <BookText className="h-5 w-5" />
        <span>Mini-Guide</span>
      </button>
    </div>
  );
};