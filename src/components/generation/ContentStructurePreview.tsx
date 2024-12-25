import React from 'react';
import { Category } from '@/types/generation';
import { CATEGORIES } from '@/data/constants';

interface ContentStructurePreviewProps {
  categoryId: Category['id'];
}

export const ContentStructurePreview: React.FC<ContentStructurePreviewProps> = ({
  categoryId,
}) => {
  const category = CATEGORIES.find((c) => c.id === categoryId)!;

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-4">Content Structure</h3>
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700">Hook</h4>
          <p className="text-sm text-gray-600 mt-1">{category.structure.hook}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700">Problem</h4>
          <p className="text-sm text-gray-600 mt-1">{category.structure.problem}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-700">Solution</h4>
          <p className="text-sm text-gray-600 mt-1">{category.structure.solution}</p>
        </div>
      </div>
    </div>
  );
};