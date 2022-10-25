import React from 'react';
import * as mtg from '@mse/types';
import { FormattedText } from './FormattedText';
import { templateClasses } from '../cardComponentStyles';
import { CardTextInput } from '../../index';
import { CardField } from '../../CardField/CardField';
const symbolProps = { shadow: true };
export const TextBox: React.FC<mtg.MseCardComponentProps> = ({ card }) => {
  return (
    <div className={templateClasses.textbox}>
      <CardField
        multiline
        id={'rulesText'}
        className={templateClasses.rulestext}
      />

      {card.flavorText && <div className={templateClasses.textdivider} />}
      <CardField
        multiline
        id={'flavorText'}
        className={templateClasses.flavortext}
      />
    </div>
  );
};
