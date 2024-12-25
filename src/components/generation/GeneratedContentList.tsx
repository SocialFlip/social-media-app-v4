import React from 'react';
import { GeneratedContent } from '@/types/generation';
import { Twitter, Linkedin, Instagram, MessageSquare, ImagePlus, BookOpen, BookText, ChevronUp, ChevronDown, Edit2, Copy, Check, Trash2 } from 'lucide-react';

interface GeneratedContentListProps {
  contents: GeneratedContent[];
  onEdit: (id: string) => void;
  onCopy: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleExpand: (id: string) => void;
}

export const GeneratedContentList: React.FC<GeneratedContentListProps> = ({
  contents,
  onEdit,
  onCopy,
  onDelete,
  onToggleExpand,
}) => {
  const getPlatformIcon = (platform: GeneratedContent['platform']) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="h-5 w-5 text-[#0077B5]" />;
      case 'twitter': return <Twitter className="h-5 w-5 text-black" />;
      case 'twitter-thread': return <MessageSquare className="h-5 w-5 text-[#374151]" />;
      case 'instagram': return <Instagram className="h-5 w-5 text-[#E4405F]" />;
      case 'carousel': return <ImagePlus className="h-5 w-5 text-[#01BDCB]" />;
      case 'story': return <BookOpen className="h-5 w-5 text-[#1384CE]" />;
      case 'mini-guide': return <BookText className="h-5 w-5 text-[#8FAEE8]" />;
    }
  };

  return (
    <div className="space-y-4">
      {contents.map((content) => (
        <div key={content.id} className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {getPlatformIcon(content.platform)}
              <span className="text-sm text-gray-500">
                {new Date(content.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onEdit(content.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit2 className="h-5 w-5 text-gray-500" />
              </button>
              <button
                onClick={() => onCopy(content.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {content.isCopied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-500" />
                )}
              </button>
              <button
                onClick={() => onDelete(content.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Trash2 className="h-5 w-5 text-gray-500" />
              </button>
              <button
                onClick={() => onToggleExpand(content.id)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {content.isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div className={`prose max-w-none ${content.isExpanded ? '' : 'max-h-32 overflow-hidden'}`}>
            <p className="text-gray-900 whitespace-pre-line">{content.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};