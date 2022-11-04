import React, { memo } from 'react';

const SplitMask2: React.FC<{}> = memo(() => {
  return (
    <defs>
      <clipPath id='mse-split-1-2' clipPathUnits='objectBoundingBox'>
        <rect x='0' y='0' width='.5' height='3' transform='rotate(45,.5,.5)' />
      </clipPath>
      <clipPath id='mse-split-2-2' clipPathUnits='objectBoundingBox'>
        <rect
          x='0'
          y='0'
          width='.5'
          height='3'
          transform='rotate(-135,.5,.5)'
        />
      </clipPath>
    </defs>
  );
});

const SplitMask3: React.FC<{}> = memo(() => {
  return (
    <defs>
      <clipPath id='mse-split-1-3' clipPathUnits='objectBoundingBox'>
        <polygon
          points='2,1.366 1.50,2.233 .50,2.233 0,1.366 .50,.50 1.50,.50'
          transform='rotate(150 .5 .5)'
        />
      </clipPath>
      <clipPath id='mse-split-2-3' clipPathUnits='objectBoundingBox'>
        <polygon
          transform='rotate(-90 .5 .5)'
          points='2,1.366 1.50,2.233 .50,2.233 0,1.366 .50,.50 1.50,.50'
        />
      </clipPath>
      <clipPath id='mse-split-3-3' clipPathUnits='objectBoundingBox'>
        <polygon
          points='2,1.366 1.50,2.233 .50,2.233 0,1.366 .50,.50 1.50,.50'
          transform='rotate(30 .5 .5)'
        />
      </clipPath>
    </defs>
  );
});
const SplitMask: React.FC<{ size: number }> = memo(({ size }) => {
  switch (size) {
    case 2: {
      return <SplitMask2 />;
    }
    case 3: {
      return <SplitMask3 />;
    }
    default: {
      return null;
    }
  }
});
export default SplitMask;
