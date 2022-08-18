import styled from '@emotion/styled';
import React from 'react';
import * as mtg from '@mse/types';

const TypeLineContainer = styled('div')(({ theme }) => theme.components.type);

export const TypeLine: React.FC<mtg.CardComponentProps> = ({ card }) => {
  return (
    <TypeLineContainer>
      {card.supertype} {card.types.join(' ')}{' '}
      {card.subtypes && card.subtypes.length > 0 && ' – '}{' '}
      {card.subtypes?.join(' ')}
    </TypeLineContainer>
  );
};
