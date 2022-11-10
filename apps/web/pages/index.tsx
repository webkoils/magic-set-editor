import { Box, Container, Grid, Typography } from '@mui/material';
import { CardGrid } from '@mse/ui/core';
import sampleCards from '@mse/sample-cards';
import { MtgSymbol } from '@mse/ui.symbols';
import { useRecoilState } from 'recoil';
import { ReactElement } from 'react';
import { Layout } from '../components/Layout';
import { Navbar } from '../components/Layout/Navbar';
const symbolKeys = [
  'W',
  'U',
  'B',
  'R',
  'G',
  'C',
  'PW',
  'PU',
  'PB',
  'PR',
  'PG',
  '2',
  'G/W',
  '2/G',
  'W/U/B',
  'Inf',
  'T',
  'X',
  'Y',
];

export default function HomePage() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignContent: 'stretch',
        justifyContent: 'flex-start',
        paddingTop: '0rem',
        paddingBottom: '0rem',
      }}
    >
      <Navbar />
      <Box
        sx={{
          height: 'auto',
          width: '100vw',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        <Container maxWidth='xl' sx={{ paddingTop: '3rem' }}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='h4'>Cheatsheet:</Typography>
              <Grid container spacing={2} style={{ fontSize: '1.4rem' }}>
                {symbolKeys.map((k) => (
                  <Grid key={k} item>
                    <div
                      style={{
                        textAlign: 'center',
                        borderRadius: 10000,
                        background: 'rgba(0,0,0,.15)',
                        padding: '.25rem',
                      }}
                    >
                      "({k})" = <MtgSymbol shadow>{k}</MtgSymbol>
                    </div>
                  </Grid>
                ))}{' '}
                <Grid item sx={{ textAlign: 'center' }}>
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '.25rem',
                      borderRadius: 10000,
                      background: 'rgba(0,0,0,.15)',
                    }}
                  >
                    "CARDNAME" = [card.name]
                  </div>
                </Grid>
                <Grid item sx={{ textAlign: 'center' }}>
                  {' '}
                  <div
                    style={{
                      textAlign: 'center',
                      padding: '.25rem',
                      borderRadius: 10000,
                      background: 'rgba(0,0,0,.15)',
                    }}
                  >
                    SHIFT + ENTER = [new line]
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <CardGrid columns={3} cards={sampleCards} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
