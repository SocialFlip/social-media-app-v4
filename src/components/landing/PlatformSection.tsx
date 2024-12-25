import React from 'react';
import { PlatformCard } from './PlatformCard';
import { IMAGES } from '@/constants/images';

export const PlatformSection: React.FC = () => {
  return (
    <div className="bg-[#121938] py-24">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Platforms Supported
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PlatformCard name="LinkedIn" image={IMAGES.platforms.linkedin} />
          <PlatformCard name="Twitter" image={IMAGES.platforms.twitter} />
          <PlatformCard name="Instagram" image={IMAGES.platforms.instagram} />
        </div>
      </div>
    </div>
  );
};