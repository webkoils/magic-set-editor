import { useElementSize } from '@mse/utils/autosizer';
import { Box } from '@mui/material';
import React, { useRef } from 'react';
import { EditCard } from '../CardWrappers/EditCard';

export const CardDetailView: React.FC<
  React.PropsWithChildren<{ cardId: string | null }>
> = ({ cardId }) => {
  const sizerRef = useRef<HTMLDivElement | null>(null);
  const { width } = useElementSize(sizerRef, 'abc');

  return (
    <div
      ref={sizerRef}
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'flex-start',
        display: 'flex',
      }}
    >
      <Box
        sx={{
          display: 'block',

          flexGrow: 0,
          flexShrink: 0,
        }}
      >
        {cardId && <EditCard cardId={cardId} width={width - 30} />}
      </Box>
    </div>
  );
};
