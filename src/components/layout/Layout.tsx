import React from 'react';
import styled from 'styled-components';
import { LuxuryHeader } from './LuxuryHeader';
import { LuxuryFooter } from './LuxuryFooter';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const LayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  padding-top: 0; // No padding needed as sections handle their own spacing
`;

export const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <LayoutContainer className={className}>
      <LuxuryHeader />
      <Main>
        {children}
      </Main>
      <LuxuryFooter />
    </LayoutContainer>
  );
}; 