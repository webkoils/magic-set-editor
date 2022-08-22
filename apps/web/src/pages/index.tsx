import { Alert, Container, Grid, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { CardGrid } from '@mse/ui';
import sampleCards from '@mse/sample-cards';
export default function HomePage() {
  const theme = useTheme();
  useEffect(() => console.log(theme), [theme]);

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant={'h1'} align='center'>
            Magic Set Editor Online
          </Typography>
        </Grid>
        <Grid container item spacing={2}>
          <Grid item>
            <Alert severity='error' variant='outlined'>
              <Typography variant='h6'>DISCLAIMER</Typography>
              <Typography variant='body1' gutterBottom>
                This a totally free, open-source project. Magic Set Editor
                Online is intended for creating custom cards only, and should
                not be used to attempt the creation or distribution of
                counterfeits of real items produced by Wizards of the Coast,
                Konami, or other companies. Nor should any custom cards
                generated be passed off as if they are real in any setting.
              </Typography>
              <Typography variant='body1' gutterBottom>
                Magic the Gathering is a trademark of Wizards of the Coast,
                Inc., a subsidiary of Hasbro, Inc. All other trademarks are
                owned by whoever owns them.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <CardGrid columns={3} cards={sampleCards} />
        </Grid>
      </Grid>
    </Container>
  );
}
