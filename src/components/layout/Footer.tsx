import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { luxuryTheme } from '../../constants/luxuryTheme';

interface FooterProps {
  className?: string;
}

const FooterContainer = styled.footer`
  background-color: ${luxuryTheme.colors.primary.navy};
  color: ${luxuryTheme.colors.white};
  padding: 4rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    padding: 0 ${theme.spacing.lg};
  }
  
  @media (min-width: 1200px) {
    max-width: 1600px;
    padding: 0 ${theme.spacing.xl};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${theme.spacing.xl};
  }
  
  @media (min-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
    gap: ${theme.spacing['2xl']};
  }
`;

const FooterSection = styled.div`
  h3 {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.secondary};
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: ${theme.spacing.sm};
    line-height: ${theme.typography.lineHeight.relaxed};
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin-bottom: ${theme.spacing.sm};
  }
  
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.secondary};
    }
  }
`;

const Logo = styled(Link)`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.secondary};
  text-decoration: none;
  display: block;
  margin-bottom: ${theme.spacing.md};
  
  &:hover {
    color: ${theme.colors.accent};
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${theme.borderRadius.full};
  color: ${theme.colors.secondary};
  text-decoration: none;
  transition: all ${theme.transitions.base};
  
  &:hover {
    background-color: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const ContactInfo = styled.div`
  p {
    display: flex;
    align-items: center;
    gap: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.sm};
    
    svg {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: ${theme.spacing.lg};
  text-align: center;
  
  p {
    color: rgba(255, 255, 255, 0.6);
    font-size: ${theme.typography.fontSize.sm};
  }
`;

const QuickLinks = styled.ul`
  li {
    margin-bottom: ${theme.spacing.sm};
  }
  
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.secondary};
    }
  }
`;

const ServiceLinks = styled.ul`
  li {
    margin-bottom: ${theme.spacing.sm};
  }
  
  a {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    transition: color ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.secondary};
    }
  }
`;

export const Footer: React.FC<FooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer className={className}>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <Logo to="/">Mam Center</Logo>
            <p>
              Premium horse riding center offering world-class training, 
              boarding, and equestrian experiences in a luxurious setting.
            </p>
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </SocialLink>
              <SocialLink href="#" aria-label="Instagram">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                </svg>
              </SocialLink>
              <SocialLink href="#" aria-label="Twitter">
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </SocialLink>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <QuickLinks>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </QuickLinks>
          </FooterSection>

          <FooterSection>
            <h3>Our Services</h3>
            <ServiceLinks>
              <li><Link to="/services">Horse Training</Link></li>
              <li><Link to="/services">Boarding</Link></li>
              <li><Link to="/services">Riding Lessons</Link></li>
              <li><Link to="/services">Trail Riding</Link></li>
              <li><Link to="/services">Competition Prep</Link></li>
            </ServiceLinks>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <p>
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                123 Equestrian Lane, Horse Valley, CA 90210
              </p>
              <p>
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                (555) 123-4567
              </p>
              <p>
                <svg fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                info@mamcenter.com
              </p>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          <p>&copy; {currentYear} Mam Center. All rights reserved.</p>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
}; 