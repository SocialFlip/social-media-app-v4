import React from 'react';
import { Link2, Youtube } from 'lucide-react';

interface ContentSourceInputProps {
  url: string;
  videoUrl: string;
  onUrlChange: (value: string) => void;
  onVideoUrlChange: (value: string) => void;
  isGenerating: boolean;
}

export const ContentSourceInput: React.FC<ContentSourceInputProps> = ({
  url,
  videoUrl,
  onUrlChange,
  onVideoUrlChange,
  isGenerating,
}) => {
  return (
    <div className="space-y-6">
      {/* Blog URL Input */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Link2 className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">Blog Post URL</h3>
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          placeholder="Enter blog post URL..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
          disabled={isGenerating}
        />
      </div>

      {/* Video URL Input */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Youtube className="h-5 w-5 text-gray-500" />
          <h3 className="text-lg font-medium text-gray-900">Video URL</h3>
        </div>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => onVideoUrlChange(e.target.value)}
          placeholder="Enter YouTube, Vimeo, or other video URL..."
          className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
          disabled={isGenerating}
        />
      </div>
    </div>
  );
};