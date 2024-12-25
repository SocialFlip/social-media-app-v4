import React from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { NavDropdown } from './NavDropdown';
import { OUTSETA_CONFIG } from '@/config/outseta';

export const MainNav: React.FC = () => {
  const platformItems = [
    {
      label: 'LinkedIn',
      icon: <Linkedin className="h-4 w-4" />,
      href: '#linkedin'
    },
    {
      label: 'Twitter X',
      icon: <Twitter className="h-4 w-4" />,
      href: '#twitter'
    },
    {
      label: 'Instagram',
      icon: <Instagram className="h-4 w-4" />,
      href: '#instagram'
    }
  ];

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="text-2xl font-semibold bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-transparent bg-clip-text">
            SocialFlip.io
          </div>

          <div className="flex items-center space-x-4">
            <NavDropdown label="Platforms" items={platformItems} />
            <NavDropdown label="Pricing" href={OUTSETA_CONFIG.registerUrl} />
            <NavDropdown label="Blog" href="https://socialflip.io/blog/" />
          </div>

          <div className="flex items-center space-x-4">
            <a
              href={OUTSETA_CONFIG.loginUrl}
              className="text-gray-700 hover:text-[#2940D3] px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </a>
            <a
              href={OUTSETA_CONFIG.registerUrl}
              className="bg-gradient-to-r from-[#00C2CB] to-[#2940D3] text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};