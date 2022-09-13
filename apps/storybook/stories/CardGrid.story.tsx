import { Card, Color } from '@mse/types';
import { CardGrid } from '@mse/ui.card';
import '@mse/assets/fonts/beleren/index.css';
import sampleCards from '@mse/sample-cards';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'CardGrid',
  component: CardGrid,
  argTypes: {
    cards: {
      control: { type: 'object' },
      defaultValue: sampleCards,
    },
    columns: { defaultValue: 3 },
  },
};

export const CardStory = ({
  cards,
  columns,
}: {
  cards: Card[];
  columns: number;
}) => <CardGrid cards={cards} columns={columns} />;
CardStory.storyName = 'CardGrid';
