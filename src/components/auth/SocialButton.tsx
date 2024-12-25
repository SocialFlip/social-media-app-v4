import React from 'react';

interface SocialButtonProps {
  icon: string;
  text: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({ icon, text }) => {
  return (
    <button className="w-full px-4 py-3 border border-gray-200 rounded-lg flex items-center justify-center space-x-2 hover:bg-gray-50 transition duration-200">
      <img
        src={icon}
        alt="Social Icon"
        className="w-5 h-5"
      />
      <span className="text-gray-700">{text}</span>
    </button>
  );
};