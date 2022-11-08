import React, { useRef } from 'react';
import type { MseCard } from '@mse/types';
import { useElementSize } from '@mse/utils.autosizer';
import { Box } from '@mui/material';
import { CardListItem } from './CardListItem';
import { CardListHeader } from './CardListHeader';
import { CardListColumn } from './types';

import { manaSymbolMapping, parseText } from '@mse/utils/symbolRenderer';

const columns: CardListColumn[] = [
  { label: 'Name', valueGetter: (card) => card.name, width: '20%' },
  {
    label: 'Cost',
    valueGetter: (card) =>
      !card.manaCost
        ? '-'
        : parseText(card.manaCost, manaSymbolMapping, card).flat(),
    width: '20%',
  },
  { label: 'Types', valueGetter: (card) => card.types, width: '20%' },
  { label: 'Subtypes', valueGetter: (card) => card.subtypes, width: '20%' },
  {
    label: 'PT',
    valueGetter: (card) =>
      card.power || card.toughness ? card.power + '/' + card.toughness : '-',
    width: '20%',
  },
];

export const CardList: React.FC<{
  cards: MseCard[];
  selected?: string[];
  onClick: (card: MseCard) => void;
}> = ({ cards, onClick, selected = [] }) => {
  const listRef = useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ borderTop: '1px solid white' }} component='div' ref={listRef}>
      <CardListHeader columns={columns} />
      {cards.map((c) => (
        <CardListItem
          columns={columns}
          card={c}
          key={c.id}
          onClick={onClick}
          selected={selected.includes(c.id)}
        />
      ))}
    </Box>
  );
};
