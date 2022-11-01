import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../../CardTemplate/CardTemplate';
import { CardFieldWithoutSymbols } from '../../CardField/CardFieldNoSymbols';
import { useCardContext } from '../..';
export const TextBox: React.FC<mtg.MseCardComponentProps> = () => {
  const { card } = useCardContext();

  return (
    <div className={templateClasses.textBox.root}>
      <CardFieldWithoutSymbols
        multiline
        id={'rulesText'}
        className={templateClasses.textBox.rulesText}
      />

      {card.flavorText && (
        <div className={templateClasses.textBox.textBoxDivider} />
      )}
      <CardFieldWithoutSymbols
        multiline
        id={'flavorText'}
        className={templateClasses.textBox.flavorText}
      />
    </div>
  );
};
