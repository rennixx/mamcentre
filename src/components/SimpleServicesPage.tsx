import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f8f9fa;
`;

const HeroSection = styled.section`
  position: relative;
  color: white;
  padding: 8rem 2rem 6rem;
  text-align: center;
  overflow: hidden;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (min-width: 768px) {
    padding: 10rem 4rem 8rem;
    min-height: 90vh;
  }
  
  @media (min-width: 1200px) {
    padding: 12rem 6rem 10rem;
    min-height: 95vh;
  }
`;

const HeroVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: brightness(1.1) contrast(1.1) saturate(1.2);
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-shadow: 3px 3px 12px rgba(0, 0, 0, 0.9), 1px 1px 20px rgba(0, 0, 0, 0.7);
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  opacity: 0.95;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.8), 1px 1px 15px rgba(0, 0, 0, 0.6);
`;

const ServicesSection = styled.section`
  padding: 6rem 2rem;
  
  @media (min-width: 768px) {
    padding: 8rem 4rem;
  }
`;

const ServicesGrid = styled.div`
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
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 3rem 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #D4AF37, #B8941F);
    transition: all 0.5s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 60px rgba(27, 54, 93, 0.15);
    border-color: #D4AF37;
    
    &::before {
      left: 0;
    }
  }
    border-color: #D4AF37;
  }
`;

const ServiceIcon = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  color: #1B365D;
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;
`;

const ServiceDescription = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
`;

const FeatureItem = styled.li`
  color: #555;
  padding: 0.5rem 0;
  position: relative;
  padding-left: 1.5rem;
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #D4AF37;
    font-weight: bold;
  }
`;

const ServicePrice = styled.div`
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  color: #1B365D;
  margin-top: 1rem;
`;

const ContactButton = styled.button`
  width: 100%;
  background: #D4AF37;
  color: #1B365D;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  
  &:hover {
    background: #B8941F;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #1B365D;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: bold;
  
  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export const SimpleServicesPage: React.FC = () => {
  const services = [
    {
      icon: <span style={{fontSize: '2.5rem', color: '#D4AF37'}}>🐎</span>,
      title: "Professional Riding Lessons",
      description: "Expert instruction for all ages and skill levels. Our certified instructors provide personalized training in a safe, supportive environment with Lebanon's finest horses.",
      features: [
        "Beginner to advanced programs",
        "Individual & group lessons available",
        "Certified professional instructors",
        "Focus on safety & proper technique",
        "Programs for children, teens & adults"
      ],
      price: "From $50 per lesson"
    },
    {
      icon: <span style={{fontSize: '2.5rem', color: '#D4AF37'}}>🏆</span>,
      title: "Championship Show Jumping",
      description: "Elite training for competitive riders. Develop your jumping skills with our competition-grade horses and facilities, preparing you for regional and national events.",
      features: [
        "Competition preparation courses",
        "Professional jumping horses",
        "Advanced technique refinement", 
        "Show circuit preparation",
        "Performance coaching & mentorship"
      ],
      price: "Premium training rates - Contact us"
    },
    {
      icon: <span style={{fontSize: '2.5rem', color: '#D4AF37'}}>🏠</span>,
      title: "Luxury Event Hosting",
      description: "Transform our stunning stable facilities into your perfect venue. Whether corporate events, celebrations, or private gatherings, we provide a unique countryside experience.",
      features: [
        "Corporate retreat packages",
        "Wedding & celebration venues",
        "Private party hosting",
        "Catering services available",
        "Scenic countryside setting"
      ],
      price: "Event packages from $200/day"
    },
    {
      icon: <span style={{fontSize: '2.5rem', color: '#D4AF37'}}>☕</span>,
      title: "Baran Coffee Experience",
      description: "Our signature café offers artisanal Lebanese coffee, international blends, fresh pastries, and light meals in a unique stable-side atmosphere.",
      features: [
        "Artisanal Lebanese & international coffee",
        "Fresh pastries & traditional sweets",
        "Light meals & healthy options", 
        "Scenic outdoor seating",
        "Perfect for meetings & relaxation"
      ],
      price: "Café menu: $3-15 per item"
    },
    {
      icon: <span style={{fontSize: '2.5rem', color: '#D4AF37'}}>🤝</span>,
      title: "Horsemanship & Care Training",
      description: "Learn the art of horse care, handling, and communication. Develop a deeper connection with horses through professional horsemanship education.",
      features: [
        "Horse behavior & psychology",
        "Proper grooming techniques",
        "Safety protocols & handling",
        "Stable management skills",
        "Hands-on practical experience"
      ],
      price: "Specialized courses - Contact for rates"
    },
    {
      icon: <span style={{fontSize: '2.5rem', color: '#D4AF37'}}>👥</span>,
      title: "Community & Social Programs",
      description: "Join our vibrant equestrian community through social rides, workshops, and events. Connect with fellow horse enthusiasts in Lebanon's most welcoming stable environment.",
      features: [
        "Monthly community rides",
        "Educational workshops & clinics",
        "Family-friendly events",
        "Networking opportunities",
        "Horseback trail adventures"
      ],
      price: "Community events: Free-$25"
    }
  ];

  return (
    <Container>
      <HeroSection>
        <HeroVideo autoPlay muted loop playsInline>
          <source src={require('../assets/IMG_2711.MP4')} type="video/mp4" />
          <source src={require('../assets/IMG_4270.MP4')} type="video/mp4" />
          <source src={require('../assets/IMG_3117.MOV')} type="video/quicktime" />
        </HeroVideo>
        <HeroOverlay />
        <HeroContent>
          <HeroTitle>Mam Center Services</HeroTitle>
          <HeroSubtitle>
            Discover our world-class equestrian programs, from beginner riding lessons to championship training, plus our unique Baran Coffee experience.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      <ServicesSection>
        <SectionTitle>What We Offer</SectionTitle>
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <FeaturesList>
                {service.features.map((feature, featureIndex) => (
                  <FeatureItem key={featureIndex}>{feature}</FeatureItem>
                ))}
              </FeaturesList>
              <ServicePrice>{service.price}</ServicePrice>
              <ContactButton onClick={() => window.location.href = '#/contact'}>
                Get More Information
              </ContactButton>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesSection>
    </Container>
  );
};