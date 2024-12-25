import React from 'react';
import { WordCountOption, lengthOptions } from '@/constants/wordCount';

interface WordCountSelectorProps {
  selectedOption: WordCountOption;
  onChange: (option: WordCountOption) => void;
}

export const WordCountSelector: React.FC<WordCountSelectorProps> = ({
  selectedOption,
  onChange,
}) => {
  return (
    <select
      value={selectedOption}
      onChange={(e) => onChange(e.target.value as WordCountOption)}
      className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2940D3] focus:border-transparent"
    >
      {Object.entries(lengthOptions).map(([option, { minWords, maxWords }]) => (
        <option key={option} value={option}>
          {option.charAt(0).toUpperCase() + option.slice(1)}: {minWords}-{maxWords} words
        </option>
      ))}
    </select>
  );
};