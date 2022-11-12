import React, { useMemo } from 'react';
import * as mse from '@mse/types';
import HybridBackground from './HybridBackground';
import SimpleBackground from './SimpleBackground';
import { getCardIdentity } from '@mse/utils.card';
import { MseColor } from '@mse/types';
import { useCardContext } from '../../../index';
export const Background: React.FC<mse.MseCardComponentProps> = () => {
  const { card } = useCardContext();
  const identity = useMemo(() => {
    const id = getCardIdentity(card);
    return id;
  }, [card]);

  if (identity.isHybrid) {
    return (
      <HybridBackground
        colors={identity.isLand ? identity.identityColors : identity.costColors}
        isLand={identity.isLand}
      />
    );
  } else {
    return (
      <SimpleBackground
        isLand={identity.isLand}
        color={
          identity.costColors.length === 0
            ? MseColor.COLORLESS
            : identity.costColors.length === 1
            ? identity.costColors[0]
            : 'multi'
        }
      />
    );
  }
};
