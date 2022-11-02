import React from 'react';
import * as mtg from '@mse/types';
import { CardTemplateClassNames as templateClasses } from '@mse/templates.m15';
import { CardField } from '../../CardField/CardField';

export const TopLine: React.FC<mtg.MseCardComponentProps> = () => {
  return (
    <div className={templateClasses.topLine}>
      <CardField id={'name'} className={templateClasses.name} />

      <CardField id={'manaCost'} className={templateClasses.cost} />
    </div>
  );
};
