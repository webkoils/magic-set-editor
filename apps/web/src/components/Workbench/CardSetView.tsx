import { Box, Fab } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { WorkbenchGridView } from './WorkbenchGridView';
import { WorkbenchListView } from './WorkbenchListView';
import { WorkbenchTabs } from './WorkbenchTabs';
import { Add, DeleteForever } from '@mui/icons-material';
import { useCardSetContext } from '../../client-state/CardSetState';
import { WorkbenchToolbar } from './WorkbenchToolbar';
import { Sidebar } from '../Layout/Sidebar';
import { CardDetailView } from '../CardDetailView/CardDetailView';
export interface SetViewProps {
  cardSetId: string;
}

export const CardSetView: React.FC<SetViewProps> = () => {
  const {
    cards,
    addCard,
    activeCardId,
    filters,
    deleteCards,
    setActiveCardId,
  } = useCardSetContext();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const selectedCard = useMemo(
    () => cards.find((c) => c.id === activeCardId),
    [cards, activeCardId]
  );
  const [currentViewType, setCurrentViewType] = useState<'list' | 'grid'>(
    'list'
  );
  useEffect(() => {
    if (selectedCard && currentViewType === 'list') {
      setSidebarVisible(true);
    } else if (currentViewType === 'grid') {
      setSidebarVisible(false);
    }
  }, [selectedCard, currentViewType]);

  const activeIndex = useMemo(
    () => ['list', 'grid'].indexOf(currentViewType),
    [currentViewType]
  );
  const onFabClick = useCallback(async () => {
    if (filters.selected.length > 0) {
      if (filters.selected[0] === 'all') {
        // throw up a warning sign about deleting this set.
      } else {
        await deleteCards(filters.selected.map((id) => Number(id)));
        filters.setSelected([]);
      }
    } else {
      const newCard = await addCard();
      if (newCard?.id) setActiveCardId(String(newCard?.id));
    }
  }, [filters, setActiveCardId, addCard, deleteCards]);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        position: 'relative',
        display: 'flex',
        flexFlow: 'column nowrap',
        placeContent: 'stretch stretch',
      }}
    >
      <Box
        sx={{
          height: '100%',
          width: '100%',
          position: 'relative',
          display: 'flex',
          flexFlow: 'row nowrap',
          placeContent: 'stretch stretch',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            position: 'relative',
            display: 'flex',
            flexFlow: 'column nowrap',
            placeContent: 'stretch stretch',
          }}
        >
          <WorkbenchTabs activeIndex={activeIndex}>
            <WorkbenchListView />
            <WorkbenchGridView columns={3} />
          </WorkbenchTabs>
        </Box>
        <Sidebar
          open={sidebarVisible}
          anchor='right'
          resize
          onToggle={() => setSidebarVisible((o) => !o)}
        >
          <CardDetailView cardId={activeCardId} />
        </Sidebar>
      </Box>
      <Fab
        onClick={onFabClick}
        variant='circular'
        color={!filters.selected.length ? 'primary' : 'error'}
        size='large'
        sx={{
          position: 'absolute',
          left: '50%',
          bottom: '0rem',
          transform: 'translate(-50%, -25%)',
        }}
      >
        {!filters.selected.length ? (
          <Add fontSize='large' />
        ) : (
          <DeleteForever fontSize='large' />
        )}
      </Fab>
      <WorkbenchToolbar
        onViewChange={setCurrentViewType}
        currentView={currentViewType}
      />
    </Box>
  );
};
