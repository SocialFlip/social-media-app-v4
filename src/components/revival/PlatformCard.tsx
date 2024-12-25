import React, { useState } from 'react';
import { Twitter, Linkedin, Instagram, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Platform } from '@/components/analysis/PlatformConnection';
import { RevivalModal } from './RevivalModal';
import { useNavigate } from 'react-router-dom';
import { PostAnalysis } from '@/types/analysis';
import { useContent } from '@/contexts/ContentContext';

interface PlatformCardProps {
  platform: Platform;
  onConnect: (platformId: Platform['id']) => void;
  onDisconnect: (platformId: Platform['id']) => void;
  onRetry: (platformId: Platform['id']) => void;
}

export const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  onConnect,
  onDisconnect,
  onRetry,
}) => {
  const navigate = useNavigate();
  const { setRevivalPosts } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusColor = (status: Platform['status']) => {
    switch (status) {
      case 'connected':
        return 'text-green-500';
      case 'error':
        return 'text-red-500';
      case 'connecting':
        return 'text-blue-500';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: Platform['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'connecting':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  const handleRevive = (selectedPosts: PostAnalysis[]) => {
    setRevivalPosts(selectedPosts);
    setIsModalOpen(false);
    navigate('/generation');
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[#00C2CB] to-[#2940D3] flex items-center justify-center">
              <platform.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{platform.name}</h3>
              <div className="flex items-center space-x-2">
                {getStatusIcon(platform.status)}
                <span className={`text-sm ${getStatusColor(platform.status)}`}>
                  {platform.status.charAt(0).toUpperCase() + platform.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {platform.status === 'connected' && (
              <>
                <span className="text-sm text-gray-500">
                  Last sync: {platform.lastSync}
                </span>
                <Button
                  variant="primary"
                  onClick={() => setIsModalOpen(true)}
                >
                  Get Content
                </Button>
              </>
            )}
            {platform.status === 'connected' ? (
              <Button
                variant="secondary"
                onClick={() => onDisconnect(platform.id)}
              >
                Disconnect
              </Button>
            ) : platform.status === 'error' ? (
              <Button
                variant="primary"
                onClick={() => onRetry(platform.id)}
              >
                Retry Connection
              </Button>
            ) : platform.status === 'connecting' ? (
              <Button
                variant="secondary"
                disabled
              >
                Connecting...
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => onConnect(platform.id)}
              >
                Connect
              </Button>
            )}
          </div>
        </div>

        {platform.status === 'error' && platform.error && (
          <div className="mt-4 p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600">{platform.error}</p>
          </div>
        )}
      </div>

      <RevivalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        platformId={platform.id}
        onRevive={handleRevive}
      />
    </>
  );
};