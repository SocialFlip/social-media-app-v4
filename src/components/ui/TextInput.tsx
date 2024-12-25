import React, { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const TextInput: React.FC<TextInputProps> = ({ className, ...props }) => {
  return (
    <input
      className={cn(
        "w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-200",
        className
      )}
      {...props}
    />
  );
};