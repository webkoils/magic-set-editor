import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = responsiveFontSizes(
  createTheme({ palette: { mode: 'light' }, shape: { borderRadius: 20 } })
);
export const MseThemeProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
