import { mtg } from '../typings/mtg';
import { Card } from './Card';
import { CardFormattedText } from './components/CardFormattedText';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Card',
  component: Card,
};

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
    toughness: 1,
    rulesText: [
      'When Doomed Traveler dies, create a 1/1 white Spirit creature token with flying.',
    ],
    flavorText:
      'He vowed he would never rest until he reached his destination. He doesn’t know how right he was.',
  },
];

export const CardStory = () => (
  <div style={{ width: 350, height: 'auto' }}>
    <Card card={sampleCards[0]} />
  </div>
);
CardStory.storyName = 'Card';

export const CardFormattedTextStory = () => (
  <div style={{ width: 350, height: 100, fontSize: 16 }}>
    <CardFormattedText text={sampleCards[0].manaCost} />
  </div>
);
CardFormattedTextStory.storyName = 'CardFormattedText';
