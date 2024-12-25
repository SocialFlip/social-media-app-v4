import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { PostAnalysis } from '@/types/analysis';
import { usePlatform } from '@/contexts/PlatformContext';

interface RevivalModalProps {
  isOpen: boolean;
  onClose: () => void;
  platformId: string;
  onRevive: (selectedPosts: PostAnalysis[]) => void;
}

const PlatformIcon = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

export const RevivalModal: React.FC<RevivalModalProps> = ({
  isOpen,
  onClose,
  platformId,
  onRevive,
}) => {
  const { analytics } = usePlatform();
  const [selectedPosts, setSelectedPosts] = useState<PostAnalysis[]>([]);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  // Get exactly 6 most recent posts for the platform
  const platformPosts = analytics.posts
    .filter(post => post.platform === platformId)
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 6);

  const currentPost = platformPosts[currentPostIndex];
  const Icon = PlatformIcon[platformId as keyof typeof PlatformIcon];

  const handleNextPost = () => {
    if (currentPostIndex < platformPosts.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1);
    }
  };

  const handlePreviousPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1);
    }
  };

  const togglePostSelection = (post: PostAnalysis) => {
    setSelectedPosts(current => {
      const isSelected = current.some(p => p.id === post.id);
      if (isSelected) {
        return current.filter(p => p.id !== post.id);
      }
      if (current.length >= 12) return current;
      return [...current, post];
    });
  };

  const togglePostExpansion = (postId: string) => {
    setExpandedPosts(current => ({
      ...current,
      [postId]: !current[postId],
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3] flex items-center justify-center">
              <Icon className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Select Content to Revive</h2>
              <span className="text-sm text-gray-500">
                Post {currentPostIndex + 1} of 6
              </span>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="mb-4">
                  <span className="text-sm text-gray-500">
                    Posted on {new Date(currentPost.published_at).toLocaleDateString()}
                  </span>
                </div>
                
                <div className={`prose max-w-none text-gray-900 overflow-y-auto ${
                  expandedPosts[currentPost.id] ? '' : 'max-h-48'
                }`}>
                  <p className="whitespace-pre-line">{currentPost.content}</p>
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

                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Likes</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {currentPost.metrics.likes.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Comments</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {currentPost.metrics.comments.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Shares</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {currentPost.metrics.shares.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="ml-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedPosts.some(p => p.id === currentPost.id)}
                    onChange={() => togglePostSelection(currentPost)}
                    className="rounded border-gray-300 text-[#2940D3] focus:ring-[#2940D3]"
                  />
                  <span className="text-sm text-gray-600">Select for revival</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-between items-center shrink-0">
          <div className="flex space-x-4">
            <Button
              variant="secondary"
              onClick={handlePreviousPost}
              disabled={currentPostIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="secondary"
              onClick={handleNextPost}
              disabled={currentPostIndex === platformPosts.length - 1}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <Button
            variant="primary"
            onClick={() => onRevive(selectedPosts)}
            disabled={selectedPosts.length === 0}
          >
            Revive {selectedPosts.length} Posts
          </Button>
        </div>
      </div>
    </div>
  );
};