import styled from 'styled-components';
import { motion } from 'framer-motion';
import { luxuryTheme } from '../../constants/luxuryTheme';

// Glass Morphism Container with Premium Effects
export const GlassContainer = styled(motion.div)<{ 
  variant?: 'primary' | 'secondary' | 'gold' | 'navy';
  intensity?: 'subtle' | 'medium' | 'strong';
}>`
  background: ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'gold': return 'rgba(212, 175, 55, 0.1)';
      case 'navy': return 'rgba(27, 54, 93, 0.1)';
      case 'secondary': return 'rgba(255, 255, 255, 0.05)';
      default: return 'rgba(255, 255, 255, 0.1)';
    }
  }};
  backdrop-filter: blur(${({ intensity = 'medium' }) => {
    switch (intensity) {
      case 'subtle': return '10px';
      case 'strong': return '30px';
      default: return '20px';
    }
  }});
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${luxuryTheme.borderRadius.glass};
  box-shadow: ${luxuryTheme.shadows.glass};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  }
`;

// Premium Floating Button with Golden Accents
export const FloatingButton = styled(motion.button)<{ 
  variant?: 'primary' | 'secondary' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}>`
  background: ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'gold': return luxuryTheme.gradients.goldNavy;
      case 'secondary': return 'rgba(255, 255, 255, 0.1)';
      default: return luxuryTheme.gradients.navyGold;
    }
  }};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ variant = 'primary' }) => 
    variant === 'gold' ? luxuryTheme.colors.gold.primary : 'rgba(255, 255, 255, 0.3)'
  };
  border-radius: ${luxuryTheme.borderRadius.lg};
  color: ${luxuryTheme.colors.white};
  font-family: ${luxuryTheme.typography.fonts.modern};
  font-weight: ${luxuryTheme.typography.weights.semibold};
  padding: ${({ size = 'md' }) => {
    switch (size) {
      case 'sm': return '0.75rem 1.5rem';
      case 'lg': return '1.25rem 3rem';
      default: return '1rem 2rem';
    }
  }};
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: ${luxuryTheme.shadows.floating};
  transition: all ${luxuryTheme.animation.duration.normal} ${luxuryTheme.animation.easing.premium};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left ${luxuryTheme.animation.duration.slow} ease;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${luxuryTheme.shadows.golden};
    border-color: ${luxuryTheme.colors.gold.primary};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

// Interactive Glass Card with Tilt Effect
export const GlassCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${luxuryTheme.borderRadius.glass};
  padding: ${luxuryTheme.spacing.lg};
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all ${luxuryTheme.animation.duration.normal} ${luxuryTheme.animation.easing.premium};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: ${luxuryTheme.gradients.goldNavy};
    transform: translateX(-100%);
    transition: transform ${luxuryTheme.animation.duration.slow} ease;
  }
  
  &:hover {
    transform: translateY(-5px) rotateX(5deg);
    box-shadow: ${luxuryTheme.shadows.premium};
    border-color: rgba(212, 175, 55, 0.5);
    
    &::before {
      transform: translateX(0);
    }
  }
`;

// Luxury Text with Golden Gradient
export const LuxuryText = styled(motion.h1)<{ 
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  variant?: 'gradient' | 'solid' | 'outline';
}>`
  font-family: ${luxuryTheme.typography.fonts.luxury};
  font-weight: ${luxuryTheme.typography.weights.bold};
  font-size: ${({ size = 'md' }) => {
    switch (size) {
      case 'sm': return '1.5rem';
      case 'lg': return '3rem';
      case 'xl': return '4rem';
      case 'hero': return '5rem';
      default: return '2rem';
    }
  }};
  background: ${({ variant = 'gradient' }) => 
    variant === 'gradient' ? luxuryTheme.gradients.goldNavy : luxuryTheme.colors.white
  };
  ${({ variant = 'gradient' }) => variant === 'gradient' && `
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  `}
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0;
  position: relative;
  
  ${({ variant }) => variant === 'outline' && `
    -webkit-text-stroke: 2px ${luxuryTheme.colors.gold.primary};
    -webkit-text-fill-color: transparent;
  `}
`;

// Floating Navigation with Glass Effect
export const FloatingNav = styled(motion.nav)`
  position: fixed;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${luxuryTheme.borderRadius.xl};
  padding: 0.75rem 2rem;
  display: flex;
  gap: 2rem;
  box-shadow: ${luxuryTheme.shadows.floating};
`;

// Premium Input with Floating Labels
export const GlassInput = styled(motion.input)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${luxuryTheme.borderRadius.md};
  padding: 1rem 1.5rem;
  color: ${luxuryTheme.colors.white};
  font-family: ${luxuryTheme.typography.fonts.primary};
  font-size: 1rem;
  width: 100%;
  transition: all ${luxuryTheme.animation.duration.normal} ease;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  &:focus {
    outline: none;
    border-color: ${luxuryTheme.colors.gold.primary};
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
    transform: translateY(-2px);
  }
`;

// Animated Background Particles
export const ParticleBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 30%, rgba(212, 175, 55, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(27, 54, 93, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(192, 192, 192, 0.05) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    33% { transform: translateY(-20px) rotate(1deg); }
    66% { transform: translateY(-10px) rotate(-1deg); }
  }
`;

// Section with Full Height and Smooth Scrolling
export const LuxurySection = styled(motion.section)<{ 
  background?: 'navy' | 'white' | 'gradient' | 'glass';
}>`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${luxuryTheme.spacing.section} ${luxuryTheme.spacing.lg};
  position: relative;
  overflow: hidden;
  
  background: ${({ background = 'navy' }) => {
    switch (background) {
      case 'white': return luxuryTheme.colors.white;
      case 'gradient': return luxuryTheme.gradients.premium;
      case 'glass': return 'rgba(27, 54, 93, 0.95)';
      default: return luxuryTheme.colors.primary.navy;
    }
  }};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${({ background }) => 
      background === 'gradient' 
        ? 'linear-gradient(45deg, transparent 30%, rgba(212, 175, 55, 0.05) 50%, transparent 70%)'
        : 'none'
    };
    pointer-events: none;
  }
`;

// Magnetic Hover Effect
export const MagneticElement = styled(motion.div)`
  cursor: pointer;
  transition: transform ${luxuryTheme.animation.duration.fast} ${luxuryTheme.animation.easing.premium};
  
  &:hover {
    transform: scale(1.05);
  }
`;
