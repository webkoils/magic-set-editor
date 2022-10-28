import { Card } from '@mse/ui.card';
import * as mse from '@mse/types';

import { MtgSymbol, MtgSymbolProvider } from '@mse/symbols';
export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'MtgSymbol',
  component: MtgSymbol,
};

export const ManaStory = () => (
  <div style={{ fontSize: '100px' }}>
    <MtgSymbolProvider>
      {' '}
      <MtgSymbol height='100'>T</MtgSymbol>{' '}
      <MtgSymbol height='100'>W</MtgSymbol>{' '}
      <MtgSymbol height='100'>B/W/G</MtgSymbol>{' '}
      <MtgSymbol height='100'>PG/PW</MtgSymbol>
    </MtgSymbolProvider>
  </div>
);
ManaStory.storyName = 'Mana';
