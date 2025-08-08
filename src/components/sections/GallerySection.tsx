import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  LuxurySection, 
  LuxuryText, 
  GlassCard,
  FloatingButton,
  ParticleBackground 
} from '../ui/LuxuryComponents';
import { luxuryTheme } from '../../constants/luxuryTheme';
import { 
  usePremiumReveal,
  useParallaxEffect,
  useMagneticEffect 
} from '../../hooks/useLuxuryAnimations';

const GalleryContainer = styled(LuxurySection)`
  background: ${luxuryTheme.colors.primary.navy};
  position: relative;
  padding: 8rem 2rem;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(192, 192, 192, 0.08) 0%, transparent 50%),
      linear-gradient(45deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%);
    animation: galleryGlow 18s ease-in-out infinite alternate;
  }
  
  @keyframes galleryGlow {
    0% { opacity: 0.7; }
    100% { opacity: 1; }
  }
`;

const GalleryContent = styled.div`
  max-width: 1400px;
  width: 100%;
  z-index: 10;
  position: relative;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const SectionTitle = styled(LuxuryText)`
  color: ${luxuryTheme.colors.white};
  margin-bottom: 1.5rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 140px;
    height: 3px;
    background: ${luxuryTheme.gradients.goldNavy};
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: ${luxuryTheme.typography.weights.light};
`;

const FilterTabs = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 4rem;
  flex-wrap: wrap;
`;

const FilterTab = styled(motion.button)<{ isActive: boolean }>`
  background: ${props => props.isActive 
    ? 'rgba(212, 175, 55, 0.2)' 
    : 'rgba(255, 255, 255, 0.08)'
  };
  backdrop-filter: blur(20px);
  border: 1px solid ${props => props.isActive 
    ? 'rgba(212, 175, 55, 0.5)' 
    : 'rgba(255, 255, 255, 0.15)'
  };
  color: ${props => props.isActive 
    ? luxuryTheme.colors.gold.primary 
    : luxuryTheme.colors.white
  };
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-weight: ${luxuryTheme.typography.weights.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${luxuryTheme.gradients.goldNavy};
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 0.1;
  }
  
  & > span {
    position: relative;
    z-index: 1;
  }
`;

const GalleryGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  height: 350px;
  border-radius: ${luxuryTheme.borderRadius.xl};
  overflow: hidden;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      45deg,
      transparent 0%,
      rgba(212, 175, 55, 0.1) 50%,
      transparent 100%
    );
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: 2;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const ItemImage = styled.div<{ bgImage: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      transparent 0%,
      rgba(0, 0, 0, 0.3) 60%,
      rgba(0, 0, 0, 0.7) 100%
    );
  }
`;

const ItemOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: rgba(27, 54, 93, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  z-index: 3;
  transition: opacity 0.3s ease;
  
  ${GalleryItem}:hover & {
    opacity: 1;
  }
`;

const ItemTitle = styled.h3`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.white};
  font-size: 1.5rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  margin-bottom: 1rem;
  text-align: center;
`;

const ItemDescription = styled.p`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
  line-height: 1.5;
`;

const ViewButton = styled(FloatingButton)`
  padding: 0.8rem 1.5rem;
  font-size: 0.9rem;
`;

const ItemInfo = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  z-index: 4;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    transparent 100%
  );
`;

const ItemCategory = styled.span`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: ${luxuryTheme.colors.gold.primary};
  font-size: 0.8rem;
  font-weight: ${luxuryTheme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  display: block;
`;

const ItemName = styled.h4`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.white};
  font-size: 1.2rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  margin: 0;
`;

const LightboxOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

const LightboxContent = styled(motion.div)`
  max-width: 90vw;
  max-height: 90vh;
  position: relative;
`;

const LightboxImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: contain;
  border-radius: ${luxuryTheme.borderRadius.lg};
  box-shadow: 0 20px 80px rgba(0, 0, 0, 0.5);
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: -3rem;
  right: -1rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${luxuryTheme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.8rem;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(212, 175, 55, 0.2);
    border-color: rgba(212, 175, 55, 0.5);
  }
`;

const NavigationButton = styled(motion.button)<{ direction: 'prev' | 'next' }>`
  position: absolute;
  top: 50%;
  ${props => props.direction === 'prev' ? 'left: -4rem;' : 'right: -4rem;'}
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${luxuryTheme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 1rem;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(212, 175, 55, 0.2);
    border-color: rgba(212, 175, 55, 0.5);
  }
  
  @media (max-width: 768px) {
    ${props => props.direction === 'prev' ? 'left: 1rem;' : 'right: 1rem;'}
    top: auto;
    bottom: 1rem;
  }
`;

interface GalleryImage {
  id: number;
  src: string;
  title: string;
  description: string;
  category: string;
  name: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&h=600&fit=crop',
    title: 'Premier Training Facilities',
    description: 'State-of-the-art indoor arenas with premium footing',
    category: 'Facilities',
    name: 'Indoor Arena'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1596797882870-8c33dfe6e313?w=800&h=600&fit=crop',
    title: 'Championship Horses',
    description: 'Meet our award-winning thoroughbreds',
    category: 'Horses',
    name: 'Thunder'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&h=600&fit=crop',
    title: 'Expert Instruction',
    description: 'Professional guidance for all skill levels',
    category: 'Training',
    name: 'Private Lesson'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?w=800&h=600&fit=crop',
    title: 'Competition Success',
    description: 'Celebrating victories at prestigious events',
    category: 'Events',
    name: 'Championship Win'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
    title: 'Luxury Stables',
    description: 'Premium boarding facilities with 24/7 care',
    category: 'Facilities',
    name: 'Stable Complex'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop',
    title: 'Young Riders Program',
    description: 'Building tomorrow\'s equestrian champions',
    category: 'Training',
    name: 'Youth Training'
  }
];

const categories = ['All', 'Facilities', 'Horses', 'Training', 'Events'];

export const GallerySection: React.FC = () => {
  const { ref: containerRef, inView } = usePremiumReveal();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const parallaxRef = useParallaxEffect(0.2);
  const gridRef = useRef<HTMLDivElement>(null);

  const filteredImages = activeFilter === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeFilter);

  useEffect(() => {
    if (inView && gridRef.current) {
      const items = gridRef.current.querySelectorAll('.gallery-item');
      
      gsap.fromTo(items,
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9,
          rotation: -5
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.4)"
        }
      );
    }
  }, [inView, activeFilter]);

  const openLightbox = (image: GalleryImage) => {
    const index = filteredImages.findIndex(img => img.id === image.id);
    setSelectedIndex(index);
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'prev' 
      ? (selectedIndex - 1 + filteredImages.length) % filteredImages.length
      : (selectedIndex + 1) % filteredImages.length;
    
    setSelectedIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <GalleryContainer ref={containerRef as any} id="gallery-section">
      <ParticleBackground ref={parallaxRef as any} />
      
      <GalleryContent>
        <SectionHeader
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <SectionTitle size="xl">
            Experience Excellence
          </SectionTitle>
          <SectionSubtitle>
            Explore our world-class facilities, championship horses, and moments of triumph 
            that define the premium equestrian experience.
          </SectionSubtitle>
        </SectionHeader>

        <FilterTabs
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {categories.map((category) => (
            <FilterTab
              key={category}
              isActive={activeFilter === category}
              onClick={() => setActiveFilter(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{category}</span>
            </FilterTab>
          ))}
        </FilterTabs>

        <GalleryGrid ref={gridRef}>
          <AnimatePresence mode="wait">
            {filteredImages.map((image) => (
              <GalleryItem
                key={`${activeFilter}-${image.id}`}
                className="gallery-item"
                onClick={() => openLightbox(image)}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                layoutId={`image-${image.id}`}
              >
                <ItemImage bgImage={image.src}>
                  <motion.div
                    style={{ 
                      width: '100%', 
                      height: '100%',
                      transform: 'scale(1)'
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                  />
                </ItemImage>
                
                <ItemOverlay
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ItemTitle>{image.title}</ItemTitle>
                  <ItemDescription>{image.description}</ItemDescription>
                  <ViewButton
                    size="sm"
                    variant="gold"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Details
                  </ViewButton>
                </ItemOverlay>

                <ItemInfo>
                  <ItemCategory>{image.category}</ItemCategory>
                  <ItemName>{image.name}</ItemName>
                </ItemInfo>
              </GalleryItem>
            ))}
          </AnimatePresence>
        </GalleryGrid>
      </GalleryContent>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <LightboxOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <LightboxContent
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton
                onClick={closeLightbox}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </CloseButton>
              
              {filteredImages.length > 1 && (
                <>
                  <NavigationButton
                    direction="prev"
                    onClick={() => navigateImage('prev')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ‹
                  </NavigationButton>
                  
                  <NavigationButton
                    direction="next"
                    onClick={() => navigateImage('next')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ›
                  </NavigationButton>
                </>
              )}
              
              <LightboxImage
                src={selectedImage.src}
                alt={selectedImage.title}
              />
            </LightboxContent>
          </LightboxOverlay>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};
