import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Twitter, Linkedin, Instagram, ChevronDown } from 'lucide-react';

interface NavDropdownProps {
  label: string;
  items?: Array<{
    label: string;
    icon?: React.ReactNode;
    href: string;
  }>;
  href?: string;
}

export const NavDropdown: React.FC<NavDropdownProps> = ({ label, items, href }) => {
  if (!items) {
    return (
      <a
        href={href}
        target={href?.includes('http') ? '_blank' : undefined}
        rel={href?.includes('http') ? 'noopener noreferrer' : undefined}
        className="text-gray-700 hover:text-[#2940D3] px-4 py-2 rounded-lg transition-colors"
      >
        {label}
      </a>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center space-x-1 text-gray-700 hover:text-[#2940D3] px-4 py-2 rounded-lg transition-colors">
        <span>{label}</span>
        <ChevronDown className="h-4 w-4" />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content className="bg-white rounded-lg shadow-lg p-2 min-w-[200px] mt-2">
          {items.map((item, index) => (
            <DropdownMenu.Item key={index} className="outline-none">
              <a
                href={item.href}
                target={item.href.includes('http') ? '_blank' : undefined}
                rel={item.href.includes('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-[#2940D3] hover:bg-gray-50 rounded-lg transition-colors"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};