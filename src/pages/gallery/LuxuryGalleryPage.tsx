import React from 'react';
import { GallerySection } from '../../components/sections/GallerySection';
import { useLuxuryScroll } from '../../hooks/useLuxuryAnimations';

export const LuxuryGalleryPage: React.FC = () => {
  useLuxuryScroll();
  
  return (
    <GallerySection />
  );
};
