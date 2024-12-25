import React, { useState } from 'react';
import { Hook } from '@/types/hooks';
import { Brain, Lightbulb, BookOpen, BarChart2, Blocks, GraduationCap, AlertTriangle, ListChecks, AlertOctagon, Crown, HelpCircle, Maximize2, Minimize2, Edit2, Copy, Check, Trash2 } from 'lucide-react';
import { HookModal } from './HookModal';
import { useAuthStore } from '@/stores/authStore';

interface HookCardProps {
  hook: Hook;
  onDelete?: (hook: Hook) => void;
  onUpdate?: (hook: Hook) => void;
}

export const HookCard: React.FC<HookCardProps> = ({ hook, onDelete, onUpdate }) => {
  const { user } = useAuthStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const isAdmin = user?.email === 'copywritingobsession@gmail.com';

  const CategoryIcon = {
    curiosity: Lightbulb,
    'problem-solution': Blocks,
    story: BookOpen,
    statistic: BarChart2,
    questions: HelpCircle,
    education: GraduationCap,
    myths: AlertTriangle,
    'step-by-step': ListChecks,
    'common-mistakes': AlertOctagon,
    authority: Crown,
  }[hook.category] || Brain;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hook.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3] flex items-center justify-center">
                <CategoryIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {hook.category.split('-').map(word => 
                    word.charAt(0).toUpperCase() + word.slice(1)
                  ).join(' ')} Hook
                </h3>
                <p className="text-sm text-gray-500">
                  Created {new Date(hook.dateCreated).toLocaleDateString()}
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
              {isAdmin && onDelete && (
                <button
                  onClick={() => onDelete(hook)}
                  className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="prose max-w-none text-gray-600">
            <div className={`${isExpanded ? '' : 'max-h-48 overflow-hidden'}`}>
              <pre className="whitespace-pre-wrap text-sm font-normal bg-gray-50 p-4 rounded-lg">
                {hook.content}
              </pre>
            </div>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-4 text-sm text-[#2940D3] hover:opacity-80 flex items-center space-x-1"
            >
              {isExpanded ? (
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

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Last modified {new Date(hook.lastModified).toLocaleDateString()}
            </span>
            <div className="flex items-center space-x-2">
              {isAdmin && onUpdate && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="h-5 w-5 text-gray-500" />
                </button>
              )}
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

      <HookModal
        hook={hook}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onUpdate}
        isAdmin={isAdmin}
      />
    </>
  );
};