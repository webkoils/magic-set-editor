import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../../CardTemplate/CardTemplate';
import { useCardContext } from '../../index';
import { CardFieldWithoutSymbols } from '../../CardField/CardFieldNoSymbols';

export const TypeLine: React.FC<mtg.MseCardComponentProps> = ({}) => {
  const { card } = useCardContext();

  return (
    <div className={templateClasses.typeLine.root}>
      <CardFieldWithoutSymbols
        id='types'
        className={templateClasses.typeLine.input}
      />
      <div className={templateClasses.typeLine.divider}>
        {card.subtypes?.length ? '-' : ''}
      </div>
      <CardFieldWithoutSymbols
        id='subtypes'
        className={templateClasses.typeLine.input}
      />
    </div>
  );
};
