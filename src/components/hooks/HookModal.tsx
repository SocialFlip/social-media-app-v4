import React, { useState } from 'react';
import { X, Edit2, Copy, Save, Maximize2, Minimize2, Check } from 'lucide-react';
import { Hook } from '@/types/hooks';
import { Button } from '@/components/ui/Button';

interface HookModalProps {
  hook: Hook;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (hook: Hook) => void;
  isAdmin: boolean;
}

export const HookModal: React.FC<HookModalProps> = ({
  hook,
  isOpen,
  onClose,
  onSave,
  isAdmin,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(hook.content);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hook.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy hook:', error);
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave({
        ...hook,
        content: editedContent,
        lastModified: new Date(),
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white rounded-lg w-full mx-4 flex flex-col transition-all duration-300 ${
        isExpanded ? 'max-w-4xl h-[90vh]' : 'max-w-2xl max-h-[80vh]'
      }`}>
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between shrink-0 bg-white">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Hook Content</h3>
            <p className="text-sm text-gray-500">
              Last modified: {new Date(hook.lastModified).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isExpanded ? (
                <Minimize2 className="h-5 w-5" />
              ) : (
                <Maximize2 className="h-5 w-5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-white">
          {isEditing && isAdmin ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-full min-h-[300px] p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent font-mono text-sm text-gray-900 bg-white"
            />
          ) : (
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg text-gray-900 border border-gray-200">
              {hook.content}
            </pre>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t flex justify-end space-x-4 shrink-0 bg-white">
          {isAdmin && isEditing ? (
            <>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSave}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <>
              {isAdmin && onSave && (
                <Button
                  variant="secondary"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              <Button
                variant="secondary"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4 mr-2" />
                {isCopied ? 'Copied!' : 'Copy'}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};