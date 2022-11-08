import React from 'react';
import type { MseCard } from '@mse/types';
import { Box, styled } from '@mui/material';
import { useCallback } from 'react';
import { CardListColumn } from './types';
import classNames from 'classnames';

const ListItemColumn = styled(Box)(() => {
  return {
    borderRight: '1px solid white',
    padding: '2px 4px',
    '&:first-of-type': { borderLeft: '1px solid white' },
  };
});

export const CardListItem: React.FC<{
  card: MseCard;
  columns: CardListColumn[];
  selected?: boolean;
  onClick: (card: MseCard) => void;
}> = ({ card, onClick, columns, selected }) => {
  const boundOnClick = useCallback(() => onClick && onClick(card), [
    card,
    onClick,
  ]);
  return (
    <Box
      onClick={boundOnClick}
      className={classNames({ selected })}
      sx={{
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        borderBottom: '1px solid white',
        '&:nth-of-type(2n)': { backgroundColor: 'rgba(255,255,255,.05)' },

        '&:hover': { backgroundColor: 'rgba(255,255,255,.15)' },
        '&.selected': {
          backgroundColor: 'secondary.dark',
        },
      }}
    >
      {columns.map((c) => (
        <ListItemColumn key={c.label} style={{ flexBasis: c.width }}>
          {c.valueGetter(card)}
        </ListItemColumn>
      ))}
    </Box>
  );
};
