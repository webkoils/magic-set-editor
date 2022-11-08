import Grid from '@mui/material/Unstable_Grid2';
import { CardTable, CardList } from '@mse/ui/core';
import sampleCards from '@mse/sample-cards';
import { Box, Drawer, Paper } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MseCard } from '@mse/types';
import { Card } from '@mse/ui/card';
import { Sidebar } from '../../components/Layout/Sidebar';
import { useCallback } from 'react';
import { useElementSize } from '@mse/utils/useElementSize';
import { EditCard } from '../CardWrappers/EditCard';

export const WorkbenchListView: React.FC<{
  cards: MseCard[];
  onCardChange: (cardId: string, updates: Partial<MseCard>) => void;
}> = ({ onCardChange, cards }) => {
  const sizerRef = useRef<HTMLDivElement>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const onToggle = useCallback(() => setSidebarVisible((d) => !d), []);
  const selectedCard = useMemo(
    () => cards.find((c) => c.id == selectedCardId),
    [cards, selectedCardId]
  );
  useEffect(() => {
    if (selectedCard) {
      setSidebarVisible(true);
    }
  }, [selectedCard]);

  const boundOnCardChange = useCallback(
    (updates: Partial<MseCard>) =>
      selectedCardId && onCardChange(selectedCardId, updates),
    [onCardChange, selectedCardId]
  );
  const { width } = useElementSize(sizerRef, 'abc');

  return (
    <Box sx={{ flexFlow: 'row nowrap', display: 'flex' }}>
      <Box sx={{ flex: '0 1 100%' }}>
        <CardTable rows={cards} onRowClick={setSelectedCardId} />
      </Box>
      <Sidebar
        open={sidebarVisible}
        anchor='right'
        minWidth='200px'
        maxWidth='500px'
        resize
      >
        <Paper sx={{ height: '100%' }} ref={sizerRef}>
          <Box sx={{ justifyContent: 'center' }}>
            {selectedCardId && (
              <EditCard cardId={selectedCardId} scale={width / 400} />
            )}
          </Box>
        </Paper>
      </Sidebar>
    </Box>
  );
};
