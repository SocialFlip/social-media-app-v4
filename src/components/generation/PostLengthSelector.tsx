import React from 'react';
import { PostLength, SelectedPost } from '@/types/generation';
import { POST_LENGTHS } from '@/data/constants';

interface PostLengthSelectorProps {
  post: SelectedPost;
  onLengthSelect: (postId: string, length: PostLength['id']) => void;
}

export const PostLengthSelector: React.FC<PostLengthSelectorProps> = ({
  post,
  onLengthSelect,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">{post.author}</h3>
        <select
          value={post.selectedLength || ''}
          onChange={(e) => onLengthSelect(post.id, e.target.value as PostLength['id'])}
          className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
        >
          <option value="">Select length</option>
          {POST_LENGTHS.map((length) => (
            <option key={length.id} value={length.id}>
              {length.label} ({length.wordRange})
            </option>
          ))}
        </select>
      </div>
      <p className="text-sm text-gray-600 line-clamp-3">{post.content}</p>
    </div>
  );
};