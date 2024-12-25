import React, { useState } from 'react';
import { Template } from '@/types/templates';
import { Twitter, Linkedin, Instagram, Trash2, Maximize2, Edit2, Copy, Check } from 'lucide-react';
import { TemplateModal } from './TemplateModal';

interface TemplateCardProps {
  template: Template;
  onDelete: (template: Template) => void;
  onUpdate: (template: Template) => void;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onDelete,
  onUpdate,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const PlatformIcon = {
    twitter: Twitter,
    linkedin: Linkedin,
    instagram: Instagram,
  }[template.platform];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(template.structure);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSave = (updatedTemplate: Template) => {
    onUpdate(updatedTemplate);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3] flex items-center justify-center">
                <PlatformIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {template.platform.charAt(0).toUpperCase() + template.platform.slice(1)} Template
                </h3>
                <p className="text-sm text-gray-500">
                  Created {new Date(template.dateCreated).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 text-gray-400 hover:text-[#2940D3] transition-colors"
              >
                <Maximize2 className="h-5 w-5" />
              </button>
              <button
                onClick={() => onDelete(template)}
                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="prose max-w-none text-gray-600">
            <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-4 rounded-lg line-clamp-3">
              {template.structure}
            </pre>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Last modified {new Date(template.lastModified).toLocaleDateString()}
            </span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit2 className="h-5 w-5 text-gray-500" />
              </button>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isCopied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <TemplateModal
        template={template}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </>
  );
};