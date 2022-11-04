import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../../CardTemplate';

import { CardField } from '../../CardField/CardField';
import { useCardContext } from '../..';
import classNames from 'classnames';
export const TextBox: React.FC<mtg.MseCardComponentProps> = () => {
  const { card } = useCardContext();

  return (
    <div className={templateClasses.card.textBox}>
      <div
        className={classNames(templateClasses.card.rulesText, {
          [templateClasses.state.empty]: !card.rulesText,
        })}
      >
        <CardField multiline id={'rulesText'} />
      </div>
      {card.flavorText && (
        <div className={templateClasses.card.textBoxDivider} />
      )}

      <div
        className={classNames(templateClasses.card.flavorText, {
          [templateClasses.state.empty]: !card.flavorText,
        })}
      >
        <CardField multiline id={'flavorText'} />
      </div>
    </div>
  );
};
