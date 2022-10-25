import { MseCard } from '@mse/types';
import {
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  useRef,
  useEffect,
  useState,
} from 'react';
import { useCardState } from './cardState';

export const CardContext = createContext<
  ReturnType<typeof useCardState> | undefined
>(undefined);

export const CardProvider: FC<PropsWithChildren<{
  card: MseCard;
  editable?: boolean;
}>> = ({ card, editable, children }) => {
  const cardState = useCardState(card, editable);

  return (
    <CardContext.Provider value={cardState}>{children}</CardContext.Provider>
  );
};

export const useCardContext = () => {
  const card = useContext(CardContext);
  if (typeof card === 'undefined')
    throw new Error('Card not set in context. Wrap in <CardProvider>');
  return card;
};
