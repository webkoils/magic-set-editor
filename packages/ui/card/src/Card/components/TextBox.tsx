import React from 'react';
import * as mtg from '@mse/types';
import { FormattedText } from './FormattedText';
import { templateClasses } from '../cardComponentStyles';
export const TextBox: React.FC<mtg.CardComponentProps> = ({ card }) => {
  return (
    <div className={templateClasses.textbox}>
      {card.rulesText.map((text) => (
        <span key={text} className={templateClasses.rulestext}>
          <FormattedText text={text} size='small' />
        </span>
      ))}
      {card.flavorText && (
        <>
          <div className={templateClasses.textdivider} />
          <span className={templateClasses.flavortext}>
            <FormattedText text={card.flavorText} size='small' />
          </span>
        </>
      )}
    </div>
  );
};
