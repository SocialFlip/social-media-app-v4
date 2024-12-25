import React, { useState } from 'react';
import { GeneratedPost } from '@/types/generation';
import { Twitter, Linkedin, Instagram, MessageSquare, ImagePlus, BookOpen, BookText, Maximize2, Calendar, Edit2, Copy, Check, Trash2 } from 'lucide-react';
import { ContentModal } from './ContentModal';

interface ContentCardProps {
  post: GeneratedPost;
  onDelete: (post: GeneratedPost) => void;
  onUpdate: (post: GeneratedPost) => void;
}

export const ContentCard: React.FC<ContentCardProps> = ({ post, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const PlatformIcon = {
    linkedin: Linkedin,
    twitter: Twitter,
    'twitter-thread': MessageSquare,
    instagram: Instagram,
    carousel: ImagePlus,
    story: BookOpen,
    'mini-guide': BookText,
  }[post.platform];

  const getPlatformName = (platform: string) => {
    switch (platform) {
      case 'linkedin': return 'LinkedIn';
      case 'twitter': return 'Twitter';
      case 'twitter-thread': return 'Twitter Thread';
      case 'instagram': return 'Instagram';
      case 'carousel': return 'Carousel';
      case 'story': return 'Story';
      case 'mini-guide': return 'Mini-Guide';
      default: return platform;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3] flex items-center justify-center">
                <PlatformIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {getPlatformName(post.platform)}
                </h3>
                <p className="text-sm text-gray-500">
                  Created {new Date(post.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 text-gray-400 hover:text-[#2940D3] transition-colors"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(post)}
                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="prose max-w-none text-gray-600">
            <pre className={`whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg ${!isExpanded && 'line-clamp-3'}`}>
              {post.content}
            </pre>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{getPlatformName(post.platform)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit2 className="h-5 w-5 text-gray-500" />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isCopied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <ContentModal
        post={post}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onUpdate}
      />
    </>
  );
};