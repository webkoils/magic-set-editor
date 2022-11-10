import { FC, useCallback, useMemo, useRef } from 'react';
import { Card } from '@mse/ui/card';
import * as mtg from '@mse/types';
import { useElementSize } from '@mse/utils/autosizer';
import { MseCard } from '@mse/types';
import { EditCard } from '../CardWrappers/EditCard';
import { useCardSetContext } from '../../client-state/CardSetState';
const columns = 3;
export const WorkbenchGridView: FC<{}> = () => {
  const { filters, sortedAndFilteredCards } = useCardSetContext();
  const sizerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useElementSize(sizerRef, 'abc');

  const colWidth = useMemo(() => {
    return width / columns;
  }, [width, columns]);

  const columnWidth = useMemo(() => {
    return 100 / columns;
  }, [width, columns]);

  const rowHeight = useMemo(() => {
    return (533 * colWidth) / 385;
  }, [colWidth]);

  const rows = useMemo(
    () => Math.ceil(sortedAndFilteredCards.length / columns),
    [sortedAndFilteredCards?.length, columns]
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
      {sortedAndFilteredCards.map((card) => {
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
            <EditCard cardId={card.id} width={colWidth} />
          </div>
        );
      })}
    </div>
  );
};
