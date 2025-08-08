import React from 'react';
import styled from 'styled-components';

const ServicesContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #1B365D 0%,
    #2A4A6B 50%,
    #1A2332 100%
  );
  padding: 6rem 2rem 4rem;
  color: #FFFFFF;
  position: relative;
  
  @media (min-width: 1440px) {
    padding: 8rem 4rem 6rem;
  }
  
  @media (min-width: 1920px) {
    padding: 10rem 5rem 8rem;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 30% 20%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ServicesContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
  
  @media (min-width: 1440px) {
    max-width: 1600px;
  }
  
  @media (min-width: 1920px) {
    max-width: 1800px;
  }
`;

const ServicesTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  color: #D4AF37;
  font-weight: 700;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (min-width: 1440px) {
    font-size: 4rem;
  }
  
  @media (min-width: 1920px) {
    font-size: 4.5rem;
  }
`;

const ServicesSubtitle = styled.p`
  font-size: 1.3rem;
  margin-bottom: 4rem;
  color: #FFFFFF;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
  
  @media (min-width: 1440px) {
    font-size: 1.4rem;
    max-width: 700px;
  }
  
  @media (min-width: 1920px) {
    font-size: 1.5rem;
    max-width: 800px;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1440px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
  
  @media (min-width: 1920px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 3.5rem;
  }
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 3rem 2rem;
  border-radius: 20px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.4s ease;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-10px);
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(212, 175, 55, 0.3);
    
    &::before {
      left: 100%;
    }
  }
`;

const ServiceIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
`;

const ServiceTitle = styled.h3`
  font-size: 1.6rem;
  margin-bottom: 1.2rem;
  color: #D4AF37;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
`;

const ServiceDescription = styled.p`
  line-height: 1.7;
  color: #FFFFFF;
  margin-bottom: 1.5rem;
`;

const ServiceFeatures = styled.ul`
  list-style: none;
  padding: 0;
  text-align: left;
  margin-bottom: 2rem;
`;

const ServiceFeature = styled.li`
  padding: 0.5rem 0;
  color: #FFFFFF;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #D4AF37;
    font-weight: bold;
  }
`;

const PriceTag = styled.div`
  background: linear-gradient(135deg, #D4AF37 0%, #E5C659 100%);
  color: #1B365D;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  font-size: 1.1rem;
  margin-top: 1rem;
  display: inline-block;
`;

export const SimpleServicesPage: React.FC = () => {
  const services = [
    {
      icon: "🐎",
      title: "Horse Training",
      description: "Comprehensive training programs tailored to each horse's individual needs and potential.",
      features: [
        "Basic ground work and handling",
        "Advanced performance training",
        "Behavioral correction",
        "Competition preparation"
      ],
      price: "Starting from $150/session"
    },
    {
      icon: "🏇",
      title: "Riding Lessons",
      description: "Expert riding instruction for all skill levels in a safe and supportive environment.",
      features: [
        "Beginner to advanced levels",
        "English and Western styles",
        "Individual or group lessons",
        "Safety-focused approach"
      ],
      price: "Starting from $80/lesson"
    },
    {
      icon: "🏡",
      title: "Horse Boarding",
      description: "Premium boarding services with personalized care and attention for your horse.",
      features: [
        "Spacious stalls and turnouts",
        "Daily feeding and care",
        "24/7 monitoring",
        "Exercise programs"
      ],
      price: "Starting from $400/month"
    },
    {
      icon: "🏆",
      title: "Competition Prep",
      description: "Specialized training and preparation for horse shows and competitive events.",
      features: [
        "Show jumping preparation",
        "Dressage training",
        "Competition strategy",
        "Performance optimization"
      ],
      price: "Starting from $200/session"
    },
    {
      icon: "🩺",
      title: "Health & Wellness",
      description: "Comprehensive health monitoring and wellness programs for optimal horse care.",
      features: [
        "Regular health checkups",
        "Nutrition planning",
        "Fitness assessments",
        "Preventive care"
      ],
      price: "Starting from $100/visit"
    },
    {
      icon: "🎓",
      title: "Clinics & Workshops",
      description: "Educational programs and specialized clinics to enhance your equestrian knowledge.",
      features: [
        "Guest instructor clinics",
        "Horsemanship workshops",
        "Safety training",
        "Certification programs"
      ],
      price: "Starting from $120/clinic"
    }
  ];

  return (
    <ServicesContainer>
      <ServicesContent>
        <ServicesTitle>Our Premium Services</ServicesTitle>
        <ServicesSubtitle>
          Discover our comprehensive range of professional equestrian services, 
          designed to meet every aspect of your horse-related needs with excellence and care.
        </ServicesSubtitle>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceIcon>{service.icon}</ServiceIcon>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
              <ServiceFeatures>
                {service.features.map((feature, idx) => (
                  <ServiceFeature key={idx}>{feature}</ServiceFeature>
                ))}
              </ServiceFeatures>
              <PriceTag>{service.price}</PriceTag>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesContent>
    </ServicesContainer>
  );
};
