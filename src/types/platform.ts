import { FC } from 'react';

export type PlatformId = 'twitter' | 'linkedin' | 'instagram';

export interface Platform {
  id: PlatformId;
  name: string;
  icon: FC<{ className?: string }>;
  status: 'connected' | 'disconnected' | 'connecting' | 'error';
  lastSync?: string;
  error?: string;
}

export type SocialPlatform = 'linkedin' | 'twitter' | 'twitter-thread' | 'instagram' | 'carousel' | 'story' | 'mini-guide';