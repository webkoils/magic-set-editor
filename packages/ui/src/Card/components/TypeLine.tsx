import styled from '@emotion/styled';
import React from 'react';
import { mtg } from '../../typings/mtg';

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
