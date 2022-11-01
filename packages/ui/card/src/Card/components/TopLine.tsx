import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../../CardTemplate';
import { CardField } from '../../CardField/CardField';
import { CardFieldWithoutSymbols } from '../../CardField/CardFieldNoSymbols';

export const TopLine: React.FC<mtg.MseCardComponentProps> = () => {
  return (
    <div className={templateClasses.topLine.root}>
      <CardFieldWithoutSymbols
        id={'name'}
        className={templateClasses.topLine.name}
      />

      <CardFieldWithoutSymbols
        id={'manaCost'}
        className={templateClasses.topLine.cost}
      />
    </div>
  );
};
