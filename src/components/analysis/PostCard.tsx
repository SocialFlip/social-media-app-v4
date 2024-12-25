import React, { useState } from 'react';
import { BarChart2, MessageCircle, Share2, TrendingUp } from 'lucide-react';
import { PostAnalysis } from '@/types/analysis';
import { PerformanceGraph } from './PerformanceGraph';
import { CategoryBadge } from './CategoryBadge';

interface PostCardProps {
  post: PostAnalysis;
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
      role="gridcell"
      tabIndex={0}
    >
      <div className="p-6 space-y-4">
        {/* Platform & Date */}
        <div className="flex items-center justify-between">
          <CategoryBadge category={post.category || 'uncategorized'} />
          <span className="text-sm text-gray-500">
            {new Date(post.published_at).toLocaleDateString()}
          </span>
        </div>

        {/* Content Preview */}
        <div className="space-y-2">
          <p className={`text-gray-900 ${isExpanded ? '' : 'line-clamp-3'}`}>
            {post.content}
          </p>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm text-[#2940D3] hover:opacity-80"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <BarChart2 className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{post.metrics.likes}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MessageCircle className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{post.metrics.comments}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Share2 className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{post.metrics.shares}</span>
          </div>
        </div>

        {/* Performance Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">Performance Score</span>
          </div>
          <span className="text-sm font-medium text-gray-900">
            {post.performance_score}%
          </span>
        </div>

        {/* Performance Graph */}
        <PerformanceGraph data={post.metrics} />
      </div>
    </div>
  );
};