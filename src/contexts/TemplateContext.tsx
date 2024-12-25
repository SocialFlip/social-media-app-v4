import React, { createContext, useContext } from 'react';
import { Template, Platform, TemplateAnalysis } from '@/types/templates';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import axios from 'axios';
import { WEBHOOKS } from '@/config/webhooks';

interface TemplateContextType {
  templates: Template[];
  addTemplate: (template: Template) => void;
  deleteTemplate: (id: string) => void;
  updateTemplate: (id: string, updates: Partial<Template>) => void;
  getTemplatesByPlatform: (platform: Platform) => Template[];
  analyzeContent: (platform: Platform, content: string) => Promise<TemplateAnalysis>;
}

const TemplateContext = createContext<TemplateContextType | null>(null);

export const TemplateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [templates, setTemplates] = useLocalStorage<Template[]>('socialflip_templates', []);

  const addTemplate = (template: Template) => {
    setTemplates(prev => [...prev, template]);
  };

  const deleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(template => template.id !== id));
  };

  const updateTemplate = (id: string, updates: Partial<Template>) => {
    setTemplates(prev =>
      prev.map(template =>
        template.id === id
          ? { ...template, ...updates, lastModified: new Date() }
          : template
      )
    );
  };

  const getTemplatesByPlatform = (platform: Platform) => {
    return templates.filter(template => template.platform === platform);
  };

  const analyzeContent = async (platform: Platform, content: string): Promise<TemplateAnalysis> => {
    try {
      const webhookUrl = WEBHOOKS[`template-${platform}`];
      if (!webhookUrl) {
        throw new Error(`No webhook URL found for platform: ${platform}`);
      }

      const response = await axios.post(
        webhookUrl,
        { content: content.trim() },
        { 
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000
        }
      );

      // Handle the webhook response
      const responseData = response.data;
      
      // If the response is a string, use it as the structure
      if (typeof responseData === 'string') {
        return {
          structure: responseData,
          analysis: {
            elements: ['Hook', 'Story', 'Value Proposition', 'Call to Action'],
            patterns: ['Problem-Solution', 'Story Arc', 'Social Proof'],
            keywords: ['success', 'growth', 'innovation', 'results'],
          },
        };
      }

      // If the response is an object with a structure property
      if (responseData.structure) {
        return {
          structure: responseData.structure,
          analysis: {
            elements: responseData.elements || ['Hook', 'Story', 'Value Proposition', 'Call to Action'],
            patterns: responseData.patterns || ['Problem-Solution', 'Story Arc', 'Social Proof'],
            keywords: responseData.keywords || ['success', 'growth', 'innovation', 'results'],
          },
        };
      }

      // If the response has content property
      if (responseData.content) {
        return {
          structure: responseData.content,
          analysis: {
            elements: responseData.elements || ['Hook', 'Story', 'Value Proposition', 'Call to Action'],
            patterns: responseData.patterns || ['Problem-Solution', 'Story Arc', 'Social Proof'],
            keywords: responseData.keywords || ['success', 'growth', 'innovation', 'results'],
          },
        };
      }

      throw new Error('Invalid response format from webhook');
    } catch (error) {
      console.error('Template analysis error:', error);
      // Return a default analysis on error
      return {
        structure: content,
        analysis: {
          elements: ['Hook', 'Story', 'Value Proposition', 'Call to Action'],
          patterns: ['Problem-Solution', 'Story Arc', 'Social Proof'],
          keywords: ['success', 'growth', 'innovation', 'results'],
        },
      };
    }
  };

  return (
    <TemplateContext.Provider
      value={{
        templates,
        addTemplate,
        deleteTemplate,
        updateTemplate,
        getTemplatesByPlatform,
        analyzeContent,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplates = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplates must be used within a TemplateProvider');
  }
  return context;
};