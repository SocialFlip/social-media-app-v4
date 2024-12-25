import React, { useEffect } from 'react';
import { Twitter, Linkedin, Instagram } from 'lucide-react';
import { Platform } from '@/types/platform';
import { PlatformCard } from './PlatformCard';
import { usePlatform } from '@/contexts/PlatformContext';

const initialPlatforms: Platform[] = [
  {
    id: 'twitter',
    name: 'Twitter',
    icon: Twitter,
    status: 'disconnected',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: Linkedin,
    status: 'disconnected',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: Instagram,
    status: 'disconnected',
  },
];

export const PlatformList: React.FC = () => {
  const { platforms, setPlatforms, updateAnalytics } = usePlatform();

  useEffect(() => {
    if (platforms.length === 0) {
      setPlatforms(initialPlatforms);
    }
  }, [platforms, setPlatforms]);

  const handleConnect = async (platformId: Platform['id']) => {
    setPlatforms((current: Platform[]) =>
      current.map(platform =>
        platform.id === platformId
          ? { ...platform, status: 'connecting' }
          : platform
      )
    );

    try {
      await updateAnalytics(platformId);
      setPlatforms((current: Platform[]) =>
        current.map(platform =>
          platform.id === platformId
            ? {
                ...platform,
                status: 'connected',
                lastSync: new Date().toLocaleString(),
              }
            : platform
        )
      );
    } catch (error) {
      setPlatforms((current: Platform[]) =>
        current.map(platform =>
          platform.id === platformId
            ? {
                ...platform,
                status: 'error',
                error: 'Failed to connect. Please try again.',
              }
            : platform
        )
      );
    }
  };

  const handleDisconnect = (platformId: Platform['id']) => {
    setPlatforms((current: Platform[]) =>
      current.map(platform =>
        platform.id === platformId
          ? {
              ...platform,
              status: 'disconnected',
              lastSync: undefined,
            }
          : platform
      )
    );
  };

  const handleRetry = (platformId: Platform['id']) => {
    handleConnect(platformId);
  };

  return (
    <div className="space-y-4">
      {platforms.map((platform) => (
        <PlatformCard
          key={platform.id}
          platform={platform}
          onConnect={handleConnect}
          onDisconnect={handleDisconnect}
          onRetry={handleRetry}
        />
      ))}
    </div>
  );
};