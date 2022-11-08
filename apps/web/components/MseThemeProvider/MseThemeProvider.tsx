import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      background: { default: '#2C2C2C' },
      primary: { main: '#B4A6FE' },
      secondary: { main: '#F82047' },
      success: { main: '#A8A6AF' },
      warning: { main: '#DE6F5B' },
      common: { black: '#2C2C2C' },
    },
    shape: { borderRadius: 20 },
  })
);
export const MseThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
