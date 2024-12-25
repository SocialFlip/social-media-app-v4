import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GeneratedPost } from '@/types/generation';

interface PostEditorProps {
  post: GeneratedPost;
  onSave: (post: GeneratedPost) => void;
  onCancel: () => void;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  post,
  onSave,
  onCancel,
}) => {
  const [editedContent, setEditedContent] = useState(post.content);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl mx-4">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Edit Post</h3>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
          />
        </div>

        <div className="p-4 border-t flex justify-end space-x-4">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => onSave({ ...post, content: editedContent })}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};