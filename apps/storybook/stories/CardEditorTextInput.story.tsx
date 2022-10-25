import { CardTextInput } from '@mse/ui.card';
import '@mse/assets/fonts/beleren/index.css';
import { CardTemplateProvider } from '@mse/ui.card';
import { CardProvider } from '@mse/ui.card';
import sampleCards from '@mse/sample-cards';
import * as mse from '@mse/types';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'CardTextInput',

  component: CardTextInput,
  argTypes: {
    card: { control: { type: 'object' }, defaultValue: sampleCards[1] },
  },
};

export const CardTextInputStory = ({
  initialValue,
  card,
}: {
  initialValue?: string;
  card: mse.Card;
}) => {
  return (
    <CardProvider card={card}>
      <CardTemplateProvider template={'m15'}>
        <CardTextInput initialValue={card.manaCost} />
      </CardTemplateProvider>
    </CardProvider>
  );
};
CardTextInputStory.storyName = 'CardTextInput';
