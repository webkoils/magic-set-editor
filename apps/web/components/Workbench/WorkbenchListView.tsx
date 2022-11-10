import { CardTable } from '../CardTable/CardTable';
import { Box } from '@mui/material';
import React from 'react';
import { useCardSetContext } from '../../client-state/CardSetState';

export const WorkbenchListView: React.FC<{}> = () => {
  const { setActiveCardId } = useCardSetContext();

  return (
    <Box
      sx={{
        flexFlow: 'row nowrap',
        display: 'flex',
        height: '100%',
        background: 'background.paper',
      }}
    >
      <Box sx={{ flex: '0 1 100%' }}>
        <CardTable onRowClick={setActiveCardId} />
      </Box>
    </Box>
  );
};
