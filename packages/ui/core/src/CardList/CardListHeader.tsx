import React from 'react';
import type { MseCard } from '@mse/types';
import { Box, styled } from '@mui/material';
import { useCallback } from 'react';
import { CardListColumn } from './types';

const ListItemColumnHeader = styled(Box)(() => {
  return {
    borderRight: '1px solid white',
    padding: '2px',
    fontSize: 18,
    fontWeight: 'bold',
    '&:first-of-type': { borderLeft: '1px solid white' },
    '&:hover': { backgroundColor: 'rgba(255,255,255,.15)' },
  };
});

export const CardListHeader: React.FC<{
  columns: CardListColumn[];
}> = ({ columns }) => {
  return (
    <Box
      sx={{
        cursor: 'pointer',
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        borderBottom: '1px solid white',
        backgroundColor: 'primary.dark',
      }}
    >
      {columns.map((c) => {
        return (
          <ListItemColumnHeader style={{ flexBasis: c.width }} key={c.label}>
            {c.label}
          </ListItemColumnHeader>
        );
      })}
    </Box>
  );
};
