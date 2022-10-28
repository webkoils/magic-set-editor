import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../cardComponentStyles';
import { CardField } from '../../CardField/CardField';
import { CardFieldWithoutSymbols } from '../../CardField/CardFieldNoSymbols';

export const TopLine: React.FC<mtg.MseCardComponentProps> = () => {
  return (
    <div className={templateClasses.topline}>
      <CardFieldWithoutSymbols id={'name'} className={templateClasses.name} />

      <CardFieldWithoutSymbols
        id={'manaCost'}
        className={templateClasses.cost}
      />
    </div>
  );
};
