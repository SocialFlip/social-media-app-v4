import React, { useState } from 'react';
import { Tabs } from '@/components/library/Tabs';
import { ContentGrid } from '@/components/library/ContentGrid';
import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal';
import { useContent } from '@/contexts/ContentContext';
import { GeneratedPost } from '@/types/generation';

export const ContentLibrary: React.FC = () => {
  const { savedPosts, deletePost, savePost } = useContent();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [postToDelete, setPostToDelete] = useState<GeneratedPost | null>(null);

  const filteredPosts = selectedPlatform === 'all'
    ? savedPosts
    : savedPosts.filter(post => post.platform === selectedPlatform);

  const handleDeleteConfirm = () => {
    if (postToDelete) {
      deletePost(postToDelete.id);
      setPostToDelete(null);
    }
  };

  const handleUpdatePost = (updatedPost: GeneratedPost) => {
    savePost(updatedPost);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Content Library</h1>
        <p className="text-gray-600 mt-2">Manage your generated content</p>
      </div>

      <Tabs
        selectedPlatform={selectedPlatform}
        onPlatformSelect={setSelectedPlatform}
      />

      <ContentGrid
        posts={filteredPosts}
        onDeletePost={setPostToDelete}
        onUpdatePost={handleUpdatePost}
      />

      <DeleteConfirmationModal
        isOpen={!!postToDelete}
        onClose={() => setPostToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};