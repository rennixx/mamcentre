export const luxuryTheme = {
  colors: {
    primary: {
      navy: '#1B365D',
      navyDark: '#0F1B2E',
      navyLight: '#2A4A6B'
    },
    white: '#FFFFFF',
    gold: {
      primary: '#D4AF37',
      light: '#E5C659',
      dark: '#B8941F',
      subtle: 'rgba(212, 175, 55, 0.1)'
    },
    platinum: {
      primary: '#C0C0C0',
      light: '#D3D3D3',
      dark: '#A8A8A8'
    },
    charcoal: {
      primary: '#2F2F2F',
      light: '#404040',
      dark: '#1A1A1A'
    },
    glass: {
      white: 'rgba(255, 255, 255, 0.1)',
      whiteStrong: 'rgba(255, 255, 255, 0.15)',
      navy: 'rgba(27, 54, 93, 0.1)',
      gold: 'rgba(212, 175, 55, 0.1)'
    }
  },
  gradients: {
    navyGold: 'linear-gradient(135deg, #1B365D 0%, #D4AF37 100%)',
    goldNavy: 'linear-gradient(135deg, #D4AF37 0%, #1B365D 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
    heroOverlay: 'linear-gradient(180deg, rgba(27, 54, 93, 0.7) 0%, rgba(47, 47, 47, 0.8) 100%)',
    premium: 'linear-gradient(135deg, #1B365D 0%, #2A4A6B 25%, #D4AF37 50%, #2A4A6B 75%, #1B365D 100%)'
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    premium: '0 20px 60px rgba(27, 54, 93, 0.3)',
    floating: '0 15px 35px rgba(0, 0, 0, 0.1), 0 5px 15px rgba(0, 0, 0, 0.08)',
    golden: '0 10px 40px rgba(212, 175, 55, 0.3)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  typography: {
    fonts: {
      primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      luxury: '"Playfair Display", serif',
      modern: '"Poppins", sans-serif'
    },
    weights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 900
    }
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem',
    xxl: '6rem',
    section: '8rem'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px',
    desktop: '1280px',
    widescreen: '1440px',
    ultrawide: '1920px',
    '4k': '2560px'
  },
  borderRadius: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    glass: '20px'
  },
  animation: {
    duration: {
      fast: '0.2s',
      normal: '0.3s',
      slow: '0.6s',
      luxury: '1.2s'
    },
    easing: {
      premium: 'cubic-bezier(0.23, 1, 0.32, 1)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)'
    }
  },
  glass: {
    backdrop: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'rgba(255, 255, 255, 0.1)'
  }
} as const;

export type LuxuryTheme = typeof luxuryTheme;
