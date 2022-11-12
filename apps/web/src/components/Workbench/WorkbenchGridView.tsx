import { FC, useMemo, useRef } from 'react';
import { useElementSize } from '@mse/utils.autosizer';
import { EditCard } from '../CardWrappers/EditCard';
import { useCardSetContext } from '../../client-state/CardSetState';
export const WorkbenchGridView: FC<{ columns: number }> = ({ columns }) => {
  const { sortedAndFilteredCards } = useCardSetContext();
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
