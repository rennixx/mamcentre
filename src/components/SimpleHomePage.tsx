import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
`;

const BackgroundVideo = styled.video`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  z-index: -1;
  filter: brightness(1.1) contrast(1.1) saturate(1.2);
`;

const PageContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  background: transparent;
`;

const HeroSection = styled.section`
  position: relative;
  color: white;
  padding: 8rem 2rem 6rem;
  text-align: center;
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  margin-bottom: 0;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -40px;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.5) 0%,
      rgba(0, 0, 0, 0.4) 15%,
      rgba(0, 0, 0, 0.3) 25%,
      rgba(0, 0, 0, 0.2) 35%,
      rgba(0, 0, 0, 0.1) 45%,
      rgba(0, 0, 0, 0.1) 55%,
      rgba(0, 0, 0, 0.2) 65%,
      rgba(0, 0, 0, 0.3) 75%,
      rgba(0, 0, 0, 0.4) 85%,
      rgba(0, 0, 0, 0.5) 100%
    );
    filter: blur(3px);
    z-index: -1;
  }

  @media (min-width: 768px) {
    padding: 10rem 4rem 8rem;
  }

  @media (min-width: 1200px) {
    padding: 12rem 6rem 10rem;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (min-width: 1440px) {
    max-width: 1600px;
  }
  
  @media (min-width: 1920px) {
    max-width: 1800px;
  }
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.9), 1px 1px 20px rgba(0, 0, 0, 0.7);
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }

  @media (min-width: 1200px) {
    font-size: 5rem;
  }
  
  @media (min-width: 1440px) {
    font-size: 5.5rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 6rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 15px rgba(0, 0, 0, 0.6);

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
  
  @media (min-width: 1440px) {
    font-size: 1.6rem;
    max-width: 1000px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.75rem;
    max-width: 1200px;
  }
`;

const AboutSection = styled.section`
  padding: 6rem 2rem;
  background: transparent;
  position: relative;
  margin: 0;
  border: none;
  
  &::before {
    content: '';
    position: absolute;
    top: -40px;
    left: 0;
    right: 0;
    height: 80px;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 20%,
      rgba(0, 0, 0, 0.2) 30%,
      rgba(0, 0, 0, 0.3) 40%,
      rgba(0, 0, 0, 0.4) 50%,
      rgba(0, 0, 0, 0.3) 60%,
      rgba(0, 0, 0, 0.2) 70%,
      rgba(0, 0, 0, 0.1) 80%,
      rgba(0, 0, 0, 0) 100%
    );
    filter: blur(1.5px);
    z-index: 0;
  }
  
  @media (min-width: 768px) {
    padding: 8rem 4rem;
  }
`;

const AboutContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
  
  @media (min-width: 1440px) {
    max-width: 1600px;
  }
  
  @media (min-width: 1920px) {
    max-width: 1800px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 2rem;
  font-weight: bold;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.9), 1px 1px 20px rgba(0, 0, 0, 0.7);

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const AboutText = styled.p`
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.8;
  max-width: 900px;
  margin: 0 auto 3rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 15px rgba(0, 0, 0, 0.6);
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (min-width: 1440px) {
    font-size: 1.3rem;
    max-width: 1000px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.4rem;
    max-width: 1200px;
  }
`;

const FeaturesSection = styled.section`
  padding: 6rem 2rem;
  background: transparent;
  position: relative;
  margin: 0;
  border: none;
  
  @media (min-width: 768px) {
    padding: 8rem 4rem;
  }
`;

const FeaturesGrid = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 4rem;
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
  }
  
  @media (min-width: 1440px) {
    max-width: 1600px;
    gap: 4rem;
  }
  
  @media (min-width: 1920px) {
    max-width: 1800px;
    gap: 5rem;
  }
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-8px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    border-color: rgba(212, 175, 55, 0.5);
  }
`;

const FeatureIcon = styled.div`
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  color: #ffffff;
  margin-bottom: 1rem;
  font-weight: bold;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 15px rgba(0, 0, 0, 0.6);
`;

const FeatureDescription = styled.p`
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  text-shadow: 1px 1px 6px rgba(0, 0, 0, 0.7), 1px 1px 10px rgba(0, 0, 0, 0.5);
`;

const CallToActionSection = styled.section`
  background: transparent;
  color: white;
  padding: 6rem 2rem;
  text-align: center;
  position: relative;
  margin: 0;
  border: none;
  
  @media (min-width: 768px) {
    padding: 8rem 4rem;
  }
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.9), 1px 1px 20px rgba(0, 0, 0, 0.7);

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.25rem;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.95;
  line-height: 1.6;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 15px rgba(0, 0, 0, 0.6);
`;

const CTAButton = styled.button`
  background: #D4AF37;
  color: #1B365D;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.125rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    background: #B8941F;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
  }
`;

export const SimpleHomePage: React.FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  React.useEffect(() => {
    const video = videoRef.current;
    if (video) {
      console.log('Video element found, attempting to play...');
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  const features = [
    {
      icon: <span style={{fontSize: '2rem', color: '#D4AF37'}}>🐎</span>,
      title: "Professional Horse Riding",
      description: "Expert instruction for all levels - from complete beginners to advanced riders. Our certified trainers provide personalized lessons focusing on safety, technique, and confidence building."
    },
    {
      icon: <span style={{fontSize: '2rem', color: '#D4AF37'}}>🏆</span>,
      title: "Championship Show Jumping",
      description: "Elite show jumping training with competition-grade facilities. We prepare riders for regional and national competitions with professional coaching and top-tier horses."
    },
    {
      icon: <span style={{fontSize: '2rem', color: '#D4AF37'}}>🏠</span>,
      title: "Premium Stable Rentals", 
      description: "Luxury event hosting at our pristine stables. Perfect for corporate events, private celebrations, and special gatherings with full-service amenities and catering options."
    },
    {
      icon: <span style={{fontSize: '2rem', color: '#D4AF37'}}>☕</span>,
      title: "Baran Coffee Experience",
      description: "Our signature café offers artisanal coffee, fresh pastries, and light meals in a unique stable-side setting. The perfect spot to relax and connect with fellow equestrian enthusiasts."
    }
  ];

  return (
    <Container>
      <BackgroundVideo 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
      >
        <source src={require('../assets/IMG_2349.MP4')} type="video/mp4" />
        <source src={require('../assets/IMG_2711.MP4')} type="video/mp4" />
        <source src={require('../assets/IMG_4270.MP4')} type="video/mp4" />
      </BackgroundVideo>
      
      <PageContent>
        <HeroSection>
          <HeroContent>
            <HeroTitle>Welcome to Mam Center</HeroTitle>
            <HeroSubtitle>
              Professional Equestrian Excellence in the Heart of Nature - Where Champions Are Made and Dreams Take Flight
            </HeroSubtitle>
          </HeroContent>
        </HeroSection>

        <AboutSection>
          <AboutContent>
            <SectionTitle>About Mam Center</SectionTitle>
            <AboutText>
              Mam center is a private equestrian club that provides services to horse lovers, including horse riding and show jumping courses for women, men and children of all kinds, and how to properly deal with horses with high professionalism and creating a social environment for horse lovers, their families and friends.
            </AboutText>
          </AboutContent>
        </AboutSection>

        <FeaturesSection>
          <AboutContent>
            <SectionTitle>Our Services</SectionTitle>
            <FeaturesGrid>
            {features.map((feature, index) => (
              <FeatureCard key={index}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </AboutContent>
      </FeaturesSection>

      <CallToActionSection>
        <CTATitle>Ready to Begin Your Journey?</CTATitle>
        <CTADescription>
          Join our community and discover the joy of horse riding in a safe, professional, and welcoming environment.
        </CTADescription>
        <CTAButton onClick={() => window.location.href = '#/booking'}>
          Book Your Experience
        </CTAButton>
      </CallToActionSection>
      </PageContent>
    </Container>
  );
};