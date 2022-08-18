import { FC } from 'react';
import { Card } from 'src/Card/Card';
import * as mtg from '@mse/types';

export const CardGrid: FC<{ cards: mtg.Card[] }> = ({ cards }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
        width: '100%',
        margin: 'auto',
      }}
    >
      {cards.map((card) => {
        return (
          <div
            key={card.id}
            style={{ flex: '0 0 300px', height: 'auto', position: 'relative' }}
          >
            <Card card={card} scale={300 / 375} />
          </div>
        );
      })}
    </div>
  );
};
