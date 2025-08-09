import React from 'react';
import styled from 'styled-components';
import { LuxuryHeader } from './LuxuryHeader';
import { SimpleFooter } from './SimpleFooter';

interface SimpleLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: transparent;
  color: #FFFFFF;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
`;

export const SimpleLayout: React.FC<SimpleLayoutProps> = ({ 
  children, 
  className 
}) => {
  return (
    <LayoutContainer className={className}>
      <LuxuryHeader />
      <MainContent>
        {children}
      </MainContent>
      <SimpleFooter />
    </LayoutContainer>
  );
};

export default SimpleLayout;
