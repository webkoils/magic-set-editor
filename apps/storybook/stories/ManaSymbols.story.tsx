import { MtgSymbol, MtgSymbolProvider } from '@mse/ui.symbols';
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
      <MtgSymbol height='100'>PG/PW</MtgSymbol>{' '}
      <MtgSymbol height='100'>11</MtgSymbol>
      <MtgSymbol height='100'>25</MtgSymbol>
      <MtgSymbol height='100'>3</MtgSymbol>
      <MtgSymbol height='100'>10</MtgSymbol>
    </MtgSymbolProvider>
  </div>
);
ManaStory.storyName = 'Mana';
