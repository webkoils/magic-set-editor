import { Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { CardGrid } from '@mse/ui/core';
import sampleCards from '@mse/sample-cards';
import { MtgSymbol } from '@mse/ui.symbols';
import { useRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
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

export default function WorkbenchDetailPage() {
  const router = useRouter();

  const { setId, cardId } = useMemo(() => {
    if (router.isReady) {
      if (router.query.slug) {
        return { setId: router.query.slug[0], cardId: router.query.slug[1] };
      }
    }
    return {};
  }, [router]);

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={5}>
        <Grid xs={12}>
          <CardGrid columns={3} cards={sampleCards} />
        </Grid>
      </Grid>
    </Container>
  );
}
