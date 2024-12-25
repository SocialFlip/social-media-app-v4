import React from 'react';

interface CategoryBadgeProps {
  category: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category }) => {
  const getColorClass = (category: string) => {
    switch (category.toLowerCase()) {
      case 'linkedin':
        return 'bg-blue-100 text-blue-800';
      case 'twitter':
        return 'bg-gray-100 text-gray-800';
      case 'instagram':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getColorClass(category)}`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
};