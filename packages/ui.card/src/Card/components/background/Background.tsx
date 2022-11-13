import React, { useMemo } from 'react';
import * as mse from '@mse/types';
import HybridBackground from './HybridBackground';
import SimpleBackground from './SimpleBackground';
import { getCardIdentity } from '@mse/utils.card';
export const Background: React.FC<mse.MseCardComponentProps> = ({ card }) => {
  const identity = useMemo(() => {
    const id = getCardIdentity(card);
    return id;
  }, [card]);

  if (identity.isHybrid) {
    return (
      <HybridBackground
        colors={identity.backgroundColors}
        isLand={identity.isLand}
      />
    );
  } else {
    return (
      <SimpleBackground
        isLand={identity.isLand}
        color={identity.backgroundColors[0]}
      />
    );
  }
};
