import { MseCard } from '@mse/types';
import React, { CSSProperties } from 'react';
export type ColumnKey = keyof Omit<MseCard, 'identity'>;

export interface CardListColumn {
  id: ColumnKey;
  label: string;
  getValue?: (card: MseCard) => string | number;
  getFormattedValue?: (card: MseCard) => React.ReactNode;
  sort?: (a: MseCard, b: MseCard) => number;
  width?: CSSProperties['width'];
}
