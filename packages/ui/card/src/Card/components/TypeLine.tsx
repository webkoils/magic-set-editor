import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../cardComponentStyles';
import { useCardContext } from '../../index';

export const TypeLine: React.FC<mtg.MseCardComponentProps> = ({}) => {
  const { card } = useCardContext();
  return (
    <div className={templateClasses.type}>
      {card.supertype} {card.types.join(' ')}{' '}
      {card.subtypes && card.subtypes.length > 0 && ' – '}{' '}
      {card.subtypes?.join(' ')}
    </div>
  );
};
