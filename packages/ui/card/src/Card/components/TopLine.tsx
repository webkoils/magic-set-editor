import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../../CardTemplate';
import { CardField } from '../../CardField/CardField';

export const TopLine: React.FC<mtg.MseCardComponentProps> = () => {
  return (
    <div className={templateClasses.card.topLine}>
      <CardField id={'name'} className={templateClasses.card.name} />

      <CardField id={'manaCost'} className={templateClasses.card.cost} />
    </div>
  );
};
