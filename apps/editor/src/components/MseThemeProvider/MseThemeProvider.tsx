import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

const theme = responsiveFontSizes(
  createTheme({ palette: { mode: 'dark' }, shape: { borderRadius: 20 } })
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
