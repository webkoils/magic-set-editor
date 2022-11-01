import { CSSProperties } from 'react';

export type CardTemplate = {
  id: string;
  components: Record<string, Record<string, Partial<CSSProperties>>>;
};
