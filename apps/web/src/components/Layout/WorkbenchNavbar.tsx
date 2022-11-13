import {
  AppBar,
  IconButton,
  Box,
  styled,
  Button,
  Typography,
  ButtonBase,
} from '@mui/material';
import { BrandingWordmark } from '@mse/ui.core';
import { Edit, Person } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import { AuthPopup } from '../Auth/AuthPopup';
import { useRouter } from 'next/router';
import { useCardSetContext } from '@/client-state/CardSetState';
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

export const WorkbenchNavbar: React.FC<Record<string, never>> = () => {
  const { cardSet } = useCardSetContext();
  const [authOpen, setAuthOpen] = useState(false);
  const router = useRouter();
  const toggleAuthPopup = useCallback(() => setAuthOpen((d) => !d), []);

  const session = useSession();

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
            <BrandingWordmark height={'3rem'} viewBox={'0 0 70 100'} />

            <ButtonBase
              sx={{
                px: 2,
                display: 'flex',
                flexFlow: 'row nowrap',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Typography variant='h6'> {cardSet?.displayName}</Typography>
              <Edit sx={{ ml: 2 }} fontSize='inherit' />
            </ButtonBase>
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
