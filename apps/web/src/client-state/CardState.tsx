import { MseCard } from '@mse/types';
import { useUpdateMutation } from '@supabase-cache-helpers/postgrest-swr';
import { useSession } from '@supabase/auth-helpers-react';
import { useCallback, useMemo } from 'react';
import { client, toSnakeCaseMap } from './remote';
import { useCardSetContext } from './CardSetState';
export const useCardState = (cardId: string) => {
  const session = useSession();
  const { onCardUpdate, cards } = useCardSetContext();

  const card = useMemo(() => {
    return cards.find((c) => c.id === cardId);
  }, [cards, cardId]);

  const [mutateCard] = useUpdateMutation(client.from('cards'), ['id']);

  const updateCard = useCallback(
    async (updates: Partial<MseCard>) => {
      if (session?.user.id) {
        const fullUpdates = {
          ...toSnakeCaseMap(updates),
          updated_at: new Date().toISOString(),
          user_id: session.user.id,
          id: Number(cardId),
        };
        await mutateCard(fullUpdates);
        onCardUpdate(Number(cardId), fullUpdates);
      }
    },
    [mutateCard, cardId, onCardUpdate, session?.user.id]
  );
  return { card, updateCard };
};
