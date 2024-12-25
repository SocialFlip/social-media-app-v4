import React from 'react';
import { Linkedin, Instagram } from 'lucide-react';
import { platformImages } from '@/assets/images';

interface PlatformCardProps {
  name: 'LinkedIn' | 'Twitter' | 'Instagram';
  image?: string;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({ name }) => {
  const TwitterX = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z"
        fill="black"
      />
    </svg>
  );

  const LogoIcon = {
    LinkedIn: Linkedin,
    Twitter: TwitterX,
    Instagram: Instagram,
  }[name];

  const platformKey = name.toLowerCase() as keyof typeof platformImages;
  const imageUrl = platformImages[platformKey];

  return (
    <div className="relative overflow-hidden rounded-xl aspect-square group">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
        <h3 className="text-2xl font-bold text-white">{name}</h3>
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-20 h-20 bg-white/90 rounded-xl flex items-center justify-center transform -rotate-12">
          <LogoIcon 
            className={`h-12 w-12 ${
              name === 'LinkedIn' ? 'text-[#0077B5]' : 
              name === 'Instagram' ? 'text-[#E4405F]' : ''
            }`} 
          />
        </div>
      </div>
    </div>
  );
};