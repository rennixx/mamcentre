import React from 'react';
import { ContactSection } from '../../components/sections/ContactSection';
import { useLuxuryScroll } from '../../hooks/useLuxuryAnimations';

export const LuxuryContactPage: React.FC = () => {
  useLuxuryScroll();
  
  return (
    <ContactSection />
  );
};
