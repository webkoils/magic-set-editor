import { MseCard } from '@mse/types';
import { Card } from '@mse/ui/card';
import { useCallback, useEffect } from 'react';
import { useCardState } from '../../state';

export const EditCard = ({
  cardId,
  scale = 1,
}: {
  cardId: string;
  scale?: number;
}) => {
  const [card, updateCard] = useCardState(cardId);
  const onChange = useCallback(
    (updates: Partial<MseCard>) => {
      updateCard((currentCard) =>
        currentCard ? { ...currentCard, ...updates } : null
      );
    },
    [updateCard]
  );
  useEffect(() => console.log(card), [card]);
  return card ? (
    <Card editable scale={scale} card={card} onChange={onChange} />
  ) : (
    <> Empty</>
  );
};
