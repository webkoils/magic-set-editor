import { FC, PropsWithChildren, useEffect } from 'react';
import { useTemplate } from './GlobalTemplateProvider';

export const CardTemplateProvider: FC<PropsWithChildren<{
  templateId: string;
}>> = ({ templateId, children }) => {};
