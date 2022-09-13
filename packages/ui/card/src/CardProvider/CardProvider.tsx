import { Card } from '@mse/types';
import { createContext, useContext, FC, PropsWithChildren } from 'react';
export const CardContext = createContext<Card | undefined>(undefined);

export const CardProvider: FC<PropsWithChildren<{
  card: Card;
}>> = ({ card, children }) => {
  return <CardContext.Provider value={card}>{children}</CardContext.Provider>;
};

export const useCardContext = () => {
  const card = useContext(CardContext);
  if (typeof card === 'undefined')
    throw new Error('Card not set in context. Wrap in <CardProvider>');
  return card;
};
