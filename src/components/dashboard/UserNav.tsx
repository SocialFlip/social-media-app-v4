import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { User, LogOut } from 'lucide-react';
import { OUTSETA_CONFIG } from '@/config/outseta';

export const UserNav: React.FC = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="rounded-full h-8 w-8 bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-white flex items-center justify-center">
          <User className="h-5 w-5" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="min-w-[200px] bg-white rounded-lg shadow-lg p-2 mt-2">
          <DropdownMenu.Item className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer">
            <a 
              href={OUTSETA_CONFIG.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center w-full"
            >
              <User className="mr-2 h-4 w-4" />
              My Profile
            </a>
          </DropdownMenu.Item>
          <DropdownMenu.Item 
            className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md cursor-pointer"
          >
            <a href={OUTSETA_CONFIG.logoutUrl} className="flex items-center w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </a>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};