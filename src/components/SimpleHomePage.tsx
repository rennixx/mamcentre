import React from 'react';
import styled from 'styled-components';

const SimpleHeroContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    #1B365D 0%,
    #1A2332 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: #FFFFFF;
  text-align: center;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  margin-bottom: 1.5rem;
  color: #FFFFFF;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #D4AF37;
`;

const CTAButton = styled.button`
  background: #D4AF37;
  color: #1B365D;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #E5C659;
    transform: translateY(-2px);
  }
`;

export const SimpleHomePage: React.FC = () => {
  return (
    <SimpleHeroContainer>
      <HeroContent>
        <HeroTitle>Welcome to Mam Center</HeroTitle>
        <HeroSubtitle>Premium Equestrian Excellence</HeroSubtitle>
        <CTAButton>Explore Our Services</CTAButton>
      </HeroContent>
    </SimpleHeroContainer>
  );
};
