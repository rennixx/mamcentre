import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { luxuryTheme } from '../../constants/luxuryTheme';

interface LuxuryFooterProps {
  className?: string;
}

const FooterContainer = styled.footer`
  background-color: ${luxuryTheme.colors.primary.navy};
  color: ${luxuryTheme.colors.white};
  padding: 4rem 0 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (min-width: ${luxuryTheme.breakpoints.tablet}) {
    padding: 0 4rem;
  }
  
  @media (min-width: ${luxuryTheme.breakpoints.desktop}) {
    padding: 0 6rem;
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (min-width: ${luxuryTheme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }
  
  @media (min-width: ${luxuryTheme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
    gap: 4rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-family: ${luxuryTheme.typography.fonts.luxury};
    font-size: 1.25rem;
    font-weight: ${luxuryTheme.typography.weights.bold};
    color: ${luxuryTheme.colors.gold.primary};
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
      
      a {
        color: ${luxuryTheme.colors.white};
        text-decoration: none;
        transition: color 0.3s ease;
        
        &:hover {
          color: ${luxuryTheme.colors.gold.primary};
        }
      }
    }
  }
  
  p {
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;
  
  @media (min-width: ${luxuryTheme.breakpoints.tablet}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  
  @media (min-width: ${luxuryTheme.breakpoints.tablet}) {
    margin-top: 0;
  }
  
  a {
    color: ${luxuryTheme.colors.white};
    font-size: 1.5rem;
    transition: color 0.3s ease;
    
    &:hover {
      color: ${luxuryTheme.colors.gold.primary};
    }
  }
`;

export const LuxuryFooter: React.FC<LuxuryFooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer className={className}>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>mCenter Equestrian</h3>
            <p>Premium equestrian services and training facilities.</p>
            <p>Experience the art of horsemanship with our world-class facilities and expert instruction.</p>
          </FooterSection>
          
          <FooterSection>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Services</h3>
            <ul>
              <li><Link to="/services">Riding Lessons</Link></li>
              <li><Link to="/services">Competition Training</Link></li>
              <li><Link to="/services">Horse Care</Link></li>
              <li><Link to="/services">Therapeutic Riding</Link></li>
              <li><Link to="/booking">Book Now</Link></li>
            </ul>
          </FooterSection>
          
          <FooterSection>
            <h3>Contact Info</h3>
            <p>📍 123 Equestrian Way<br />Horse Valley, HV 12345</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ info@mcenter.com</p>
          </FooterSection>
        </FooterGrid>
        
        <FooterBottom>
          <p>&copy; {currentYear} mCenter Equestrian. All rights reserved.</p>
          <SocialLinks>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">📘</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📷</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">🐦</a>
          </SocialLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};
