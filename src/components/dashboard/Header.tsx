import React from 'react';
import { UserNav } from './UserNav';

export const Header: React.FC = () => {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4">
        <div className="bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-transparent bg-clip-text font-semibold text-xl">
          SocialFlip.io
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
};