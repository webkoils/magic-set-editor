import { FC, useEffect, useRef } from 'react';
import { Card } from '../Card';
import * as mtg from '@mse/types';
import { useElementSize } from '../hooks/useElementSize';

export const CardGrid: FC<{ cards: mtg.Card[]; columns?: number }> = ({
  cards,
  columns = 3,
}) => {
  const sizerRef = useRef<HTMLDivElement | null>(null);
  // const { width } = useElementSize(sizerRef, 'abc');
  return (
    <div
      style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
        width: '100%',
        margin: 'auto',
      }}
      ref={sizerRef}
    >
      {cards.map((card) => {
        return (
          <div
            key={card.id}
            style={{
              flex: '0 0 ' + (100 / columns - 2) + '%',
              height: 'auto',
              position: 'relative',
              margin: '1%',
            }}
          >
            <Card card={card} />
          </div>
        );
      })}
    </div>
  );
};
