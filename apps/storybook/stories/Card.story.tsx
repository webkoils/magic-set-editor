import { Card } from '@mse/ui/card';
import * as mse from '@mse/types';
import '@mse/fonts.beleren/index.css';

import sampleCards from '@mse/sample-cards';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Card',
  component: Card,
  argTypes: {
    card: { control: { type: 'object' }, defaultValue: sampleCards[0] },
  },
};

export const CardStory = ({ card }: { card: mse.MseCard }) => (
  <div style={{ display: 'flex', width: '100%', flexFlow: 'row nowrap' }}>
    <div style={{ width: 375, height: 523 }}>
      <Card card={card} />
    </div>
  </div>
);
CardStory.storyName = 'Card';
