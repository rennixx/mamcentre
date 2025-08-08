import React from 'react';
import styled from 'styled-components';

const ServicesContainer = styled.div`
  min-height: 100vh;
  background: #1B365D;
  padding: 4rem 2rem;
  color: #FFFFFF;
`;

const ServicesContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const ServicesTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #D4AF37;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const ServiceCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #D4AF37;
`;

const ServiceDescription = styled.p`
  line-height: 1.6;
  color: #FFFFFF;
`;

export const SimpleServicesPage: React.FC = () => {
  const services = [
    {
      title: "Horse Training",
      description: "Professional training programs for horses of all levels, from basic ground work to advanced competitive training."
    },
    {
      title: "Riding Lessons",
      description: "Expert riding instruction for beginners to advanced riders in our state-of-the-art facilities."
    },
    {
      title: "Horse Boarding",
      description: "Premium boarding services with spacious stalls, daily turnout, and personalized care for your horse."
    },
    {
      title: "Competition Preparation",
      description: "Specialized training and preparation for horse shows and competitions at all levels."
    }
  ];

  return (
    <ServicesContainer>
      <ServicesContent>
        <ServicesTitle>Our Services</ServicesTitle>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Discover our comprehensive range of equestrian services designed to meet all your horse-related needs.
        </p>
        
        <ServicesGrid>
          {services.map((service, index) => (
            <ServiceCard key={index}>
              <ServiceTitle>{service.title}</ServiceTitle>
              <ServiceDescription>{service.description}</ServiceDescription>
            </ServiceCard>
          ))}
        </ServicesGrid>
      </ServicesContent>
    </ServicesContainer>
  );
};
