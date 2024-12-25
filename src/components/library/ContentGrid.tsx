import React from 'react';
import { GeneratedPost } from '@/types/generation';
import { ContentCard } from './ContentCard';

interface ContentGridProps {
  posts: GeneratedPost[];
  onDeletePost: (post: GeneratedPost) => void;
  onUpdatePost: (post: GeneratedPost) => void;
}

export const ContentGrid: React.FC<ContentGridProps> = ({
  posts,
  onDeletePost,
  onUpdatePost,
}) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No content found in your library</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <ContentCard
          key={post.id}
          post={post}
          onDelete={onDeletePost}
          onUpdate={onUpdatePost}
        />
      ))}
    </div>
  );
};