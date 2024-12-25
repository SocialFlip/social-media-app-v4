import React from 'react';
import { MainNav } from '@/components/navigation/MainNav';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { BenefitsSection } from '@/components/landing/BenefitsSection';
import { UserTypesSection } from '@/components/landing/UserTypesSection';
import { PlatformSection } from '@/components/landing/PlatformSection';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <MainNav />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <BenefitsSection />
      <UserTypesSection />
      <PlatformSection />
      <Footer />
    </div>
  );
};