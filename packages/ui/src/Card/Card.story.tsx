import { mtg } from '../typings/mtg';
import { Card } from './Card';
import { FormattedText } from './components/FormattedText';
import '@mse/assets/fonts/beleren/index.css';

const sampleCards: mtg.Card[] = [
  {
    id: '1',
    name: 'Doomed Traveler',
    manaCost: '{{mana_w}}',
    num: 1,
    color: [mtg.Color.WHITE],
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
  },
  {
    id: '2',
    name: 'Explore',
    manaCost: '{{1 mana_g}}',
    num: 2,
    color: [mtg.Color.GREEN],
    types: ['Sorcery'],
    artworkSrc: 'https://assets.echomtg.com/magic/cards/cropped/66765.hq.jpg',
    rulesText: ['You may play an additional land this turn.', 'Draw a card.'],
    flavorText: "An explorer lorem ipsum's it up baby.",
  },
];

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Card',
  component: Card,
  argTypes: {
    card: { control: { type: 'object' }, defaultValue: sampleCards[1] },
  },
};

export const CardStory = ({ card }: { card: mtg.Card }) => (
  <>
    <div style={{ width: 350, height: 'auto' }}>
      <Card card={card} />
    </div>
    <div style={{ width: 350, height: 'auto' }}>
      <Card card={sampleCards[0]} />
    </div>
  </>
);
CardStory.storyName = 'Card';

export const CardFormattedTextStory = () => (
  <div style={{ width: 350, height: 100, fontSize: 16 }}>
    <FormattedText text={sampleCards[0].manaCost} />
  </div>
);
CardFormattedTextStory.storyName = 'FormattedText';
