import { MseCard } from '@mse/types';
import {
  createContext,
  useContext,
  FC,
  PropsWithChildren,
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { useCardState } from './cardState';

export const CardContext = createContext<
  | {
      card: MseCard;
      editable?: boolean;
      onChange: (changes: Partial<MseCard>) => void;
    }
  | undefined
>(undefined);

export const CardProvider: FC<PropsWithChildren<{
  card: MseCard;
  editable?: boolean;
  onChange: (changes: Partial<MseCard>) => void;
}>> = ({ card, editable, children, onChange }) => {
  const cardState = useMemo(() => ({ card, editable, onChange }), [
    card,
    editable,
    onChange,
  ]);

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
