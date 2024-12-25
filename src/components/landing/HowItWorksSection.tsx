import React from 'react';
import { IMAGES } from '@/constants/images';

export const HowItWorksSection: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            How Does SocialFlip Actually Work
          </h2>
          <p className="text-lg text-gray-600 space-y-4">
            Social Media Inspiration is everywhere, SocialFlip let's you use it easily.
            <br /><br />
            Choose a blog you want to create social content for, expert insights you want to copy and paste and expand on, or grab a YouTube video that took off in your industry and you want to ride the wave.
            <br /><br />
            Whatever you find. You can flip into platform specific, high value and engaging content, in seconds.
          </p>
        </div>
        <div>
          <img
            src={IMAGES.dashboard}
            alt="Dashboard"
            className="rounded-lg shadow-lg"
          />
          <div className="grid grid-cols-3 gap-8 mt-8">
            <div className="bg-[#121938] p-3.5 rounded-lg text-center text-white">
              <span className="text-xl font-semibold">1</span>
              <p className="mt-2">Find Inspiration</p>
            </div>
            <div className="bg-[#121938] p-3.5 rounded-lg text-center text-white">
              <span className="text-xl font-semibold">2</span>
              <p className="mt-2">Paste Text or URL</p>
            </div>
            <div className="bg-[#121938] p-3.5 rounded-lg text-center text-white">
              <span className="text-xl font-semibold">3</span>
              <p className="mt-2">Get Professional Content</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};