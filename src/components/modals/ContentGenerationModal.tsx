import React, { useState, useEffect } from 'react';
import { X, Calendar, Share2, Edit2, Twitter, Linkedin, Instagram, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GeneratedPost } from '@/types/generation';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PostEditor } from '@/components/generation/PostEditor';
import { PostScheduler } from '@/components/generation/PostScheduler';
import { useContent } from '@/contexts/ContentContext';

interface ContentGenerationModalProps {
  isOpen: boolean;
  onClose: () => void;
  generatedPosts: GeneratedPost[];
  onSave: (posts: GeneratedPost[]) => void;
}

const PlatformIcon = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

export const ContentGenerationModal: React.FC<ContentGenerationModalProps> = ({
  isOpen,
  onClose,
  generatedPosts,
  onSave,
}) => {
  const { revivalPosts } = useContent();
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [editingPost, setEditingPost] = useState<GeneratedPost | null>(null);
  const [isScheduling, setIsScheduling] = useState(false);
  const [editedPosts, setEditedPosts] = useState<GeneratedPost[]>([]);
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  const isRevivalMode = revivalPosts.length > 0;

  useEffect(() => {
    if (generatedPosts.length > 0) {
      setEditedPosts(generatedPosts);
    }
  }, [generatedPosts]);

  if (!isOpen || editedPosts.length === 0) return null;

  const currentPost = editedPosts[currentPostIndex];
  const Icon = currentPost.author && PlatformIcon[currentPost.author as keyof typeof PlatformIcon];

  const handleEdit = (post: GeneratedPost) => {
    setEditingPost(post);
  };

  const handleSaveEdit = (updatedPost: GeneratedPost) => {
    setEditedPosts(posts => 
      posts.map(p => p.id === updatedPost.id ? updatedPost : p)
    );
    setEditingPost(null);
  };

  const handleSchedule = () => {
    setIsScheduling(true);
  };

  const togglePostExpansion = (postId: string) => {
    setExpandedPosts(current => ({
      ...current,
      [postId]: !current[postId],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            {Icon && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3] flex items-center justify-center">
                <Icon className="h-5 w-5 text-white" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isRevivalMode ? 'Enhanced Content' : 'Generated Content'}
              </h2>
              <span className="text-sm text-gray-500">
                {isRevivalMode ? 'Enhancement' : 'Post'} {currentPostIndex + 1} of {editedPosts.length}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-8 py-6 overflow-y-auto flex-1">
          <div className="bg-white rounded-lg border p-6">
            <div className="prose max-w-none text-[#111827]">
              <div className={`${expandedPosts[currentPost.id] ? '' : 'max-h-48 overflow-hidden'}`}>
                <div className="whitespace-pre-line">{currentPost.content}</div>
              </div>
              
              <button
                onClick={() => togglePostExpansion(currentPost.id)}
                className="mt-4 text-sm text-[#2940D3] hover:opacity-80 flex items-center space-x-1"
              >
                {expandedPosts[currentPost.id] ? (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    <span>Show less</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    <span>Show more</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-6 flex items-center space-x-4">
              <Button
                variant="secondary"
                onClick={() => handleEdit(currentPost)}
                className="flex items-center"
              >
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="secondary"
                onClick={handleSchedule}
                className="flex items-center"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
              <Button
                variant="secondary"
                className="flex items-center"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Post Now
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 border-t flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2">
            {editedPosts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPostIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentPostIndex === index
                    ? 'bg-[#2940D3]'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          <Button
            variant="primary"
            onClick={() => onSave(editedPosts)}
          >
            Save to Library
          </Button>
        </div>
      </div>

      {/* Edit Modal */}
      {editingPost && (
        <PostEditor
          post={editingPost}
          onSave={handleSaveEdit}
          onCancel={() => setEditingPost(null)}
        />
      )}

      {/* Schedule Modal */}
      {isScheduling && (
        <PostScheduler
          posts={editedPosts}
          onSave={(scheduledPosts) => {
            setEditedPosts(scheduledPosts);
            setIsScheduling(false);
          }}
          onCancel={() => setIsScheduling(false)}
        />
      )}
    </div>
  );
};