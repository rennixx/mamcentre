import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { luxuryTheme } from '../../constants/luxuryTheme';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(27, 54, 93, 0.98);
  backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 999;
  overflow: hidden;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: transparent;
  border: none;
  color: ${luxuryTheme.colors.white};
  font-size: 2rem;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: ${luxuryTheme.colors.gold.primary};
  }
`;

const NavContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-height: 70vh;
  width: 100%;
  max-width: 300px;
  gap: 0.5rem;
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${props => props.isActive 
    ? luxuryTheme.colors.gold.primary 
    : luxuryTheme.colors.white
  };
  text-decoration: none;
  font-size: 1.8rem;
  font-weight: ${luxuryTheme.typography.weights.medium};
  transition: all 0.3s ease;
  margin: 0.8rem 0;
  padding: 1rem 2rem;
  border-radius: 12px;
  border: 2px solid transparent;
  text-align: center;
  min-width: 200px;
  
  &:hover {
    color: ${luxuryTheme.colors.gold.primary};
    transform: scale(1.05);
    border: 2px solid rgba(212, 175, 55, 0.3);
    background: rgba(212, 175, 55, 0.1);
  }
`;

const BookingButton = styled(motion.div)`
  margin-top: 1rem;
  
  a {
    display: inline-block;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #D4AF37 0%, #B8941F 100%);
    color: #000;
    text-decoration: none;
    border-radius: 12px;
    font-weight: ${luxuryTheme.typography.weights.semibold};
    transition: all 0.3s ease;
    border: 2px solid #D4AF37;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(212, 175, 55, 0.4);
    }
  }
`;

const navItems = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'gallery', path: '/gallery' },
  { key: 'contact', path: '/contact' },
];

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { t } = useTranslation(['navigation']);

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <MobileNavContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <CloseButton
        onClick={onClose}
        whileTap={{ scale: 0.95 }}
      >
        ✕
      </CloseButton>
      
      <NavContent>
        {navItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NavLink
              to={item.path}
              isActive={location.pathname === item.path}
              onClick={handleLinkClick}
            >
              {t(`navigation:${item.key}`)}
            </NavLink>
          </motion.div>
        ))}
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: navItems.length * 0.1 }}
        >
          <BookingButton>
            <Link to="/booking" onClick={handleLinkClick}>
              {t('navigation:booking')}
            </Link>
          </BookingButton>
        </motion.div>
      </NavContent>
    </MobileNavContainer>
  );
};
