import React from 'react';
import * as mtg from '@mse/types';
import { FormattedText } from './FormattedText';
import { templateClasses } from '../../CardTemplate/CardTemplate';
import { CardTextInput } from '../../index';
import { CardField } from '../../CardField/CardField';
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
