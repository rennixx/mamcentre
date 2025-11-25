import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { luxuryTheme } from '../../constants/luxuryTheme';
import { FloatingButton } from '../ui/LuxuryComponents';

interface LuxuryHeaderProps {
  className?: string;
}

const HeaderContainer = styled(motion.header)<{ scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  backdrop-filter: blur(15px);
  border-bottom: none;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: ${props => props.scrolled ? '0.3rem 0' : '0.6rem 0'};
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  @media (min-width: 768px) {
    padding: 0 3rem;
  }
  
  @media (min-width: 1440px) {
    max-width: 1600px;
    padding: 0 4rem;
  }
  
  @media (min-width: 1920px) {
    max-width: 1800px;
    padding: 0 5rem;
  }
  
  @media (min-width: 2560px) {
    max-width: 2200px;
    padding: 0 6rem;
  }
  
  @media (min-aspect-ratio: 21/9) {
    max-width: 85vw;
  }
`;

const Logo = styled(Link)`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  font-size: 2.2rem;
  font-weight: ${luxuryTheme.typography.weights.bold};
  color: ${luxuryTheme.colors.white};
  text-decoration: none;
  position: relative;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  
  background: linear-gradient(135deg, #D4AF37 0%, #FFFFFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  /* Add subtle text shadow for depth */
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(135deg, #D4AF37 0%, #FFFFFF 100%);
    transition: width 0.4s ease;
    border-radius: 2px;
  }
  
  &:hover {
    transform: translateY(-1px);
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
    
    &::after {
      width: 100%;
    }
  }
  
  /* Responsive sizing */
  @media (max-width: 768px) {
    font-size: 1.5rem;
    letter-spacing: 0.3px;
  }
  
  /* Smaller size for larger mobile phones */
  @media (max-width: 430px) {
    font-size: 1.4rem;
    letter-spacing: 0.2px;
  }
`;

const Navigation = styled.nav`
  display: none;
  align-items: center;
  gap: 2.5rem;
  
  @media (min-width: 1024px) {
    display: flex;
  }
  
  @media (min-width: 1440px) {
    gap: 3rem;
  }
  
  @media (min-width: 1920px) {
    gap: 3rem;
  }
`;

const NavLink = styled(Link)<{ isActive: boolean }>`
  font-family: ${luxuryTheme.typography.fonts.primary};
  color: ${props => props.isActive 
    ? luxuryTheme.colors.gold.primary 
    : luxuryTheme.colors.white
  };
  text-decoration: none;
  font-weight: ${luxuryTheme.typography.weights.medium};
  font-size: 1rem;
  position: relative;
  transition: all 0.3s ease;
  text-transform: capitalize;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: ${props => props.isActive ? '100%' : '0'};
    height: 2px;
    background: ${luxuryTheme.gradients.goldNavy};
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: ${luxuryTheme.colors.gold.primary};
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const MobileMenuButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: ${luxuryTheme.colors.white};
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  
  @media (min-width: 1024px) {
    display: none;
  }
`;

const MobileMenu = styled(motion.div)`
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
  justify-content: flex-start;
  padding-top: 5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-bottom: 2rem;
  z-index: 999;
  overflow: hidden;
  touch-action: none;
`;

const MobileNavLink = styled(Link)<{ isActive: boolean }>`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  color: ${props => props.isActive 
    ? luxuryTheme.colors.gold.primary 
    : luxuryTheme.colors.white
  };
  text-decoration: none;
  font-size: 1.6rem;
  font-weight: ${luxuryTheme.typography.weights.medium};
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  margin: 0.5rem 0;
  padding: 0.3rem 0.6rem;
  border-radius: 18px;
  border: 1px solid ${props => props.isActive 
    ? `rgba(212, 175, 55, 0.4)` 
    : 'transparent'
  };
  background: ${props => props.isActive 
    ? `rgba(212, 175, 55, 0.08)` 
    : 'transparent'
  };
  position: relative;
  overflow: hidden;
  display: inline-block;
  min-width: auto;
  text-align: center;
  text-transform: capitalize;
  width: 160px;
  
  &:hover {
    color: ${luxuryTheme.colors.gold.primary};
    transform: translateY(-2px);
    border: 1px solid rgba(212, 175, 55, 0.5);
    background: rgba(212, 175, 55, 0.12);
    box-shadow: 0 4px 15px rgba(212, 175, 55, 0.15);
  }
  
  &:active {
    transform: translateY(0px);
  }
`;


const MobileMenuContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 250px;
  gap: 1rem;
  min-height: auto;
`;

const navItems = [
  { key: 'home', path: '/' },
  { key: 'about', path: '/about' },
  { key: 'services', path: '/services' },
  { key: 'gallery', path: '/gallery' },
  { key: 'contact', path: '/contact' },
];

const LanguageSwitcher = styled.div`
  position: relative;
  margin-right: 12px;
  
  @media (max-width: 768px) {
    margin-right: 8px;
  }
`;

const LanguageButton = styled.div`
  background: linear-gradient(135deg, #D4AF37 0%, #F5E6A3 100%);
  border: 2px solid #D4AF37;
  border-radius: 8px;
  padding: 8px 16px;
  color: #0D1E56;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  min-width: 80px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(212, 175, 55, 0.4);
  }
  
  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 13px;
    min-width: 70px;
    gap: 4px;
  }
`;

const LanguageDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: rgba(27, 54, 93, 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  min-width: 150px;
  z-index: 1001;
`;

const LanguageOption = styled.div`
  padding: 12px 16px;
  color: ${luxuryTheme.colors.white};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  
  &:hover {
    background: rgba(212, 175, 55, 0.2);
    color: ${luxuryTheme.colors.gold.primary};
  }
  
  &.active {
    background: rgba(212, 175, 55, 0.3);
    color: ${luxuryTheme.colors.gold.primary};
  }
`;

export const LuxuryHeader: React.FC<LuxuryHeaderProps> = ({ className }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const { t, i18n } = useTranslation(['navigation', 'common']);
  const location = useLocation();

  const supportedLanguages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ar', label: 'العربية', flag: '🇮🇶' },
    { code: 'ku', label: 'کوردی', flag: '☀️' }
  ];

  const currentLanguage = supportedLanguages.find(lang => lang.code === i18n.language) || supportedLanguages[0];

  const toggleLanguageDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const selectLanguage = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setLanguageDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (languageDropdownOpen && !target.closest('[data-language-switcher]')) {
        setLanguageDropdownOpen(false);
      }
    };

    if (languageDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [languageDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cleanup: restore scrolling when component unmounts or menu is open
  useEffect(() => {
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    };
  }, []);

  // Also restore scrolling when menu closes via external means
  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent background scrolling when mobile menu is open
    if (!mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    // Re-enable scrolling when menu closes
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.height = '';
  };

  return (
    <>
      <HeaderContainer
        scrolled={scrolled}
        className={className}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <HeaderContent>
          <Logo to="/">
            Mam Center
          </Logo>
          
          <Navigation>
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                isActive={location.pathname === item.path}
              >
                {t(`navigation:${item.key}`)}
              </NavLink>
            ))}
          </Navigation>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Language Switcher Dropdown */}
            <LanguageSwitcher data-language-switcher>
              <LanguageButton onClick={toggleLanguageDropdown}>
                {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
                <span style={{ transform: languageDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                  ▼
                </span>
              </LanguageButton>
              
              <AnimatePresence>
                {languageDropdownOpen && (
                  <LanguageDropdown
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {supportedLanguages.map((language) => (
                      <LanguageOption
                        key={language.code}
                        className={language.code === i18n.language ? 'active' : ''}
                        onClick={() => selectLanguage(language.code)}
                      >
                        <span>{language.flag}</span>
                        <span>{language.label}</span>
                      </LanguageOption>
                    ))}
                  </LanguageDropdown>
                )}
              </AnimatePresence>
            </LanguageSwitcher>
            
            <FloatingButton
              as={Link}
              to="/booking"
              size="sm"
              variant="gold"
              style={{ display: 'none' }}
              className="desktop-only"
            >
              {t('navigation:booking')}
            </FloatingButton>
            
            <MobileMenuButton
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                initial={false}
                animate={mobileMenuOpen ? 'open' : 'closed'}
                variants={{
                  closed: { rotate: 0 },
                  open: { rotate: 90 }
                }}
                style={{ display: 'inline-block', width: 28, height: 28 }}
              >
                {/* Hamburger/X icon animation */}
                <motion.svg
                  width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.rect
                    x="4" y="8" width="20" height="2.5" rx="1.25"
                    fill="currentColor"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 10 }
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    animate={mobileMenuOpen ? 'open' : 'closed'}
                  />
                  <motion.rect
                    x="4" y="17" width="20" height="2.5" rx="1.25"
                    fill="currentColor"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -7 }
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    animate={mobileMenuOpen ? 'open' : 'closed'}
                  />
                </motion.svg>
              </motion.span>
            </MobileMenuButton>
          </div>
        </HeaderContent>
      </HeaderContainer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 200,
              duration: 0.4
            }}
          >

            
            <MobileMenuContent>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: 50, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ 
                    delay: 0.2 + (index * 0.1),
                    type: 'spring',
                    damping: 20,
                    stiffness: 300
                  }}
                >
                  <MobileNavLink
                    to={item.path}
                    isActive={location.pathname === item.path}
                    onClick={closeMobileMenu}
                  >
                    {t(`navigation:${item.key}`)}
                  </MobileNavLink>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, x: 50, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ 
                  delay: 0.2 + (navItems.length * 0.1),
                  type: 'spring',
                  damping: 20,
                  stiffness: 300
                }}
                style={{ marginTop: '1rem' }}
              >
                <FloatingButton
                  as={Link}
                  to="/booking"
                  size="lg"
                  variant="gold"
                  onClick={closeMobileMenu}
                >
                  {t('navigation:booking')}
                </FloatingButton>
              </motion.div>
            </MobileMenuContent>
          </MobileMenu>
        )}
      </AnimatePresence>
      
      <style>{`
        @media (min-width: 1024px) {
          .desktop-only {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
};
