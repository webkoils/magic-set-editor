import { AppBar, IconButton, Box, styled, Button } from '@mui/material';
import { BrandingWordmark } from '@mse/ui.core';
import { Person } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { AuthPopup } from '../Auth/AuthPopup';
import { useRouter } from 'next/router';
/*
const MobileIconButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));
*/
const NavItem = styled(Box)(() => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  placeContent: 'center center',
}));

export const Navbar: React.FC<Record<string, never>> = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const router = useRouter();
  const toggleAuthPopup = useCallback(() => setAuthOpen((d) => !d), []);

  const session = useSession();
  /*
  const segments = useMemo(() => router.asPath.split('/'), [router]);

  const prevPath = useMemo(() => {
    const [prevSegment] = segments.slice(-2, -1);

    const isWorkbench = segments.includes('workbench');
    if (!isWorkbench) {
      return null;
    }
    if (prevSegment === 'workbench') {
      return { name: 'Sets', path: '/workbench' };
    }

    return null;
  }, [segments]);
*/
  useEffect(() => {
    if (session?.user.id && authOpen) {
      setAuthOpen(false);
      router.push('/workbench');
    }
  }, [session, authOpen, router]);

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
          <Box
            sx={{
              flex: '0 1 100%',
              display: 'flex',
              flexFlow: 'row nowrap',
              placeContent: 'center flex-start',
              paddingLeft: '.5rem',
            }}
          >
            <BrandingWordmark height={'3rem'} />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row nowrap',
              placeContent: 'center flex-end',
            }}
          >
            <NavItem>
              {session ? (
                <IconButton>
                  <Person />
                </IconButton>
              ) : (
                <Button variant='text' onClick={toggleAuthPopup}>
                  Login
                </Button>
              )}
            </NavItem>
          </Box>
        </Box>
      </AppBar>
      <AuthPopup open={authOpen} onClose={toggleAuthPopup} />
    </>
  );
};
