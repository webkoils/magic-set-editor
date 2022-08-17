import styled from '@emotion/styled';
import React from 'react';
import { mtg } from '../../typings/mtg';
import { FormattedText } from './FormattedText';

const TopLineContainer = styled('div')(({ theme }) => ({
  ...theme.components[mtg.CardComponentType.TOPLINE],
}));

const Name = styled('div')(({ theme }) => ({
  ...theme.components[mtg.CardComponentType.NAME],
}));

const Cost = styled('div')(({ theme }) => ({
  ...theme.components[mtg.CardComponentType.COST],
}));
export const TopLine: React.FC<mtg.CardComponentProps> = ({ card }) => {
  return (
    <TopLineContainer>
      <Name>{card.name}</Name>

      <Cost>
        <FormattedText text={card.manaCost} size='large' />
      </Cost>
    </TopLineContainer>
  );
};
