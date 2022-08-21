import { Alert, Container, Grid, Typography, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { WarningOutlined } from '@mui/icons-material';
import { CardGrid } from '@mse/ui';
import * as mse from '@mse/types';
const sampleCards: mse.Card[] = [
  {
    id: '1',
    name: 'Doomed Traveler',
    manaCost: '{{mana_w}}',
    num: 1,
    types: ['Creature'],
    subtypes: ['Human', 'Soldier'],
    power: 1,
    artworkSrc:
      'https://cdn.inprnt.com/thumbs/ab/90/ab90888365216c96f97cb7cb455c827a.jpg?response-cache-control=max-age=2628000',
    toughness: 1,
    rulesText: [
      'When Doomed Traveler dies, create a 1/1 white Spirit creature token with flying.',
    ],
    flavorText:
      'He vowed he would never rest until he reached his destination. He doesn’t know how right he was.',
    template: 'm15',
  },
  {
    id: '2',
    name: 'Explore',
    manaCost: '{{1 mana_g}}',
    num: 2,
    types: ['Sorcery'],
    artworkSrc: 'https://assets.echomtg.com/magic/cards/cropped/66765.hq.jpg',
    rulesText: ['You may play an additional land this turn.', 'Draw a card.'],
    flavorText: "An explorer lorem ipsum's it up baby.",
    template: 'm15',
  },
];
export default function HomePage() {
  const theme = useTheme();
  useEffect(() => console.log(theme), [theme]);

  return (
    <Container maxWidth='xl'>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Typography variant={'h1'} align='center'>
            Magic Editor Online
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
          <CardGrid
            columns={3}
            cards={sampleCards
              .concat(sampleCards)
              .concat(sampleCards.concat(sampleCards))}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
