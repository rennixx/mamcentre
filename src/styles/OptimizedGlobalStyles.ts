import { createGlobalStyle } from 'styled-components';
import { luxuryTheme } from '../constants/luxuryTheme';

export const OptimizedGlobalStyles = createGlobalStyle`
  /* Performance-optimized CSS Reset */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    scroll-padding-top: 100px;
    /* Performance optimizations */
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: transparent;
  }

  /* RTL Support - DISABLED to maintain consistent LTR layout */
  html[dir="rtl"], html[dir="ltr"] {
    text-align: left; /* Always left-align */
    direction: ltr;   /* Always LTR direction */
  }

  body {
    font-family: ${luxuryTheme.typography.fonts.primary};
    font-size: 1rem;
    line-height: 1.6;
    color: ${luxuryTheme.colors.white};
    background: ${luxuryTheme.colors.primary.navy};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    /* Performance optimizations */
    will-change: scroll-position;
    backface-visibility: hidden;
    perspective: 1000px;
  }

  /* Optimized Typography */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${luxuryTheme.typography.fonts.luxury};
    font-weight: ${luxuryTheme.typography.weights.bold};
    line-height: 1.2;
    color: ${luxuryTheme.colors.white};
    /* Performance optimization */
    font-display: swap;
  }

  p {
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  /* Optimized Links */
  a {
    color: ${luxuryTheme.colors.gold.primary};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${luxuryTheme.colors.gold.light};
    }
  }

  /* Performance-optimized Lists */
  ul, ol {
    list-style: none;
  }

  /* Optimized Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
    /* Performance optimizations */
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  /* Optimized Buttons */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    font-size: inherit;
    /* Performance optimization */
    will-change: transform;
    
    &:focus-visible {
      outline: 2px solid ${luxuryTheme.colors.gold.primary};
      outline-offset: 2px;
    }
  }

  /* Form Optimizations */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    
    &:focus {
      outline: none;
    }
  }

  /* Scrollbar Styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: ${luxuryTheme.gradients.goldNavy};
    border-radius: 4px;
    
    &:hover {
      background: ${luxuryTheme.colors.gold.primary};
    }
  }

  /* Performance-Critical Animations */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { 
      opacity: 0; 
      transform: translate3d(0, 30px, 0); 
    }
    to { 
      opacity: 1; 
      transform: translate3d(0, 0, 0); 
    }
  }

  @keyframes float {
    0%, 100% { transform: translate3d(0, 0, 0); }
    50% { transform: translate3d(0, -10px, 0); }
  }

  /* Performance Utilities */
  .gpu-accelerated {
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;
  }

  .will-change-transform {
    will-change: transform;
  }

  .will-change-opacity {
    will-change: opacity;
  }

  /* Reduced Motion Support */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    html {
      scroll-behavior: auto;
    }
  }

  /* High Contrast Mode Support */
  @media (prefers-contrast: high) {
    * {
      text-shadow: none !important;
      box-shadow: none !important;
    }
  }

  /* Dark Mode Optimization */
  @media (prefers-color-scheme: dark) {
    body {
      color-scheme: dark;
    }
  }

  /* Widescreen and Landscape Optimizations */
  @media (min-width: 1440px) {
    html {
      font-size: 18px;
    }
    
    body {
      overflow-x: auto;
    }
  }

  @media (min-width: 1920px) {
    html {
      font-size: 20px;
    }
  }

  @media (min-width: 2560px) {
    html {
      font-size: 22px;
    }
  }

  /* Landscape orientation optimizations */
  @media (orientation: landscape) and (max-height: 600px) {
    .hero-section {
      min-height: 100vh;
      padding: 2rem 0;
    }
    
    .hero-content {
      gap: 2rem;
    }
  }

  @media (orientation: landscape) and (min-width: 1024px) {
    .content-container {
      max-width: 90vw;
    }
    
    .grid-layout {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 3rem;
    }
  }

  /* Ultra-wide support */
  @media (min-aspect-ratio: 21/9) {
    .container {
      max-width: 85vw;
    }
    
    .hero-content {
      grid-template-columns: 1fr 1.2fr;
      gap: 6rem;
    }
  }

  /* Focus Management */
  .js-focus-visible :focus:not(.focus-visible) {
    outline: none;
  }

  /* Loading States */
  .loading {
    pointer-events: none;
    opacity: 0.7;
  }

  /* Container Queries Support */
  @supports (container-type: inline-size) {
    .container {
      container-type: inline-size;
    }
  }

  /* Print Styles */
  @media print {
    * {
      background: white !important;
      color: black !important;
      box-shadow: none !important;
      text-shadow: none !important;
    }
    
    body {
      font-size: 12pt;
      line-height: 1.5;
    }
  }

  /* RTL Language Support - DISABLED to maintain consistent layout */
  [dir="rtl"], [dir="ltr"] {
    /* Keep everything LTR regardless of language */
    text-align: left;
    direction: ltr;
  }
    }
    
    .border-radius-end {
      border-start-start-radius: 0;
      border-end-start-radius: 0;
      border-start-end-radius: 0.5rem;
      border-end-end-radius: 0.5rem;
    }
  }

  [dir="ltr"] {
    text-align: left;
    
    input, textarea, select {
      text-align: left;
      direction: ltr;
    }
  }

  /* Language-specific font optimizations */
  [lang="ar"] {
    font-family: 'Noto Sans Arabic', 'Arial Unicode MS', Arial, sans-serif;
    line-height: 1.8;
  }
  
  [lang="ku"] {
    font-family: 'Noto Sans', 'Arial Unicode MS', Arial, sans-serif;
    line-height: 1.8;
  }

  [lang="en"] {
    font-family: ${luxuryTheme.typography.fonts.primary};
    line-height: 1.6;
  }

  /* Responsive Utility Classes */
  .hide-mobile {
    @media (max-width: ${luxuryTheme.breakpoints.tablet}) {
      display: none !important;
    }
  }

  .hide-desktop {
    @media (min-width: ${luxuryTheme.breakpoints.desktop}) {
      display: none !important;
    }
  }

  .show-widescreen {
    display: none;
    @media (min-width: ${luxuryTheme.breakpoints.widescreen}) {
      display: block;
    }
  }

  .responsive-padding {
    padding: 1rem;
    @media (min-width: ${luxuryTheme.breakpoints.tablet}) {
      padding: 2rem;
    }
    @media (min-width: ${luxuryTheme.breakpoints.desktop}) {
      padding: 3rem;
    }
    @media (min-width: ${luxuryTheme.breakpoints.widescreen}) {
      padding: 4rem;
    }
  }

  .responsive-margin {
    margin: 1rem 0;
    @media (min-width: ${luxuryTheme.breakpoints.tablet}) {
      margin: 2rem 0;
    }
    @media (min-width: ${luxuryTheme.breakpoints.desktop}) {
      margin: 3rem 0;
    }
  }

  .text-responsive {
    font-size: 1rem;
    @media (min-width: ${luxuryTheme.breakpoints.tablet}) {
      font-size: 1.125rem;
    }
    @media (min-width: ${luxuryTheme.breakpoints.desktop}) {
      font-size: 1.25rem;
    }
    @media (min-width: ${luxuryTheme.breakpoints.widescreen}) {
      font-size: 1.375rem;
    }
  }
`;

// Legacy fallback for existing components
export const GlobalStyles = OptimizedGlobalStyles;
