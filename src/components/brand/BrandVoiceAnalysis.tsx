import React, { useState } from 'react';
import { Edit2, Save } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useBrandVoice } from '@/contexts/BrandVoiceContext';

export const BrandVoiceAnalysis: React.FC = () => {
  const { brandVoice, setBrandVoice, setIsAnalyzed } = useBrandVoice();
  const [isEditing, setIsEditing] = useState(false);
  const [editedStatement, setEditedStatement] = useState(brandVoice?.analyzedStatement || '');

  if (!brandVoice) return null;

  const handleSave = () => {
    setBrandVoice({
      ...brandVoice,
      analyzedStatement: editedStatement,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Your Brand Voice</h2>
        <div className="flex space-x-2">
          {isEditing ? (
            <Button
              variant="primary"
              onClick={handleSave}
              className="flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save</span>
            </Button>
          ) : (
            <>
              <Button
                variant="secondary"
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit Statement</span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => setIsAnalyzed(false)}
                className="flex items-center space-x-2"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit Questions</span>
              </Button>
            </>
          )}
        </div>
      </div>
      
      {isEditing ? (
        <textarea
          value={editedStatement}
          onChange={(e) => setEditedStatement(e.target.value)}
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent min-h-[150px]"
        />
      ) : (
        <p className="text-gray-600 whitespace-pre-line">
          {brandVoice.analyzedStatement}
        </p>
      )}
    </div>
  );
};