import React from 'react';
import { Box } from '@mui/material';
export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignContent: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: '3rem',
        paddingBottom: '0rem',
      }}
    >
      {children}
    </Box>
  );
};
