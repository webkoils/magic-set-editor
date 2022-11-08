import Grid from '@mui/material/Unstable_Grid2';
import { CardGrid, CardList } from '@mse/ui/core';
import sampleCards from '@mse/sample-cards';
import { Box, Drawer } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MseCard } from '@mse/types';
import { Card } from '../../../../packages/ui/card/src/Card/Card';
import { Sidebar } from '../../components/Layout/Sidebar';
import { WorkbenchGridView } from './WorkbenchGridView';
import { WorkbenchListView } from './WorkbenchListView';
import { useMseClient, useCardSetState } from '../../state/ClientDataState';
import { WorkbenchToolbar } from './WorkbenchToolbar';
import { getCardIdentity } from '@mse/utils/card';

export interface WorkbenchProps {
  setId: string;
}

export const Workbench: React.FC<WorkbenchProps> = ({ setId = '1' }) => {
  const { cards, updateCard, addCard, updateSet, deleteCard } = useMseClient();
  const [currentViewType, setCurrentViewType] = useState<'list' | 'grid'>(
    'list'
  );
  const cardList = useMemo(
    () =>
      Object.values(cards).map((c) => ({ ...c, identity: getCardIdentity(c) })),
    [cards]
  );
  const onCardUpdate = useCallback((id: string, updates: Partial<MseCard>) => {
    updateCard({ ...updates, id });
  }, []);

  const currentView = useMemo(() => {
    switch (currentViewType) {
      case 'grid': {
        return (
          <WorkbenchGridView onCardChange={onCardUpdate} cards={cardList} />
        );
      }
      case 'list': {
        return (
          <WorkbenchListView onCardChange={onCardUpdate} cards={cardList} />
        );
      }
    }
  }, [cardList, onCardUpdate]);

  return (
    <Box sx={{ height: '100%' }}>
      <WorkbenchToolbar />
      {currentView}
    </Box>
  );
};
