import React from 'react';
import * as mtg from '@mse/types';
import {
  CardStateClassNames,
  CardTemplateClassNames as templateClasses,
} from '@mse/templates.m15';
import { CardField } from '../../CardField/CardField';
import { useCardContext } from '../..';
import classNames from 'classnames';
export const TextBox: React.FC<mtg.MseCardComponentProps> = () => {
  const { card } = useCardContext();

  return (
    <div className={templateClasses.textBox}>
      <div
        className={classNames(templateClasses.rulesText, {
          [CardStateClassNames.empty]: !card.rulesText,
        })}
      >
        <CardField multiline id={'rulesText'} />
      </div>
      {card.flavorText && <div className={templateClasses.textBoxDivider} />}

      <div
        className={classNames(templateClasses.flavorText, {
          [CardStateClassNames.empty]: !card.flavorText,
        })}
      >
        <CardField multiline id={'flavorText'} />
      </div>
    </div>
  );
};
