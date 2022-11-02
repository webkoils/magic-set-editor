import {
  Container,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { CardGrid } from '@mse/ui.card';
import sampleCards from '@mse/sample-cards';
import { MtgSymbol } from '@mse/symbols';
const symbolKeys = [
  'W',
  'U',
  'B',
  'R',
  'G',
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
    <Container maxWidth='xl'>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant='h4'>Cheatsheet:</Typography>
          <Grid container spacing={2}>
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
  );
}
