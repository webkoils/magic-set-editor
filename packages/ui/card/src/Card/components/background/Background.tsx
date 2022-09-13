import React, { useMemo } from 'react';
import * as mse from '@mse/types';
import { HybridBackground } from './HybridBackground';
import { SimpleBackground } from './SimpleBackground';
import { getCardIdentity } from '@mse/utils.card';
import { Color } from '@mse/types';
export const Background: React.FC<mse.CardComponentProps> = ({ card }) => {
  const identity = useMemo(() => {
    let id = getCardIdentity(card);
    console.log(id);
    return id;
  }, [card]);

  if (identity.isHybrid) {
    return (
      <HybridBackground
        colors={identity.identityColors}
        isLand={identity.isLand}
      />
    );
  } else {
    return (
      <SimpleBackground
        isLand={identity.isLand}
        color={
          identity.identityColors.length === 0
            ? Color.COLORLESS
            : identity.identityColors.length == 1
            ? identity.identityColors[0]
            : 'multi'
        }
      />
    );
  }
};
