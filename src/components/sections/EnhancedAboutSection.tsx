import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { 
  LuxurySection, 
  LuxuryText, 
  GlassCard,
  FloatingButton
} from '../ui/LuxuryComponents';
import { luxuryTheme } from '../../constants/luxuryTheme';
import { useOptimizedReveal, usePerformantScroll } from '../../hooks/useOptimizedAnimations';

const AboutContainer = styled(LuxurySection)`
  background: linear-gradient(
    180deg,
    #0F1419 0%,
    ${luxuryTheme.colors.primary.navy} 25%,
    #1A2332 50%,
    ${luxuryTheme.colors.primary.navyLight} 75%,
    ${luxuryTheme.colors.primary.navy} 100%
  );
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
      radial-gradient(circle at 30% 20%, rgba(212, 175, 55, 0.12) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(192, 192, 192, 0.08) 0%, transparent 50%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%);
    will-change: opacity;
  }
`;

const AboutContent = styled.div`
  max-width: 1400px;
  width: 100%;
  z-index: 10;
  position: relative;
`;

const IntroSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
  margin-bottom: 8rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 4rem;
    text-align: center;
  }
`;

const IntroText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const SectionTitle = styled(LuxuryText)`
  color: ${luxuryTheme.colors.white};
  margin-bottom: 2rem;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 0;
    width: 120px;
    height: 3px;
    background: ${luxuryTheme.gradients.goldNavy};
    border-radius: 2px;
  }
  
  @media (max-width: 1024px) {
    &::after {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const IntroDescription = styled(motion.div)`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.85);
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  
  p {
    margin-bottom: 1.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const FounderQuote = styled(motion.blockquote)`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.gold.primary};
  font-size: 1.4rem;
  font-style: italic;
  line-height: 1.6;
  margin: 3rem 0;
  padding-left: 2rem;
  border-left: 3px solid ${luxuryTheme.colors.gold.primary};
  position: relative;
  
  &::before {
    content: '"';
    font-size: 4rem;
    position: absolute;
    top: -1rem;
    left: -1rem;
    opacity: 0.3;
  }
`;

const FounderInfo = styled.div`
  margin-top: 1.5rem;
  
  .name {
    font-family: ${luxuryTheme.typography.fonts.primary};
    color: ${luxuryTheme.colors.white};
    font-weight: ${luxuryTheme.typography.weights.bold};
    margin-bottom: 0.5rem;
  }
  
  .title {
    font-family: ${luxuryTheme.typography.fonts.primary};
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.9rem;
  }
`;

const IntroVisual = styled.div`
  position: relative;
  height: 500px;
  border-radius: ${luxuryTheme.borderRadius.xl};
  overflow: hidden;
`;

const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1rem;
  height: 100%;
`;

const GalleryImage = styled(motion.div)<{ bgImage: string }>`
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  border-radius: ${luxuryTheme.borderRadius.lg};
  position: relative;
  overflow: hidden;
  
  &::after {
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
  }
  
  &:hover::after {
    opacity: 1;
  }
  
  &:first-child {
    grid-row: 1 / 3;
  }
`;

const ValueSection = styled.div`
  margin-bottom: 8rem;
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const ValueCard = styled(GlassCard)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${luxuryTheme.gradients.goldNavy};
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }
  
  &:hover::before {
    transform: translateX(0);
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    background: rgba(255, 255, 255, 0.12);
    border-color: rgba(212, 175, 55, 0.3);
  }
`;

const ValueIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${luxuryTheme.gradients.goldNavy};
  border-radius: ${luxuryTheme.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  margin: 0 auto 2rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: ${luxuryTheme.gradients.goldNavy};
    border-radius: inherit;
    z-index: -1;
    filter: blur(10px);
    opacity: 0.6;
  }
`;

const ValueTitle = styled.h3`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.white};
  font-size: 1.5rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  margin-bottom: 1.5rem;
`;

const ValueDescription = styled.p`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin-bottom: 2rem;
`;

const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  margin: 6rem 0;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: ${luxuryTheme.borderRadius.xl};
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${luxuryTheme.gradients.goldNavy};
    transform: translateX(-100%);
    transition: transform 0.8s ease;
  }
  
  &:hover::before {
    transform: translateX(0);
  }
`;

const StatNumber = styled.div`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.gold.primary};
  font-size: 3rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  margin-bottom: 1rem;
  line-height: 1;
`;

const StatLabel = styled.div`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  font-weight: ${luxuryTheme.typography.weights.medium};
`;

const StatDescription = styled.div`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.8rem;
  margin-top: 0.5rem;
  line-height: 1.4;
`;

const TeamSection = styled.div`
  margin-bottom: 6rem;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const TeamCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: ${luxuryTheme.borderRadius.xl};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  
  &:hover {
    transform: translateY(-15px) scale(1.03);
    border-color: rgba(212, 175, 55, 0.4);
  }
`;

const TeamImage = styled.div<{ bgImage: string }>`
  width: 100%;
  height: 250px;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(27, 54, 93, 0.8) 100%
    );
  }
`;

const TeamInfo = styled.div`
  padding: 2rem;
  text-align: center;
`;

const TeamName = styled.h4`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${luxuryTheme.colors.white};
  font-size: 1.3rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  margin-bottom: 0.5rem;
`;

const TeamRole = styled.div`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: ${luxuryTheme.colors.gold.primary};
  font-size: 0.9rem;
  font-weight: ${luxuryTheme.typography.weights.medium};
  margin-bottom: 1rem;
`;

const TeamBio = styled.p`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  line-height: 1.6;
`;

// Enhanced data
const coreValues = [
  {
    icon: '🏆',
    title: 'Excellence',
    description: 'We pursue perfection in every aspect of training, from our world-class facilities to our championship-winning instructors.'
  },
  {
    icon: '💎',
    title: 'Luxury',
    description: 'Experience unparalleled comfort and sophistication in our premium amenities and personalized service approach.'
  },
  {
    icon: '🤝',
    title: 'Partnership',
    description: 'Building lasting relationships between riders, horses, and trainers through trust, respect, and shared passion.'
  },
  {
    icon: '🎯',
    title: 'Innovation',
    description: 'Embracing cutting-edge training techniques and technology to enhance the equestrian learning experience.'
  }
];

const detailedStats = [
  {
    number: '25+',
    label: 'Years of Excellence',
    description: 'Decades of proven training success'
  },
  {
    number: '750+',
    label: 'Champions Trained',
    description: 'Riders who achieved their dreams'
  },
  {
    number: '85+',
    label: 'Premium Horses',
    description: 'Elite bloodlines and temperaments'
  },
  {
    number: '15+',
    label: 'Master Trainers',
    description: 'Olympic and international experience'
  }
];

const teamMembers = [
  {
    name: 'Victoria Sterling',
    role: 'Head of Training',
    bio: 'Olympic gold medalist with 20+ years of international competition experience.',
    image: 'https://images.unsplash.com/photo-1494790108755-2616c90e9d54?w=300&h=300&fit=crop'
  },
  {
    name: 'James Wellington',
    role: 'Master Instructor',
    bio: 'Former British Equestrian Team captain specializing in dressage and show jumping.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop'
  },
  {
    name: 'Sarah Blackwood',
    role: 'Youth Program Director',
    bio: 'Dedicated to nurturing the next generation of equestrian champions.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop'
  }
];

export const EnhancedAboutSection: React.FC = () => {
  const { ref: containerRef, inView } = useOptimizedReveal();
  const statsRef = useRef<HTMLDivElement>(null);
  const [countersAnimated, setCountersAnimated] = useState(false);
  
  usePerformantScroll();

  useEffect(() => {
    if (inView && statsRef.current && !countersAnimated) {
      const statNumbers = statsRef.current.querySelectorAll('.stat-number');
      
      statNumbers.forEach((element, index) => {
        const target = parseInt(element.textContent?.replace(/[^0-9]/g, '') || '0');
        const duration = 2;
        
        gsap.fromTo(element, 
          { textContent: 0 },
          {
            textContent: target,
            duration: duration,
            delay: index * 0.2,
            ease: "power2.out",
            snap: { textContent: 1 },
            onUpdate: function() {
              const current = Math.round(this.targets()[0].textContent);
              const suffix = detailedStats[index].number.replace(/[0-9]/g, '');
              element.textContent = current + suffix;
            }
          }
        );
      });
      
      setCountersAnimated(true);
    }
  }, [inView, countersAnimated]);

  return (
    <AboutContainer ref={containerRef as any} id="about-section">
      <AboutContent>
        {/* Introduction Section */}
        <IntroSection>
          <IntroText>
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <SectionTitle size="xl">
                Legacy of Excellence
              </SectionTitle>
            </motion.div>
            
            <IntroDescription
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p>
                For over two decades, our equestrian center has stood as a beacon of excellence 
                in the world of premium horse training. Founded by Olympic champions and nurtured 
                by passion, we've created a sanctuary where both horses and riders achieve their 
                highest potential.
              </p>
              <p>
                Our state-of-the-art facilities span 200 acres of pristine countryside, featuring 
                world-class indoor and outdoor arenas, luxury stabling, and specialized training 
                areas designed for every discipline from dressage to show jumping.
              </p>
            </IntroDescription>

            <FounderQuote
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Excellence is not a skill, it's an attitude. We instill this philosophy 
              in every rider who walks through our gates.
              <FounderInfo>
                <div className="name">Victoria Sterling</div>
                <div className="title">Founder & Head Trainer</div>
              </FounderInfo>
            </FounderQuote>
          </IntroText>

          <IntroVisual>
            <ImageGallery>
              <GalleryImage
                bgImage="https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&h=800&fit=crop"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <GalleryImage
                bgImage="https://images.unsplash.com/photo-1596797882870-8c33dfe6e313?w=300&h=300&fit=crop"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
              <GalleryImage
                bgImage="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=300&h=300&fit=crop"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              />
            </ImageGallery>
          </IntroVisual>
        </IntroSection>

        {/* Statistics Section */}
        <StatsSection ref={statsRef}>
          {detailedStats.map((stat, index) => (
            <StatItem
              key={index}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={inView ? { 
                opacity: 1, 
                y: 0, 
                scale: 1 
              } : { 
                opacity: 0, 
                y: 40, 
                scale: 0.9 
              }}
              transition={{ duration: 0.8, delay: 0.8 + (index * 0.1) }}
              whileHover={{ y: -10, scale: 1.05 }}
            >
              <StatNumber className="stat-number">{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
              <StatDescription>{stat.description}</StatDescription>
            </StatItem>
          ))}
        </StatsSection>

        {/* Core Values Section */}
        <ValueSection>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1, delay: 1.2 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <SectionTitle size="lg" style={{ textAlign: 'center' }}>
              Our Core Values
            </SectionTitle>
            <motion.p
              style={{
                fontFamily: luxuryTheme.typography.fonts.primary,
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.1rem',
                maxWidth: '600px',
                margin: '2rem auto 0',
                lineHeight: '1.6'
              }}
            >
              These fundamental principles guide every decision we make and every 
              relationship we build in our equestrian community.
            </motion.p>
          </motion.div>

          <ValuesGrid>
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                animate={inView ? { 
                  opacity: 1, 
                  y: 0, 
                  rotateY: 0 
                } : { 
                  opacity: 0, 
                  y: 50, 
                  rotateY: -15 
                }}
                transition={{ 
                  duration: 1, 
                  delay: 1.4 + (index * 0.2),
                  ease: "backOut"
                }}
              >
                <ValueCard
                  as={motion.div}
                  whileHover={{ 
                    y: -15, 
                    scale: 1.03,
                    rotateY: 5,
                    transition: { duration: 0.4 }
                  }}
                >
                  <ValueIcon>{value.icon}</ValueIcon>
                  <ValueTitle>{value.title}</ValueTitle>
                  <ValueDescription>{value.description}</ValueDescription>
                </ValueCard>
              </motion.div>
            ))}
          </ValuesGrid>
        </ValueSection>

        {/* Team Section */}
        <TeamSection>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 1, delay: 1.8 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <SectionTitle size="lg" style={{ textAlign: 'center' }}>
              Meet Our Masters
            </SectionTitle>
            <motion.p
              style={{
                fontFamily: luxuryTheme.typography.fonts.primary,
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '1.1rem',
                maxWidth: '600px',
                margin: '2rem auto 0',
                lineHeight: '1.6'
              }}
            >
              Our world-renowned team brings decades of championship experience 
              and Olympic-level expertise to every training session.
            </motion.p>
          </motion.div>

          <TeamGrid>
            {teamMembers.map((member, index) => (
              <TeamCard
                key={index}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={inView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1 
                } : { 
                  opacity: 0, 
                  y: 60, 
                  scale: 0.9 
                }}
                transition={{ 
                  duration: 1, 
                  delay: 2 + (index * 0.2),
                  ease: "backOut"
                }}
                whileHover={{ 
                  y: -20, 
                  scale: 1.05,
                  transition: { duration: 0.4 }
                }}
              >
                <TeamImage bgImage={member.image} />
                <TeamInfo>
                  <TeamName>{member.name}</TeamName>
                  <TeamRole>{member.role}</TeamRole>
                  <TeamBio>{member.bio}</TeamBio>
                </TeamInfo>
              </TeamCard>
            ))}
          </TeamGrid>
        </TeamSection>
      </AboutContent>
    </AboutContainer>
  );
};
