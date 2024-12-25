import { Platform } from '@/types/platform';

export interface PlatformConnectionProps {
  platform: Platform;
  onConnect: (platformId: Platform['id']) => void;
  onDisconnect: (platformId: Platform['id']) => void;
  onRetry: (platformId: Platform['id']) => void;
}

export type { Platform };