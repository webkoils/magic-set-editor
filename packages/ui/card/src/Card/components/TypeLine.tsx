import React from 'react';
import * as mtg from '@mse/types';
import { CardTemplateClassNames as templateClasses } from '@mse/templates.m15';
import { useCardContext } from '../../index';
import { CardField } from '../../CardField/CardField';

export const TypeLine: React.FC<mtg.MseCardComponentProps> = ({}) => {
  const { card } = useCardContext();

  return (
    <div className={templateClasses.typeLine}>
      <CardField
        id='types'
        // className={templateClasses.typeLine}
      />
      <div className={templateClasses.typeLineDivider}>
        {card.subtypes?.length ? '-' : ''}
      </div>
      <CardField
        id='subtypes'
        // className={templateClasses.typeLine.input}
      />
    </div>
  );
};
