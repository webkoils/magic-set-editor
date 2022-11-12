import { MseCardSet } from '@mse/types';
import { GridView, ViewList } from '@mui/icons-material';
import {
  Toolbar,
  ToggleButtonGroup,
  ToggleButton,
  AppBar,
  Box,
  Typography,
  ButtonBase,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from '@mui/material';
import React, { ChangeEvent, useCallback, useState } from 'react';
import { useCardSetContext } from '../../client-state/CardSetState';
import { ColumnKey } from '../../client-state/types';
import { EditSetDialog } from './EditSetDialog';
export const WorkbenchToolbar: React.FC<{
  currentView: 'list' | 'grid';
  onViewChange: (newView: 'list' | 'grid') => void;
}> = ({ currentView, onViewChange }) => {
  const { cardSet, updateCardSet, filters } = useCardSetContext();
  const [isEditSetDialogOpen, setIsEditSetDialogOpen] = useState(false);
  const onChange = useCallback(
    (_event: ChangeEvent<unknown>, value: 'list' | 'grid' | null) => {
      if (value !== null) {
        onViewChange(value);
      }
    },
    [onViewChange]
  );

  const onSaveSet = useCallback(
    async (updates: MseCardSet) => {
      await updateCardSet(updates);
      setIsEditSetDialogOpen(false);
    },
    [updateCardSet]
  );

  return (
    <AppBar
      position='relative'
      sx={{ top: 'auto', bottom: 0 }}
      variant='outlined'
      elevation={0}
    >
      <EditSetDialog
        open={isEditSetDialogOpen}
        initialData={cardSet || undefined}
        onClose={() => setIsEditSetDialogOpen(false)}
        onSave={onSaveSet}
      />
      <Toolbar
        variant='dense'
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          placeContent: 'center space-between',
        }}
      >
        <ButtonBase
          title='click to edit'
          onClick={() => setIsEditSetDialogOpen(true)}
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            placeContent: 'center flex-start',
          }}
        >
          <Box
            sx={{
              mr: 1,
              display: 'flex',
              flexFlow: 'row nowrap',
              placeContent: 'center flex-start',
            }}
          >
            <Typography
              color='inherit'
              sx={{ fontWeight: 'bold', display: 'block', mr: 1 }}
            >
              set name:
            </Typography>
            <Typography
              color='inherit'
              sx={{
                display: 'block',

                textTransform: 'none',
              }}
            >
              {cardSet?.displayName || 'set name'}
            </Typography>
          </Box>{' '}
        </ButtonBase>
        <Box sx={{ width: '4rem', flex: '0 0 4rem' }} />
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            placeContent: 'center flex-end',
          }}
        >
          <FormControl size='small' sx={{ width: '120px', mr: 1 }}>
            <Select
              id={'workbench-sort-select'}
              value={filters.orderBy}
              onChange={({ target }: SelectChangeEvent) =>
                filters.setOrderBy(target.value as ColumnKey)
              }
            >
              {filters.columns.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size='small' sx={{ width: '100px', mr: 1 }}>
            <Select
              value={filters.orderDirection}
              onChange={({ target }: SelectChangeEvent) =>
                filters.setOrderDirection(target.value as 'asc' | 'desc')
              }
            >
              <MenuItem value={'asc'}>ASC</MenuItem>
              <MenuItem value={'desc'}>DESC</MenuItem>
            </Select>
          </FormControl>
          <ToggleButtonGroup
            size='small'
            value={currentView}
            onChange={onChange}
            exclusive
          >
            <ToggleButton value='list' size='small'>
              <ViewList fontSize='small' />
            </ToggleButton>
            <ToggleButton value='grid' size='small'>
              <GridView fontSize='small' />
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
