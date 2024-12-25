import React, { createContext, useContext, useState, useEffect } from 'react';

interface BrandVoice {
  problem: string;
  solution: string;
  results: string;
  impact: string;
  analyzedStatement?: string;
}

interface BrandVoiceContextType {
  brandVoice: BrandVoice | null;
  setBrandVoice: (voice: BrandVoice) => void;
  isAnalyzed: boolean;
  setIsAnalyzed: (analyzed: boolean) => void;
}

const STORAGE_KEY = 'socialflip_brandvoice';

const BrandVoiceContext = createContext<BrandVoiceContextType | null>(null);

export const BrandVoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brandVoice, setBrandVoice] = useState<BrandVoice | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [isAnalyzed, setIsAnalyzed] = useState(() => !!brandVoice?.analyzedStatement);

  useEffect(() => {
    if (brandVoice) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(brandVoice));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [brandVoice]);

  return (
    <BrandVoiceContext.Provider
      value={{
        brandVoice,
        setBrandVoice,
        isAnalyzed,
        setIsAnalyzed,
      }}
    >
      {children}
    </BrandVoiceContext.Provider>
  );
};

export const useBrandVoice = () => {
  const context = useContext(BrandVoiceContext);
  if (!context) {
    throw new Error('useBrandVoice must be used within a BrandVoiceProvider');
  }
  return context;
};