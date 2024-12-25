import React from 'react';
import { Template } from '@/types/templates';
import { TemplateCard } from './TemplateCard';

interface TemplateGridProps {
  templates: Template[];
  onDeleteTemplate: (template: Template) => void;
  onUpdateTemplate: (template: Template) => void;
}

export const TemplateGrid: React.FC<TemplateGridProps> = ({
  templates,
  onDeleteTemplate,
  onUpdateTemplate,
}) => {
  if (templates.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No templates found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onDelete={onDeleteTemplate}
          onUpdate={onUpdateTemplate}
        />
      ))}
    </div>
  );
};