import React, { useState } from 'react';
import { Platform, Template } from '@/types/templates';
import { TemplateTabs } from '@/components/templates/TemplateTabs';
import { TemplateCreator } from '@/components/templates/TemplateCreator';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { DeleteConfirmationModal } from '@/components/modals/DeleteConfirmationModal';
import { useTemplates } from '@/contexts/TemplateContext';

export const Templates: React.FC = () => {
  const { templates, getTemplatesByPlatform, deleteTemplate, updateTemplate } = useTemplates();
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('linkedin');
  const [isCreating, setIsCreating] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);

  const templateCounts = {
    linkedin: templates.filter(t => t.platform === 'linkedin').length,
    twitter: templates.filter(t => t.platform === 'twitter').length,
    instagram: templates.filter(t => t.platform === 'instagram').length,
  };

  const handlePlatformSelect = (platform: Platform) => {
    setSelectedPlatform(platform);
    setIsCreating(false); // Hide creator form when changing platforms
  };

  const handleDeleteConfirm = () => {
    if (templateToDelete) {
      deleteTemplate(templateToDelete.id);
      setTemplateToDelete(null);
    }
  };

  const handleUpdateTemplate = (updatedTemplate: Template) => {
    updateTemplate(updatedTemplate.id, updatedTemplate);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Templates</h1>
        <p className="text-gray-600 mt-2">Manage your content templates</p>
      </div>

      <TemplateTabs
        selectedPlatform={selectedPlatform}
        onPlatformSelect={handlePlatformSelect}
        templateCounts={templateCounts}
      />

      {isCreating ? (
        <TemplateCreator
          platform={selectedPlatform}
          onSave={() => setIsCreating(false)}
        />
      ) : (
        <div className="flex justify-end">
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-[#2940D3] text-white rounded-lg hover:opacity-90 transition-opacity"
            disabled={templateCounts[selectedPlatform] >= 25}
          >
            Create Template
          </button>
        </div>
      )}

      {!isCreating && (
        <TemplateGrid
          templates={getTemplatesByPlatform(selectedPlatform)}
          onDeleteTemplate={setTemplateToDelete}
          onUpdateTemplate={handleUpdateTemplate}
        />
      )}

      <DeleteConfirmationModal
        isOpen={!!templateToDelete}
        onClose={() => setTemplateToDelete(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};