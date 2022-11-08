import {
  AppBar,
  Drawer,
  IconButton,
  SvgIcon,
  Toolbar,
  Box,
  styled,
  Button,
} from '@mui/material';
import { BrandingWordmark } from '@mse/ui/core';
import { Menu, Person } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { AuthPopup } from '../Auth/AuthPopup';

const MobileIconButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const NonMobileNavItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  placeContent: 'center center',

  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

export const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const toggleAuthPopup = useCallback(() => setAuthOpen((d) => !d), []);

  const toggleDrawer = useCallback(() => setDrawerOpen((d) => !d), []);
  const session = useSession();
  return (
    <>
      <AppBar position='fixed' elevation={4}>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            placeContent: 'center space-between',
          }}
        >
          <BrandingWordmark height={'3rem'} />
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              placeContent: 'center flex-end',
            }}
          >
            <NonMobileNavItem>
              {session ? (
                <IconButton>
                  <Person />
                </IconButton>
              ) : (
                <Button variant='text' onClick={toggleAuthPopup}>
                  Login
                </Button>
              )}
            </NonMobileNavItem>
            <MobileIconButton onClick={toggleDrawer}>
              <Menu />
            </MobileIconButton>
          </Box>
        </Box>
      </AppBar>
      <AuthPopup open={authOpen} onClose={toggleAuthPopup} />
      <Drawer anchor='right' open={drawerOpen}>
        SIDEBAR
      </Drawer>
    </>
  );
};
