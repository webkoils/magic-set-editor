import Grid from '@mui/material/Unstable_Grid2';
import { CardGrid, CardList } from '@mse/ui/core';
import sampleCards from '@mse/sample-cards';
import { Drawer } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { MseCard } from '@mse/types';
import { Card } from '../../../../packages/ui/card/src/Card/Card';
import { Sidebar } from '../../components/Layout/Sidebar';
import React from 'react';

export const WorkbenchGridView: React.FC<{
  cards: MseCard[];
  onCardChange: (cardId: string, updates: Partial<MseCard>) => void;
}> = ({ onCardChange, cards }) => {
  return (
    <Grid xs={12}>
      <CardGrid
        columns={4}
        cards={cards}
        editable
        onCardUpdated={onCardChange}
      />
    </Grid>
  );
};
