import React, { useEffect } from 'react';
import { EnhancedHeroSection } from '../../components/sections/EnhancedHeroSection';
import { EnhancedAboutSection } from '../../components/sections/EnhancedAboutSection';
import { ServicesSection } from '../../components/sections/ServicesSection';
import { GallerySection } from '../../components/sections/GallerySection';
import { ContactSection } from '../../components/sections/ContactSection';
import { usePerformantScroll } from '../../hooks/useOptimizedAnimations';

export const LuxuryHomePage: React.FC = () => {
  usePerformantScroll();

  useEffect(() => {
    // Preload critical resources
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);

    // Load luxury fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);
  }, []);

  return (
    <>
      <EnhancedHeroSection />
      <EnhancedAboutSection />
      <ServicesSection />
      <GallerySection />
      <ContactSection />
    </>
  );
};
