import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface SimpleFooterProps {
  className?: string;
}

const FooterContainer = styled.footer`
  background: #1B365D;
  color: white;
  padding: 3rem 2rem 2rem;
  margin-top: auto;
  
  @media (min-width: 768px) {
    padding: 4rem 4rem 3rem;
  }

  @media (min-width: 1200px) {
    padding: 5rem 6rem 3rem;
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 3rem;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 4rem;
  }
`;

const FooterSection = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: bold;
    color: #D4AF37;
    margin-bottom: 1rem;
  }

  p, li {
    line-height: 1.6;
    margin-bottom: 0.5rem;

    a {
      color: white;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: #D4AF37;
      }
    }
  }

  ul {
    list-style: none;
    padding: 0;
  }
`;

const ContactInfo = styled.div`
  p {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.75rem;
    
    svg {
      color: #D4AF37;
      min-width: 16px;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
  }
`;

const Copyright = styled.p`
  margin: 0;
  opacity: 0.8;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const SocialIcon = styled.a`
  color: white;
  font-size: 1.8rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
  
  &.instagram:hover {
    background: linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D);
    color: white;
  }
  
  &.facebook:hover {
    background: #1877F2;
    color: white;
  }
  
  &.tiktok:hover {
    background: #000;
    color: white;
  }

  &:hover {
    color: #D4AF37;
    background: rgba(212, 175, 55, 0.2);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
  }
`;

export const SimpleFooter: React.FC<SimpleFooterProps> = ({ className }) => {
  return (
    <FooterContainer className={className}>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>Mam Center</h3>
            <p>Lebanon's premier equestrian center where champions are made and dreams take flight. Experience world-class horse training and our unique Baran Coffee atmosphere.</p>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/booking">Book Now</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Our Specialties</h3>
            <ul>
              <li>Professional Riding Lessons</li>
              <li>Championship Show Jumping</li>
              <li>Luxury Event Hosting</li>
              <li>Baran Coffee Experience</li>
              <li>Horsemanship Training</li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <p><span style={{color: '#D4AF37', marginRight: '8px'}}>📍</span> Mam Center Equestrian Facility<br />Countryside Location, Lebanon</p>
              <p><span style={{color: '#D4AF37', marginRight: '8px'}}>📞</span> +961 XX XXX XXX</p>
              <p><span style={{color: '#D4AF37', marginRight: '8px'}}>✉️</span> info@mamcenter.com</p>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <Copyright>
            © 2025 Mam Center. All rights reserved. | Proudly serving Lebanon's equestrian community
          </Copyright>
          <SocialLinks>
            <SocialIcon 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="instagram"
            >
              <span style={{fontSize: '1.4rem'}}>📷</span>
            </SocialIcon>
            <SocialIcon 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="facebook"
            >
              <span style={{fontSize: '1.4rem'}}>📘</span>
            </SocialIcon>
            <SocialIcon 
              href="https://tiktok.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="tiktok"
            >
              <span style={{fontSize: '1.4rem'}}>🎵</span>
            </SocialIcon>
          </SocialLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};