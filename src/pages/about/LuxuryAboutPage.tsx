import React from 'react';
import { EnhancedAboutSection } from '../../components/sections/EnhancedAboutSection';
import { usePerformantScroll } from '../../hooks/useOptimizedAnimations';

export const LuxuryAboutPage: React.FC = () => {
  usePerformantScroll();
  
  return (
    <EnhancedAboutSection />
  );
};
