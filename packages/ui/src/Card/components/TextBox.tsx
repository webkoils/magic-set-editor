import styled from '@emotion/styled';
import React from 'react';
import * as mtg from '@mse/types';
import { FormattedText } from './FormattedText';

const TextBoxContainer = styled('div')(({ theme }) => theme.components.textbox);
const RulesText = styled('span')(({ theme }) => theme.components.rulestext);
const FlavorText = styled('span')(({ theme }) => theme.components.flavortext);
const TextDivider = styled('div')(({ theme }) => theme.components.textDivider);

export const TextBox: React.FC<mtg.CardComponentProps> = ({ style, card }) => {
  return (
    <TextBoxContainer>
      {card.rulesText.map((text) => (
        <RulesText key={text}>
          <FormattedText text={text} size='small' />
        </RulesText>
      ))}
      {card.flavorText && (
        <>
          <TextDivider />
          <FlavorText>
            <FormattedText text={card.flavorText} size='small' />
          </FlavorText>
        </>
      )}
    </TextBoxContainer>
  );
};
