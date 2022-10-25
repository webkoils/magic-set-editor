import { SymbolInput } from '@mse/symbol-input';
import '@mse/assets/fonts/beleren/index.css';
import sampleCards from '@mse/sample-cards';
import { manaSymbolMapping } from '@mse/symbols';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'SymbolInput',
  component: SymbolInput,
};

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
export const SymbolInputStory = () => (
  <SymbolInput
    value={'(PU)'}
    onChange={console.log}
    options={{
      maxLines: 2,
      symbols: manaSymbolMapping,
      delimeters: [
        { code: '(', start: true },
        { code: ')', end: true },
      ],
    }}
  />
);
SymbolInputStory.storyName = 'SymbolInput';
