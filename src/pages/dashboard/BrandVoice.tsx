import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TextInput } from '@/components/ui/TextInput';
import { useBrandVoice } from '@/contexts/BrandVoiceContext';
import { BrandVoiceForm } from '@/components/brand/BrandVoiceForm';
import { BrandVoiceAnalysis } from '@/components/brand/BrandVoiceAnalysis';
import { NextSteps } from '@/components/brand/NextSteps';

export const BrandVoice: React.FC = () => {
  const { brandVoice, isAnalyzed } = useBrandVoice();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Brand Voice</h1>
        <p className="text-gray-600 mt-2">Define your unique brand voice and communication style</p>
      </div>

      {!isAnalyzed ? (
        <BrandVoiceForm />
      ) : (
        <>
          <BrandVoiceAnalysis />
          <NextSteps onNavigate={(path) => navigate(path)} />
        </>
      )}
    </div>
  );
};