import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HamburgerButton = styled.button`
  background: none;
  border: none;
  color: #1B365D;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  transition: none;
  z-index: 1000;
  outline: none;
  
  &:hover {
    background: none;
  }
  
  &:active {
    background: none;
    transform: none;
  }
  
  &:focus {
    outline: none;
    box-shadow: none;
  }
  
  @media (max-width: 767px) {
    display: flex;
  }
`;

const HamburgerLine = styled.div<{ isOpen: boolean }>`
  width: 22px;
  height: 2px;
  background: #1B365D;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:nth-child(1) {
    transform: ${props => props.isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
  }
  
  &:nth-child(2) {
    opacity: ${props => props.isOpen ? 0 : 1};
    transform: ${props => props.isOpen ? 'translateX(10px)' : 'none'};
  }
  
  &:nth-child(3) {
    transform: ${props => props.isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
  }
`;

const MobileMenu = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-100%'};
  width: min(320px, 85vw);
  height: 100vh;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(20px);
  z-index: 999;
  transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: -8px 0 32px rgba(0, 0, 0, 0.12);
  padding: 80px 0 40px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const MenuOverlay = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(27, 54, 93, 0.4);
  backdrop-filter: blur(2px);
  z-index: 998;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const MenuHeader = styled.div`
  padding: 0 32px 32px;
  margin-bottom: 8px;
`;

const MenuLogo = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  color: #1B365D;
  margin: 0;
  letter-spacing: 1px;
  position: relative;
  transition: all 0.3s ease;
  
  /* Add gradient text effect with gold and white */
  background: linear-gradient(135deg, #D4AF37 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Add subtle text shadow for depth */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 60%;
    height: 2px;
    background: linear-gradient(135deg, #D4AF37 0%, #FFFFFF 100%);
    border-radius: 2px;
  }
`;

const MenuNavigation = styled.nav`
  flex: 1;
  padding: 8px 0;
`;

const MenuLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 16px 32px;
  text-decoration: none;
  color: #1B365D;
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background: rgba(27, 54, 93, 0.04);
    color: #2E5A8A;
    padding-left: 40px;
  }
  
  &:active {
    background: rgba(27, 54, 93, 0.08);
  }
  
  &::before {
    content: '';
    position: absolute;
    left: 32px;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    background: #2E5A8A;
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
`;

const MenuFooter = styled.div`
  padding: 24px 32px;
  margin-top: auto;
`;

const ContactButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 14px 24px;
  background: linear-gradient(135deg, #1B365D 0%, #2E5A8A 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  font-weight: 600;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(27, 54, 93, 0.2);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(27, 54, 93, 0.25);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 8px rgba(27, 54, 93, 0.2);
  }
`;

interface SimpleMobileNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const SimpleMobileNav: React.FC<SimpleMobileNavProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      <HamburgerButton onClick={onToggle}>
        <HamburgerLine isOpen={isOpen} />
        <HamburgerLine isOpen={isOpen} />
        <HamburgerLine isOpen={isOpen} />
      </HamburgerButton>
      
      <MenuOverlay isOpen={isOpen} onClick={onToggle} />
      
      <MobileMenu isOpen={isOpen}>        
        <MenuHeader>
          <MenuLogo>Mam Center</MenuLogo>
        </MenuHeader>
        
        <MenuNavigation>
          <MenuLink to="/" onClick={onToggle}>Home</MenuLink>
          <MenuLink to="/about" onClick={onToggle}>About</MenuLink>
          <MenuLink to="/services" onClick={onToggle}>Services</MenuLink>
          <MenuLink to="/gallery" onClick={onToggle}>Gallery</MenuLink>
          <MenuLink to="/contact" onClick={onToggle}>Contact</MenuLink>
          <MenuLink to="/my-bookings" onClick={onToggle}>My Bookings</MenuLink>
        </MenuNavigation>
        
        <MenuFooter>
          <ContactButton as={Link} to="/booking" onClick={onToggle}>
            Book Now
          </ContactButton>
        </MenuFooter>
      </MobileMenu>
    </>
  );
};
