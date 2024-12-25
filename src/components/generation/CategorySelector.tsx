import React from 'react';
import { Category } from '@/types/generation';
import { CATEGORIES } from '@/data/constants';

interface CategorySelectorProps {
  selectedCategory: Category['id'] | null;
  onCategorySelect: (category: Category['id']) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategorySelect(category.id)}
          className={`p-6 rounded-lg border transition-all ${
            selectedCategory === category.id
              ? 'border-transparent ring-2 ring-[#2940D3] bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-white'
              : 'border-gray-200 hover:border-[#2940D3] bg-white'
          }`}
        >
          <h3 className="text-lg font-semibold mb-2">{category.label}</h3>
          <p className={`text-sm mb-4 ${
            selectedCategory === category.id ? 'text-gray-100' : 'text-gray-600'
          }`}>
            {category.description}
          </p>
          {selectedCategory === category.id && (
            <div className="text-left">
              <h4 className="text-sm font-medium mb-2">Key Aspects:</h4>
              <ul className="text-sm space-y-1 list-disc list-inside">
                {category.aspects.map((aspect, index) => (
                  <li key={index}>{aspect}</li>
                ))}
              </ul>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};