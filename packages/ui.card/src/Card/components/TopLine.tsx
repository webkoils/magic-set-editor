import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../../CardTemplate/index';
import { CardField } from '../../CardField/CardField';

export const TopLine: React.FC<mtg.MseCardComponentProps> = ({
  card,
  onChange,
  readonly,
}) => {
  return (
    <div className={templateClasses.card.topLine}>
      <CardField
        id={'name'}
        className={templateClasses.card.name}
        card={card}
        onChange={onChange}
        readonly={readonly}
      />

      <CardField
        id={'manaCost'}
        className={templateClasses.card.cost}
        card={card}
        onChange={onChange}
        readonly={readonly}
      />
    </div>
  );
};
