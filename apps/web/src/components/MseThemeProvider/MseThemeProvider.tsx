import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

export const MseTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      background: { default: '#2C2C2C', paper: '#331E36' },
      primary: { main: '#0079E2' },
      secondary: { main: '#FF5A81' },
      success: { main: '#ECFEE8' },
      warning: { main: '#DE6F5B' },
      common: { black: '#2C2C2C' },
      text: { primary: '#FFFFFF' },
    },
    shape: { borderRadius: 8 },
  })
);
export const MseThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={MseTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
