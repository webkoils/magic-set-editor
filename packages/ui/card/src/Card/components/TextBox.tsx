import React from 'react';
import * as mtg from '@mse/types';
import { FormattedText } from './FormattedText';
import { templateClasses } from '../cardComponentStyles';
import { CardTextInput } from '../../index';
import { CardField } from '../../CardField/CardField';
import { CardFieldWithoutSymbols } from '../../CardField/CardFieldNoSymbols';
import { useCardContext } from '../..';
export const TextBox: React.FC<mtg.MseCardComponentProps> = () => {
  const { card } = useCardContext();

  return (
    <div className={templateClasses.textbox}>
      <CardFieldWithoutSymbols
        multiline
        id={'rulesText'}
        className={templateClasses.rulestext}
      />

      {card.flavorText && <div className={templateClasses.textdivider} />}
      <CardFieldWithoutSymbols
        multiline
        id={'flavorText'}
        className={templateClasses.flavortext}
      />
    </div>
  );
};
