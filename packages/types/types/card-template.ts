import { CardComponentType } from 'types';

export type CardTemplate = {
  name: string;
  styles: Record<CardComponentType, Partial<React.CSSProperties>>;
  assets: Record<string, string>;
};
