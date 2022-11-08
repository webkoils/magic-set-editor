import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../../CardTemplate/index';
import { useCardContext } from '../../index';
import { CardField } from '../../CardField/CardField';

export const TypeLine: React.FC<mtg.MseCardComponentProps> = ({}) => {
  const { card } = useCardContext();

  return (
    <div className={templateClasses.card.typeLine}>
      <CardField
        id='types'
        // className={templateClasses.typeLine}
      />
      <div className={templateClasses.card.typeLineDivider}>
        {card.subtypes?.length ? '-' : ''}
      </div>
      <CardField
        id='subtypes'
        // className={templateClasses.typeLine.input}
      />
    </div>
  );
};
