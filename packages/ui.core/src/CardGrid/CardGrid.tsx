import { FC, useCallback, useMemo, useRef } from 'react';
import { Card } from '@mse/ui.card';
import * as mtg from '@mse/types';
import { useElementSize } from '@mse/utils.autosizer';
import { MseCard } from '@mse/types';

export const CardGrid: FC<{
  cards: mtg.MseCard[];
  columns?: number;
  readonly?: boolean;
  renderCell?: (card: MseCard) => JSX.Element;
  onCardUpdated?: (cardId: string, cardUpdates: Partial<MseCard>) => void;
}> = ({ cards, columns = 3, readonly, onCardUpdated = () => undefined }) => {
  const sizerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useElementSize(sizerRef, 'abc');

  const colWidth = useMemo(() => {
    return width / columns;
  }, [width, columns]);

  const columnWidth = useMemo(() => {
    return 100 / columns;
  }, [columns]);

  const rowHeight = useMemo(() => {
    return (533 * colWidth) / 385;
  }, [colWidth]);

  const rows = useMemo(
    () => Math.ceil(cards.length / columns),
    [cards?.length, columns]
  );

  const onCardChange = useCallback(
    (cardId: string) => {
      return (updates: Partial<MseCard>) =>
        onCardUpdated(cardId, { ...updates });
    },
    [onCardUpdated]
  );

  return (
    <div
      ref={sizerRef}
      style={{
        display: 'grid',

        gridTemplateColumns: `repeat(${columns}, ${columnWidth}%)`,
        gridTemplateRows: `repeat(${rows}, ${rowHeight}px)`,

        width: '100%',
      }}
    >
      {cards.map((card) => {
        return (
          <div
            key={card.id}
            style={{
              gridColumn: 'auto',
              gridRow: 'auto',
              height: rowHeight,
              position: 'relative',
            }}
          >
            <Card
              card={card}
              readonly={readonly}
              onChange={onCardChange(card.id)}
              width={colWidth}
            />
          </div>
        );
      })}
    </div>
  );
};
