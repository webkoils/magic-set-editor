import { OrderDirection } from '@/client-state/CardSetFilters';
import { MseCardSet } from '@mse/types';
import { FilterAlt } from '@mui/icons-material';
import { Toolbar, AppBar, Typography, styled } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { useCardSetContext } from '../../client-state/CardSetState';
import { ColumnKey } from '../../client-state/types';
import { ResponsiveToolbarSection } from '../ResponsiveToolbar/ResponsiveToolbarSection';
import SelectMenu from '../SelectMenu/SelectMenu';
import { EditSetDialog } from './EditSetDialog';

const MobileAppBar = styled(AppBar)(({ theme }) => {
  return {
    top: 'auto',
    bottom: 0,
    // order: -1,

    [theme.breakpoints.down('sm')]: {
      //   order: 100,
    },
  };
});

export const WorkbenchToolbar: React.FC<{
  currentView: 'list' | 'grid';
  onViewChange: (newView: 'list' | 'grid') => void;
}> = ({ currentView, onViewChange }) => {
  const { cardSet, updateCardSet, filters } = useCardSetContext();
  const [isEditSetDialogOpen, setIsEditSetDialogOpen] = useState(false);
  const onChange = useCallback(
    (value: 'list' | 'grid' | null) => {
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
    <MobileAppBar position='relative' variant='outlined' elevation={0}>
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
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div />
        <ResponsiveToolbarSection
          sectionProps={{
            sx: {
              display: 'flex',
              flexFlow: 'row nowrap',
              alignItems: 'center',
              justifyContent: 'flex-end',
            },
          }}
          mobileIcon={<FilterAlt />}
          drawerProps={{ anchor: 'right' }}
        >
          <Typography
            sx={{ flex: '0 0 auto', whiteSpace: 'nowrap', mr: 1 }}
            fontWeight={'bold'}
          >
            Order by:
          </Typography>

          <SelectMenu
            sx={{ width: '120px' }}
            options={filters.columns.map((c) => ({
              label: c.label,
              value: c.id,
            }))}
            value={filters.orderBy}
            onChange={(newVal) => filters.setOrderBy(newVal as ColumnKey)}
          />
          <SelectMenu
            sx={{ mr: 1, width: '100px' }}
            options={[
              { label: 'ASC', value: 'asc' },
              { label: 'DESC', value: 'desc' },
            ]}
            value={filters.orderDirection}
            onChange={(newVal) =>
              filters.setOrderDirection(newVal as OrderDirection)
            }
          />
          <Typography
            sx={{ flex: '0 0 auto', whiteSpace: 'nowrap', mr: 1 }}
            fontWeight={'bold'}
          >
            View as:
          </Typography>
          <SelectMenu
            sx={{ width: '120px', mr: 1 }}
            options={[
              { label: 'List', value: 'list' },
              { label: 'Gallery', value: 'grid' },
            ]}
            value={currentView}
            onChange={(newVal) => onChange(newVal as 'list' | 'grid')}
          />
        </ResponsiveToolbarSection>
      </Toolbar>
    </MobileAppBar>
  );
};
