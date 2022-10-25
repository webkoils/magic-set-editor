import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../cardComponentStyles';
import { CardField } from '../../CardField/CardField';

export const TopLine: React.FC<mtg.MseCardComponentProps> = () => {
  return (
    <div className={templateClasses.topline}>
      <CardField id={'name'} className={templateClasses.name} />

      <CardField id={'manaCost'} className={templateClasses.cost} />
    </div>
  );
};
