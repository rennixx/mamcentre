import styled from 'styled-components';
import { luxuryTheme } from '../../constants/luxuryTheme';

export const ResponsiveContainer = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (min-width: ${luxuryTheme.breakpoints.tablet}) {
    padding: 0 3rem;
  }
  
  @media (min-width: ${luxuryTheme.breakpoints.widescreen}) {
    max-width: 1600px;
    padding: 0 4rem;
  }
  
  @media (min-width: ${luxuryTheme.breakpoints.ultrawide}) {
    max-width: 1800px;
    padding: 0 5rem;
  }
  
  @media (min-width: ${luxuryTheme.breakpoints['4k']}) {
    max-width: 2200px;
    padding: 0 6rem;
  }
  
  @media (min-aspect-ratio: 21/9) {
    max-width: 85vw;
  }
`;

export const WideScreenGrid = styled.div<{ 
  columns?: number;
  gap?: string;
  minItemWidth?: string;
}>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.minItemWidth || '300px'}, 1fr));
  gap: ${props => props.gap || '2rem'};
  
  @media (min-width: ${luxuryTheme.breakpoints.laptop}) {
    grid-template-columns: repeat(${props => props.columns || 2}, 1fr);
    gap: ${props => props.gap || '3rem'};
  }
  
  @media (min-width: ${luxuryTheme.breakpoints.widescreen}) {
    gap: ${props => props.gap || '4rem'};
  }
  
  @media (min-width: ${luxuryTheme.breakpoints.ultrawide}) {
    grid-template-columns: repeat(${props => Math.min((props.columns || 2) + 1, 4)}, 1fr);
    gap: ${props => props.gap || '5rem'};
  }
  
  @media (min-width: ${luxuryTheme.breakpoints['4k']}) {
    grid-template-columns: repeat(${props => Math.min((props.columns || 2) + 2, 6)}, 1fr);
    gap: ${props => props.gap || '6rem'};
  }
`;

export const LandscapeOptimized = styled.div`
  @media (orientation: landscape) and (max-height: 600px) {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 2rem 0;
  }
  
  @media (orientation: landscape) and (min-width: 1024px) {
    .content-grid {
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
  }
`;

export const UltraWideSection = styled.section`
  width: 100%;
  
  @media (min-aspect-ratio: 21/9) {
    .hero-content {
      grid-template-columns: 1fr 1.3fr;
      gap: 8rem;
    }
    
    .features-grid {
      grid-template-columns: repeat(4, 1fr);
    }
    
    .services-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }
  
  @media (min-aspect-ratio: 32/9) {
    .content-container {
      max-width: 80vw;
    }
  }
`;
