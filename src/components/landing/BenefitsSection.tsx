import React from 'react';
import { Zap, ClipboardCopy, Users } from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  return (
    <div className="bg-[#121938] py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">
            Benefits of SocialFlip
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            With SocialFlip's content generation tool, you don't have to be an amazing writer, social media marketing wizard, or waste hours trying to find the perfect way to say something. SocialFlip learns and does it for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#1a2344] p-8 rounded-xl">
            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-6">
              <Zap className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Increased efficiency
            </h3>
            <p className="text-gray-300">
              Instead of just passively being on social, now you can use what moves you from the experts you follow and make it your own. Saving hours of time.
            </p>
          </div>

          <div className="bg-[#1a2344] p-8 rounded-xl">
            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-6">
              <ClipboardCopy className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Improved accuracy
            </h3>
            <p className="text-gray-300">
              When you see something or create something that people love you should make more of it. Now you can strike like lightning, using the same concepts in different ways.
            </p>
          </div>

          <div className="bg-[#1a2344] p-8 rounded-xl">
            <div className="w-12 h-12 bg-pink-600/20 rounded-lg flex items-center justify-center mb-6">
              <Users className="h-6 w-6 text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Next-level personalization
            </h3>
            <p className="text-gray-300">
              Repurposing is tailored content focused on exactly how your audience likes it. SocialFlip lets you create and save templates and hooks that your audience loves. So you can make content specific to how they like it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};