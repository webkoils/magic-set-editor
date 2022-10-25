import { Card } from '@mse/ui.card';
import * as mse from '@mse/types';

import { Mana, staticSymbols } from '@mse/symbols';

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'Mana',
  component: Mana.C,
};

export const ManaUStory = () => (
  <div style={{ fontSize: '100px' }}>
    <Mana.T />
    <Mana.PR shadow />
    <Mana.C shadow />
    <Mana.C shadow>1</Mana.C>
    <Mana.Inf shadow />
    <Mana.C shadow>12</Mana.C>
    <Mana.C shadow>200</Mana.C>
    <Mana.C shadow>X</Mana.C>
    <Mana.U shadow />
    <Mana.B shadow />
    <Mana.R shadow />
    <Mana.G shadow />
    <Mana.W shadow />
  </div>
);
ManaUStory.storyName = 'Mana';
