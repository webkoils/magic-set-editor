import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import React from 'react';
import { Box, Container } from '@mui/material';
import { MseThemeProvider } from '../MseThemeProvider';
export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <MseThemeProvider>
      <Box
        sx={{
          overflow: 'hidden',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexFlow: 'column nowrap',
          alignContent: 'stretch',
          justifyContent: 'flex-start',
          paddingTop: '4rem',
        }}
      >
        <Navbar />
        <Box sx={{ overflow: 'auto', height: '100%', flex: '1 1 100%' }}>
          <Container>{children}</Container>
        </Box>{' '}
        <Footer />
      </Box>
    </MseThemeProvider>
  );
};
