import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../../CardTemplate/index';
import { CardField } from '../../CardField/CardField';

export const TypeLine: React.FC<mtg.MseCardComponentProps> = ({
  card,
  onChange,
  readonly,
}) => {
  return (
    <div className={templateClasses.card.typeLine}>
      <CardField
        id='types'
        card={card}
        onChange={onChange}
        readonly={readonly}
        // className={templateClasses.typeLine}
      />
      <div className={templateClasses.card.typeLineDivider}>
        {card?.subtypes?.length ? '-' : ''}
      </div>
      <CardField
        id='subtypes'
        card={card}
        onChange={onChange}
        readonly={readonly}
        // className={templateClasses.typeLine.input}
      />
    </div>
  );
};
