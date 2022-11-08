import { Navbar } from './Navbar';
import { Footer } from './Footer';
import React from 'react';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { MseThemeProvider } from '../MseThemeProvider';
import { Sidebar } from './Sidebar';
import { BrandingWordmark } from '@mse/ui/core';
import { FileCopy, Home } from '@mui/icons-material';
export const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <MseThemeProvider>
      <Box
        sx={{
          overflow: 'hidden',
          height: '100vh',
          width: '100vw',
          display: 'flex',
          flexFlow: 'row nowrap',
          alignContent: 'stretch',
          justifyContent: 'flex-start',
          paddingTop: '4rem',
        }}
      >
        <Navbar />
        <Box sx={{ overflow: 'auto', height: '100%', flex: '1 1 100%' }}>
          {children}
          <Footer />
        </Box>
      </Box>
    </MseThemeProvider>
  );
};
/*
  <Sidebar anchor='left' minWidth='2rem'>
          <Paper sx={{ height: '100%' }}>
            <BrandingWordmark height='3rem' />
            <List>
              <ListItemButton sx={{ paddingLeft: '0' }}>
                <ListItemIcon sx={{ width: '2rem', minWidth: '2rem' }}>
                  <Home sx={{ width: '2rem' }} />
                </ListItemIcon>
                <Typography>Home</Typography>
              </ListItemButton>
              <ListItemButton sx={{ paddingLeft: '0' }}>
                <ListItemIcon
                  sx={{ width: '2rem', minWidth: '2rem', padding: 0 }}
                >
                  <FileCopy sx={{ width: '2rem' }} />
                </ListItemIcon>
                <Typography>Sets</Typography>
              </ListItemButton>
            </List>
          </Paper>
        </Sidebar>
*/
