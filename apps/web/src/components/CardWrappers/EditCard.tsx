import { MseCard } from '@mse/types';
import { Card } from '@mse/ui.card';
import { useCallback } from 'react';
import { useCardState } from '../../client-state/CardState';

export const EditCard = ({
  cardId,
  width,
  height,
}: {
  cardId: string;
  width?: number;
  height?: number;
}) => {
  const { card, updateCard } = useCardState(cardId);
  const onChange = useCallback(
    (updates: Partial<MseCard>) => {
      updateCard(updates);
    },
    [updateCard]
  );
  return card ? (
    <Card
      editable
      width={width}
      height={height}
      card={card}
      onChange={onChange}
    />
  ) : (
    <> Empty</>
  );
};
