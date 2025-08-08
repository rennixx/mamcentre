import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { 
  LuxurySection, 
  LuxuryText, 
  FloatingButton,
  GlassCard
} from '../ui/LuxuryComponents';
import { 
  ResponsiveContainer, 
  LandscapeOptimized, 
  UltraWideSection 
} from '../ui/ResponsiveComponents';
import { luxuryTheme } from '../../constants/luxuryTheme';
import { 
  useOptimizedReveal,
  usePerformantScroll,
  useOptimizedParallax
} from '../../hooks/useOptimizedAnimations';

const HeroContainer = styled(UltraWideSection)`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    ${luxuryTheme.colors.primary.navy} 0%,
    #0F1419 25%,
    ${luxuryTheme.colors.primary.navyLight} 50%,
    #1A2332 75%,
    ${luxuryTheme.colors.primary.navy} 100%
  );
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  padding: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.15) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, rgba(192, 192, 192, 0.1) 0%, transparent 60%),
      radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.03) 0%, transparent 80%);
    will-change: opacity;
  }
`;

const BackgroundVideo = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translate(-50%, -50%);
  z-index: 1;
  opacity: 0.3;
  object-fit: cover;
  filter: blur(1px) saturate(1.2);
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(27, 54, 93, 0.7) 0%,
    rgba(27, 54, 93, 0.5) 50%,
    rgba(27, 54, 93, 0.8) 100%
  );
  z-index: 2;
`;

const HeroContent = styled(ResponsiveContainer)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  z-index: 10;
  position: relative;
  min-height: 100vh;
  
  @media (min-width: ${luxuryTheme.breakpoints.widescreen}) {
    gap: 6rem;
  }
  
  @media (min-width: ${luxuryTheme.breakpoints.ultrawide}) {
    gap: 8rem;
  }
  
  @media (min-width: ${luxuryTheme.breakpoints['4k']}) {
    gap: 10rem;
  }
  
  @media (min-aspect-ratio: 21/9) {
    grid-template-columns: 1fr 1.2fr;
    gap: 8rem;
  }
  
  @media (max-width: ${luxuryTheme.breakpoints.laptop}) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
    padding-top: 6rem;
    padding-bottom: 4rem;
  }
  
  @media (orientation: landscape) and (max-height: 600px) {
    min-height: 100vh;
    gap: 2rem;
  }
`;

const HeroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SuperTitle = styled(motion.div)`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: ${luxuryTheme.colors.gold.primary};
  font-size: 0.9rem;
  font-weight: ${luxuryTheme.typography.weights.medium};
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 1rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 2px;
    background: ${luxuryTheme.gradients.goldNavy};
  }
  
  @media (max-width: 1024px) {
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const HeroTitle = styled(LuxuryText)`
  color: ${luxuryTheme.colors.white};
  line-height: 1.1;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.3rem;
  line-height: 1.6;
  font-weight: ${luxuryTheme.typography.weights.light};
  margin-bottom: 2rem;
  max-width: 600px;
`;

const HeroStats = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin: 3rem 0;
  
  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const StatCard = styled(GlassCard)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 2rem 1.5rem;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(212, 175, 55, 0.3);
  }
`;

const StatNumber = styled.div`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.gold.primary};
  font-size: 2.5rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  margin-bottom: 0.5rem;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  font-weight: ${luxuryTheme.typography.weights.medium};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const HeroActions = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PlayButton = styled(motion.button)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: ${luxuryTheme.gradients.goldNavy};
    border-radius: 50%;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &:hover {
    transform: scale(1.1);
    border-color: rgba(212, 175, 55, 0.5);
  }
  
  svg {
    width: 24px;
    height: 24px;
    fill: ${luxuryTheme.colors.white};
    margin-left: 3px;
  }
`;

const PlayText = styled.span`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
  margin-left: 1rem;
`;

const HeroVisual = styled.div`
  position: relative;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 1024px) {
    height: 400px;
  }
`;

const FeatureShowcase = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 500px;
`;

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: ${luxuryTheme.borderRadius.xl};
  padding: 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${luxuryTheme.gradients.goldNavy};
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(0);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background: ${luxuryTheme.gradients.goldNavy};
  border-radius: ${luxuryTheme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    background: ${luxuryTheme.gradients.goldNavy};
    border-radius: inherit;
    z-index: -1;
    filter: blur(8px);
    opacity: 0.6;
  }
`;

const FeatureTitle = styled.h4`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.white};
  font-size: 1.1rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  margin-bottom: 0.8rem;
`;

const FeatureDesc = styled.p`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  line-height: 1.5;
`;

const ScrollIndicator = styled(motion.div)`
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 10;
`;

const ScrollText = styled.span`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const ScrollArrow = styled(motion.div)`
  width: 2px;
  height: 30px;
  background: ${luxuryTheme.gradients.goldNavy};
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 8px solid ${luxuryTheme.colors.gold.primary};
  }
`;

const FloatingOrbs = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 3;
`;

const FloatingOrb = styled(motion.div)<{ size: number; top: string; left: string; delay: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.3) 0%,
    rgba(212, 175, 55, 0.1) 50%,
    transparent 100%
  );
  border-radius: 50%;
  top: ${props => props.top};
  left: ${props => props.left};
  filter: blur(1px);
  animation: float 8s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-30px) scale(1.1); }
  }
`;

export const EnhancedHeroSection: React.FC = () => {
  const { t } = useTranslation('home');
  const { ref: containerRef, inView } = useOptimizedReveal();
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  
  // Translated stats and features
  const heroStats = [
    { number: t('hero.stats.years.number'), label: t('hero.stats.years.label') },
    { number: t('hero.stats.champions.number'), label: t('hero.stats.champions.label') },
    { number: t('hero.stats.horses.number'), label: t('hero.stats.horses.label') }
  ];

  const features = [
    {
      icon: '🏆',
      title: t('hero.features.championship.title'),
      description: t('hero.features.championship.description')
    },
    {
      icon: '🐎',
      title: t('hero.features.eliteHorses.title'),
      description: t('hero.features.eliteHorses.description')
    },
    {
      icon: '✨',
      title: t('hero.features.luxuryFacilities.title'),
      description: t('hero.features.luxuryFacilities.description')
    }
  ];
  
  usePerformantScroll();

  // Animated counter effect
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      setCurrentStatIndex(prev => (prev + 1) % heroStats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [inView]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yBg = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <HeroContainer ref={containerRef as any}>
      {/* Background Video */}
      <BackgroundVideo
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setVideoLoaded(true)}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-galloping-horses-in-a-field-1373-large.mp4" type="video/mp4" />
      </BackgroundVideo>
      
      <BackgroundOverlay />
      
      {/* Floating Orbs */}
      <FloatingOrbs>
        <FloatingOrb size={120} top="10%" left="10%" delay={0} />
        <FloatingOrb size={80} top="70%" left="85%" delay={1} />
        <FloatingOrb size={60} top="30%" left="90%" delay={2} />
        <FloatingOrb size={100} top="80%" left="5%" delay={1.5} />
        <FloatingOrb size={40} top="20%" left="70%" delay={0.5} />
      </FloatingOrbs>

      <HeroContent>
        <HeroText>
          <SuperTitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('hero.superTitle')}
          </SuperTitle>
          
          <HeroTitle
            size="hero"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {t('hero.title')}
          </HeroTitle>
          
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {t('hero.subtitle')}
          </HeroSubtitle>

          <HeroStats
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {heroStats.map((stat, index) => (
              <StatCard
                key={index}
                as={motion.div}
                whileHover={{ y: -10, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <StatNumber>{stat.number}</StatNumber>
                <StatLabel>{stat.label}</StatLabel>
              </StatCard>
            ))}
          </HeroStats>

          <HeroActions
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <FloatingButton
              size="lg"
              variant="gold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('hero.cta.primary')}
            </FloatingButton>
            
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <PlayButton
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </PlayButton>
              <PlayText>{t('hero.watchStory')}</PlayText>
            </div>
          </HeroActions>
        </HeroText>

        <HeroVisual>
          <FeatureShowcase>
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={inView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1 
                } : { 
                  opacity: 0, 
                  y: 50, 
                  scale: 0.9 
                }}
                transition={{ 
                  duration: 0.8, 
                  delay: 1.2 + (index * 0.1),
                  ease: "backOut"
                }}
                whileHover={{ 
                  y: -10, 
                  transition: { duration: 0.3 }
                }}
              >
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDesc>{feature.description}</FeatureDesc>
              </FeatureCard>
            ))}
          </FeatureShowcase>
        </HeroVisual>
      </HeroContent>

      <ScrollIndicator
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <ScrollText>{t('hero.scroll.text')}</ScrollText>
        <ScrollArrow
          animate={{ 
            scaleY: [1, 1.2, 1],
            opacity: [0.6, 1, 0.6] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </ScrollIndicator>
    </HeroContainer>
  );
};
