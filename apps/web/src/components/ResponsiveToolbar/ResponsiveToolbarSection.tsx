import { Menu } from '@mui/icons-material';
import {
  Box,
  BoxProps,
  IconButton,
  styled,
  SwipeableDrawer,
  SwipeableDrawerProps,
} from '@mui/material';
import React, { useMemo, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
const Section = styled(Box)(() => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
}));

const NonMobileItem = styled(Box)(({ theme }) => ({
  flex: '0 1 100%',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const MobileItem = styled(Box)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.down('sm')]: { display: 'flex' },
}));
export const ResponsiveToolbarSection: React.FC<{
  children: JSX.Element | JSX.Element[];
  mobileIcon?: JSX.Element;
  sectionProps?: Partial<Omit<BoxProps, 'children'>>;
  drawerProps?: Partial<SwipeableDrawerProps>;
}> = ({ children, sectionProps, mobileIcon, drawerProps }) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const mobileRef = useRef(null);
  const arrayedChildren = useMemo(
    () => (Array.isArray(children) ? children : children ? [children] : []),
    [children]
  );

  return (
    <Section {...sectionProps}>
      <MobileItem>
        <IconButton onClick={() => setPopoverOpen((c) => !c)} ref={mobileRef}>
          {mobileIcon || <Menu />}
        </IconButton>
      </MobileItem>
      {arrayedChildren.map((c, i) => (
        <NonMobileItem key={c.key || i}>{c}</NonMobileItem>
      ))}
      <SwipeableDrawer
        anchor='right'
        onOpen={() => {}}
        {...drawerProps}
        open={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        PaperProps={{ sx: { p: 2 } }}
        //     anchorEl={mobileRef.current}
      >
        <Grid spacing={1} container justifyContent={'space-between'}>
          {arrayedChildren.map((c, i) => (
            <Grid xs={12} key={c.key || i}>
              {c}
            </Grid>
          ))}
        </Grid>
      </SwipeableDrawer>
    </Section>
  );
};
