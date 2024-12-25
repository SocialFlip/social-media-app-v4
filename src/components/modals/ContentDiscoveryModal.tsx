import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Minimize2, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Post, IndustryLeaderContent } from '@/types/content';
import { Button } from '@/components/ui/Button';

interface ContentDiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  industryLeaders: IndustryLeaderContent[];
  onRepurpose: (selectedPosts: Post[]) => void;
  selectedPlatform: string;
}

const PlatformIcon = {
  twitter: Twitter,
  linkedin: Linkedin,
  instagram: Instagram,
} as const;

export const ContentDiscoveryModal: React.FC<ContentDiscoveryModalProps> = ({
  isOpen,
  onClose,
  industryLeaders,
  onRepurpose,
  selectedPlatform,
}) => {
  const [currentLeaderIndex, setCurrentLeaderIndex] = useState(0);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [selectedPosts, setSelectedPosts] = useState<Post[]>([]);
  const [expandedPosts, setExpandedPosts] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const currentLeader = industryLeaders[currentLeaderIndex];
  const currentPost = currentLeader.posts[currentPostIndex];
  const Icon = PlatformIcon[selectedPlatform as keyof typeof PlatformIcon];

  const handleNextPost = () => {
    if (currentPostIndex < currentLeader.posts.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1);
    } else if (currentLeaderIndex < industryLeaders.length - 1) {
      setCurrentLeaderIndex(currentLeaderIndex + 1);
      setCurrentPostIndex(0);
    }
  };

  const handlePreviousPost = () => {
    if (currentPostIndex > 0) {
      setCurrentPostIndex(currentPostIndex - 1);
    } else if (currentLeaderIndex > 0) {
      setCurrentLeaderIndex(currentLeaderIndex - 1);
      setCurrentPostIndex(industryLeaders[currentLeaderIndex - 1].posts.length - 1);
    }
  };

  const togglePostSelection = (post: Post) => {
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
        <div className="p-6 border-b flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-4">
            {Icon && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3] flex items-center justify-center">
                <Icon className="h-5 w-5 text-white" />
              </div>
            )}
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{currentLeader.name}</h2>
              <span className="text-sm text-gray-500">
                Post {currentPostIndex + 1} of {currentLeader.posts.length}
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
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="text-sm text-gray-500">
                      Posted on {currentPost.date}
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
                        {currentPost.likes.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Comments</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {currentPost.comments.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Shares</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {currentPost.shares.toLocaleString()}
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
                    <span className="text-sm text-gray-600">Select for repurpose</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-6 border-t flex justify-between items-center shrink-0">
          <div className="flex space-x-4">
            <Button
              variant="secondary"
              onClick={handlePreviousPost}
              disabled={currentLeaderIndex === 0 && currentPostIndex === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="secondary"
              onClick={handleNextPost}
              disabled={
                currentLeaderIndex === industryLeaders.length - 1 &&
                currentPostIndex === currentLeader.posts.length - 1
              }
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>

          <Button
            variant="primary"
            onClick={() => onRepurpose(selectedPosts)}
            disabled={selectedPosts.length === 0}
          >
            Repurpose {selectedPosts.length} Posts
          </Button>
        </div>
      </div>
    </div>
  );
};