import React from 'react';
import { ServicesSection } from '../../components/sections/ServicesSection';
import { useLuxuryScroll } from '../../hooks/useLuxuryAnimations';

export const LuxuryServicesPage: React.FC = () => {
  useLuxuryScroll();
  
  return (
    <ServicesSection />
  );
};
