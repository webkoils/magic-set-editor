import { AppBar, Toolbar } from '@mui/material';

export const Footer = () => {
  return (
    <AppBar position='sticky' sx={{ bottom: 0 }}>
      <Toolbar variant='dense'>© John Anderson 2022</Toolbar>
    </AppBar>
  );
};
