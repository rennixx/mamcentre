import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useTranslation } from 'react-i18next';
import { 
  LuxurySection, 
  LuxuryText, 
  GlassCard,
  FloatingButton,
  ParticleBackground 
} from '../ui/LuxuryComponents';
import { 
  ResponsiveContainer, 
  WideScreenGrid, 
  UltraWideSection 
} from '../ui/ResponsiveComponents';
import { luxuryTheme } from '../../constants/luxuryTheme';
import { 
  usePremiumReveal,
  useParallaxEffect,
  useMagneticEffect 
} from '../../hooks/useLuxuryAnimations';

const ServicesContainer = styled(UltraWideSection)`
  background: ${luxuryTheme.colors.primary.navy};
  position: relative;
  padding: 8rem 0;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(212, 175, 55, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 70%);
    animation: serviceGlow 15s ease-in-out infinite alternate;
  }
  
  @keyframes serviceGlow {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

const ServicesContent = styled(ResponsiveContainer)`
  z-index: 10;
  position: relative;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 6rem;
  position: relative;
`;

const SectionTitle = styled(LuxuryText)`
  color: ${luxuryTheme.colors.white};
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 3px;
    background: ${luxuryTheme.gradients.goldNavy};
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-weight: ${luxuryTheme.typography.weights.light};
`;

const ServicesGrid = styled(WideScreenGrid)`
  margin-bottom: 4rem;
`;

const ServiceCard = styled(GlassCard)<{ isActive: boolean }>`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 3rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  
  ${({ isActive }) => isActive && `
    background: rgba(212, 175, 55, 0.15);
    border-color: rgba(212, 175, 55, 0.5);
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 30px 80px rgba(212, 175, 55, 0.3);
  `}
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${luxuryTheme.gradients.goldNavy};
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(0);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.4s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const ServiceIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  background: ${luxuryTheme.gradients.goldNavy};
  border-radius: ${luxuryTheme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 10px 40px rgba(212, 175, 55, 0.3);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: ${luxuryTheme.gradients.goldNavy};
    border-radius: inherit;
    z-index: -1;
    filter: blur(8px);
    opacity: 0.7;
  }
`;

const ServiceTitle = styled.h3`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.white};
  font-size: 1.8rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  margin-bottom: 1rem;
  line-height: 1.3;
`;

const ServiceDescription = styled.p`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  flex-grow: 1;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
`;

const ServiceFeature = styled.li`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '✦';
    position: absolute;
    left: 0;
    color: ${luxuryTheme.colors.gold.primary};
    font-size: 0.8rem;
  }
`;

const ServicePrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
`;

const PriceText = styled.span`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.gold.primary};
  font-size: 1.5rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
`;

const LearnMoreBtn = styled(motion.button)`
  background: transparent;
  border: 1px solid rgba(212, 175, 55, 0.5);
  color: ${luxuryTheme.colors.gold.primary};
  padding: 0.5rem 1rem;
  border-radius: ${luxuryTheme.borderRadius.sm};
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(212, 175, 55, 0.1);
    border-color: ${luxuryTheme.colors.gold.primary};
  }
`;

const ServiceModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ModalContent = styled(motion.div)`
  background: rgba(27, 54, 93, 0.95);
  backdrop-filter: blur(30px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${luxuryTheme.borderRadius.xl};
  padding: 3rem;
  max-width: 600px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: ${luxuryTheme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const ServicesSection: React.FC = () => {
  const { t } = useTranslation('services');
  const { ref: containerRef, inView } = usePremiumReveal();
  const [activeService, setActiveService] = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<any>(null);
  const parallaxRef = useParallaxEffect(0.4);
  const magneticRef = useMagneticEffect(1.2);
  const cardsRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: 1,
      icon: '🐎',
      title: t('services.list.premiumRiding.title'),
      description: t('services.list.premiumRiding.description'),
      features: t('services.list.premiumRiding.features', { returnObjects: true }) as string[],
      price: t('services.list.premiumRiding.price'),
      details: t('services.list.premiumRiding.details')
    },
    {
      id: 2,
      icon: '�',
      title: t('services.list.competition.title'),
      description: t('services.list.competition.description'),
      features: t('services.list.competition.features', { returnObjects: true }) as string[],
      price: t('services.list.competition.price'),
      details: t('services.list.competition.details')
    },
    {
      id: 3,
      icon: '🌟',
      title: t('services.list.horseCare.title'),
      description: t('services.list.horseCare.description'),
      features: t('services.list.horseCare.features', { returnObjects: true }) as string[],
      price: t('services.list.horseCare.price'),
      details: t('services.list.horseCare.details')
    },
    {
      id: 4,
      icon: '✨',
      title: t('services.list.therapeutic.title'),
      description: t('services.list.therapeutic.description'),
      features: t('services.list.therapeutic.features', { returnObjects: true }) as string[],
      price: t('services.list.therapeutic.price'),
      details: t('services.list.therapeutic.details')
    }
  ];

  useEffect(() => {
    if (inView && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.service-card');
      
      gsap.fromTo(cards,
        { 
          opacity: 0, 
          y: 100,
          rotationY: -15,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [inView]);

  const handleServiceHover = (serviceId: number) => {
    setActiveService(serviceId);
  };

  const handleServiceLeave = () => {
    setActiveService(null);
  };

  const openServiceModal = (service: typeof services[0]) => {
    setSelectedService(service);
  };

  const closeServiceModal = () => {
    setSelectedService(null);
  };

  return (
    <ServicesContainer ref={containerRef as any} id="services-section">
      <ParticleBackground ref={parallaxRef as any} />
      
      <ServicesContent>
        <SectionHeader
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <SectionTitle size="xl">
            {t('services.title')}
          </SectionTitle>
          <SectionSubtitle>
            {t('services.subtitle')}
          </SectionSubtitle>
        </SectionHeader>

        <ServicesGrid ref={cardsRef}>
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              className="service-card"
              isActive={activeService === service.id}
              onMouseEnter={() => handleServiceHover(service.id)}
              onMouseLeave={handleServiceLeave}
              whileHover={{ y: -5 }}
            >
              <div>
                <ServiceIcon
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                </ServiceIcon>
                
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
                
                <ServiceFeatures>
                  {service.features.map((feature, idx) => (
                    <ServiceFeature key={idx}>{feature}</ServiceFeature>
                  ))}
                </ServiceFeatures>
              </div>
              
              <ServicePrice>
                <PriceText>{service.price}</PriceText>
                <LearnMoreBtn
                  onClick={() => openServiceModal(service)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t('cta.learnMore')}
                </LearnMoreBtn>
              </ServicePrice>
            </ServiceCard>
          ))}
        </ServicesGrid>

        <motion.div
          style={{ textAlign: 'center' }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <FloatingButton
            ref={magneticRef as any}
            size="lg"
            variant="gold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('cta.button')}
          </FloatingButton>
        </motion.div>
      </ServicesContent>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeServiceModal}
          >
            <ModalContent
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton
                onClick={closeServiceModal}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </CloseButton>
              
              <ServiceIcon style={{ margin: '0 0 2rem 0' }}>
                {selectedService.icon}
              </ServiceIcon>
              
              <ServiceTitle style={{ marginBottom: '1rem' }}>
                {selectedService.title}
              </ServiceTitle>
              
              <ServiceDescription style={{ marginBottom: '2rem' }}>
                {selectedService.details}
              </ServiceDescription>
              
              <ServiceFeatures style={{ marginBottom: '2rem' }}>
                {selectedService.features.map((feature: string, idx: number) => (
                  <ServiceFeature key={idx}>{feature}</ServiceFeature>
                ))}
              </ServiceFeatures>
              
              <ServicePrice>
                <PriceText>{selectedService.price}</PriceText>
                <FloatingButton as={Link} to="/booking" size="sm" variant="gold">
                  Book Now
                </FloatingButton>
              </ServicePrice>
            </ModalContent>
          </ServiceModal>
        )}
      </AnimatePresence>
    </ServicesContainer>
  );
};
