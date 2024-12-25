import React, { useState } from 'react';
import { PostCard } from './PostCard';
import { ContentSort } from './ContentSort';
import { PostAnalysis } from '@/types/analysis';
import { useVirtualization } from '@/hooks/useVirtualization';

interface ContentGridProps {
  posts: PostAnalysis[];
}

export const ContentGrid: React.FC<ContentGridProps> = ({ posts }) => {
  const [sortBy, setSortBy] = useState<'engagement' | 'performance' | 'date'>('date');
  const virtualizedPosts = useVirtualization(posts, 10);

  return (
    <div className="space-y-4">
      <ContentSort value={sortBy} onChange={setSortBy} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="grid">
        {virtualizedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};