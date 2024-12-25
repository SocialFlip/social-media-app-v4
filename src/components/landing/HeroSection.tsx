import React from 'react';
import { ArrowRight } from 'lucide-react';
import { OUTSETA_CONFIG } from '@/config/outseta';

export const HeroSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="text-center max-w-4xl mx-auto">
        <h2 className="text-5xl font-bold text-gray-900 mb-8">
          The CopyPaste Way To High Quality Social Media Content
        </h2>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          SocialFlip makes it easy to transform existing content into engaging authoritative social media posts that resonate with your audience.
        </p>
        <a
          href={OUTSETA_CONFIG.registerUrl}
          className="inline-flex items-center px-8 py-4 text-lg text-white bg-gradient-to-r from-[#00C2CB] to-[#2940D3] rounded-lg hover:opacity-90 transition-opacity"
        >
          Get Started
          <ArrowRight className="ml-2 h-5 w-5" />
        </a>
      </div>
    </div>
  );
};