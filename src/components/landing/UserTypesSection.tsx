import React from 'react';
import { UserTypeCard } from './UserTypeCard';

export const UserTypesSection: React.FC = () => {
  return (
    <div className="bg-[#121938] py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-6">
            Who should use this tool in their business?
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
            Anyone who wants to create content like a badass quickly without the increased budget or headaches, ideal for:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UserTypeCard
            type="manager"
            title="Social Media Managers"
            description="Streamline your content creation process and maintain consistent quality across multiple platforms."
          />
          <UserTypeCard
            type="freelancer"
            title="Freelancers"
            description="Scale your content creation services and deliver more value to your clients."
          />
          <UserTypeCard
            type="solopreneur"
            title="Solopreneurs"
            description="Create professional content quickly without hiring a full marketing team."
          />
          <UserTypeCard
            type="agency"
            title="Marketing Agencies"
            description="Enhance your content services and improve delivery efficiency for clients."
          />
        </div>
      </div>
    </div>
  );
};