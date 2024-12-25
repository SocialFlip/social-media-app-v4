import React from 'react';

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#00C2CB] to-[#2940D3] transition-all duration-300 ease-out"
        style={{ 
          width: `${progress}%`,
          backgroundSize: '200% 100%',
          animation: 'shimmer 2s infinite linear'
        }}
      />
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: 200% 0;
            }
            100% {
              background-position: -200% 0;
            }
          }
        `}
      </style>
    </div>
  );
};