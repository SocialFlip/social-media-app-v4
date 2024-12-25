import React from 'react';
import { Users2, Briefcase, User, Building2 } from 'lucide-react';

interface UserTypeCardProps {
  title: string;
  description: string;
  type: 'manager' | 'freelancer' | 'solopreneur' | 'agency';
}

export const UserTypeCard: React.FC<UserTypeCardProps> = ({ title, description, type }) => {
  const icons = {
    manager: Users2,
    freelancer: Briefcase,
    solopreneur: User,
    agency: Building2,
  };

  const Icon = icons[type];

  return (
    <div className="bg-[#1a2344] p-8 rounded-xl transition-all duration-300 hover:scale-[1.02] group border-2 border-transparent hover:border-[#01BFCB]">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-[#01BFCB]/10 transition-colors">
          <Icon className="h-6 w-6 text-white group-hover:text-[#01BFCB] transition-colors" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};