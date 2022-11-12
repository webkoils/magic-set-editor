import { MseCard } from '@mse/types';
import { Card } from '@mse/ui.card';
import { Box } from '@mui/material';
import React from 'react';
export const CardDrawer: React.FC<{ card: MseCard }> = ({ card }) => {
  return (
    <Box>
      <Card card={card} />
    </Box>
  );
};
