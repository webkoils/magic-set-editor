import { Container, Grid } from '@mui/material';
import { CardGrid } from '@mse/ui.card';
import sampleCards from '@mse/sample-cards';
export default function HomePage() {
  return (
    <Container maxWidth='xl'>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <CardGrid columns={3} cards={sampleCards} />
        </Grid>
      </Grid>
    </Container>
  );
}
