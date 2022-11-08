import { MseCard } from '@mse/types';
import { CSSProperties } from 'react';
export type ColumnKey = keyof Omit<MseCard, 'identity'>;

export interface CardListColumn {
  id: ColumnKey;
  label: string;
  valueGetter?: (card: MseCard) => string | number;
  displayGetter?: (card: MseCard) => React.ReactNode;
  sort?: (a: MseCard, b: MseCard) => number;
  width?: CSSProperties['width'];
}
