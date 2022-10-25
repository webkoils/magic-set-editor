import { MseCardComponentType } from 'types';

export type CardTemplate = {
  name: string;
  styles: Record<MseCardComponentType, Partial<React.CSSProperties>>;
  assets: Record<string, string>;
};
