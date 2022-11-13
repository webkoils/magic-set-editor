import { Box, Fab, IconButton, SwipeableDrawer } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { WorkbenchGridView } from './WorkbenchGridView';
import { WorkbenchListView } from './WorkbenchListView';
import { WorkbenchTabs } from './WorkbenchTabs';
import { Add, ChevronRight, DeleteForever } from '@mui/icons-material';
import { useCardSetContext } from '../../client-state/CardSetState';
import { WorkbenchToolbar } from './WorkbenchToolbar';
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
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const selectedCard = useMemo(
    () => cards.find((c) => c.id === activeCardId),
    [cards, activeCardId]
  );
  const [currentViewType, setCurrentViewType] = useState<'list' | 'grid'>(
    'list'
  );
  const [anchor] = useState<'right' | 'bottom'>('right');
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
          flexFlow: 'column nowrap',
          placeContent: 'stretch stretch',
        }}
      >
        <WorkbenchToolbar
          onViewChange={setCurrentViewType}
          currentView={currentViewType}
        />
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
        <SwipeableDrawer
          disableSwipeToOpen
          variant='temporary'
          open={sidebarVisible}
          onOpen={() => {}}
          anchor={anchor}
          disableDiscovery
          PaperProps={{ sx: { pt: '2rem' } }}
          onClose={() => {
            setActiveCardId(null);
            setSidebarVisible((o) => !o);
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: 0,
            }}
          >
            <IconButton
              onClick={() => {
                setActiveCardId(null);
                setSidebarVisible(false);
              }}
            >
              <ChevronRight
                sx={{
                  transform: anchor === 'bottom' ? 'rotate(90deg)' : undefined,
                }}
              />
            </IconButton>
          </Box>
          <CardDetailView cardId={activeCardId} />
        </SwipeableDrawer>
      </Box>
      <Fab
        onClick={onFabClick}
        variant='extended'
        color={!filters.selected.length ? 'primary' : 'error'}
        size='large'
        sx={{
          position: 'fixed',
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
        Card
      </Fab>
    </Box>
  );
};
