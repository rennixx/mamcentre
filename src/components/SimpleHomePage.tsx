import React from 'react';
import styled from 'styled-components';

const HomePageContainer = styled.div`
  background: #1B365D;
  color: #FFFFFF;
`;

const SimpleHeroContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #1B365D 0%,
    #2A4A6B 50%,
    #1A2332 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const HeroContent = styled.div`
  max-width: 800px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
  font-weight: 700;
  line-height: 1.2;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 3rem;
  color: #D4AF37;
  font-weight: 400;
  line-height: 1.4;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #D4AF37 0%, #E5C659 100%);
  color: #1B365D;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
  
  &:hover {
    background: linear-gradient(135deg, #E5C659 0%, #D4AF37 100%);
    transform: translateY(-3px);
    box-shadow: 0 12px 35px rgba(212, 175, 55, 0.4);
  }
`;

// About Section
const AboutSection = styled.section`
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
  
  @media (min-width: 1440px) {
    max-width: 1600px;
    padding: 8rem 4rem;
  }
  
  @media (min-width: 1920px) {
    max-width: 1800px;
    padding: 10rem 5rem;
  }
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  color: #D4AF37;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
  
  @media (min-width: 1440px) {
    font-size: 3.5rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 4rem;
  }
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  
  @media (min-width: 1440px) {
    font-size: 1.3rem;
    max-width: 900px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.4rem;
    max-width: 1000px;
  }
`;

// Features Section
const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: rgba(255, 255, 255, 0.03);
  
  @media (min-width: 1440px) {
    padding: 8rem 4rem;
  }
  
  @media (min-width: 1920px) {
    padding: 10rem 5rem;
  }
`;

const FeaturesGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  
  @media (min-width: 1440px) {
    max-width: 1600px;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2.5rem;
  }
  
  @media (min-width: 1920px) {
    max-width: 1800px;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
  }
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.08);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.12);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #D4AF37;
  margin-bottom: 1rem;
  font-family: 'Playfair Display', serif;
`;

const FeatureDescription = styled.p`
  line-height: 1.6;
  color: #FFFFFF;
`;

export const SimpleHomePage: React.FC = () => {
  const features = [
    {
      icon: "🐎",
      title: "Expert Horse Training",
      description: "Professional training programs designed to bring out the best in every horse, from basic ground work to advanced performance."
    },
    {
      icon: "🏆",
      title: "Competition Ready",
      description: "Prepare your horse for success in competitions with our specialized training and conditioning programs."
    },
    {
      icon: "🌟",
      title: "Premium Facilities",
      description: "State-of-the-art equestrian facilities with modern amenities and spacious environments for optimal horse care."
    },
    {
      icon: "👨‍🏫",
      title: "Professional Instructors",
      description: "Learn from experienced professionals who are passionate about horses and dedicated to your success."
    }
  ];

  return (
    <HomePageContainer>
      <SimpleHeroContainer>
        <HeroContent>
          <HeroTitle>Welcome to Mam Center</HeroTitle>
          <HeroSubtitle>Premium Equestrian Excellence</HeroSubtitle>
          <CTAButton>Explore Our Services</CTAButton>
        </HeroContent>
      </SimpleHeroContainer>

      <AboutSection>
        <SectionTitle>Excellence in Equestrian Care</SectionTitle>
        <AboutText>
          At Mam Center, we are dedicated to providing the highest standard of equestrian services. 
          Our experienced team combines traditional horsemanship with modern training techniques to 
          ensure both horse and rider achieve their full potential.
        </AboutText>
        <AboutText>
          With years of expertise in horse training, riding instruction, and equestrian facility management, 
          we offer a comprehensive approach to horse care and development.
        </AboutText>
      </AboutSection>

        <FeaturesSection>
        <div style={{ textAlign: 'center', maxWidth: '1400px', margin: '0 auto' }}>
          <SectionTitle>Why Choose Mam Center</SectionTitle>
          <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </div>
      </FeaturesSection>
    </HomePageContainer>
  );
};
