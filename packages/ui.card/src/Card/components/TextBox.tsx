import React from 'react';
import * as mtg from '@mse/types';
import { templateClasses } from '../../CardTemplate/index';

import { CardField } from '../../CardField/CardField';
import classNames from 'classnames';
export const TextBox: React.FC<mtg.MseCardComponentProps> = ({
  card,
  onChange,
  readonly,
}) => {
  return (
    <div className={templateClasses.card.textBox}>
      <div
        className={classNames(templateClasses.card.rulesText, {
          [templateClasses.state.empty]: !card?.rulesText,
        })}
      >
        <CardField
          multiline
          id={'rulesText'}
          card={card}
          onChange={onChange}
          readonly={readonly}
        />
      </div>
      {card?.flavorText && (
        <div className={templateClasses.card.textBoxDivider} />
      )}

      <div
        className={classNames(templateClasses.card.flavorText, {
          [templateClasses.state.empty]: !card?.flavorText,
        })}
      >
        <CardField
          multiline
          id={'flavorText'}
          card={card}
          onChange={onChange}
          readonly={readonly}
        />
      </div>
    </div>
  );
};
