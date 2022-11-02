import { FC, PropsWithChildren, useEffect } from 'react';
import {
  CardTemplateClassNames as templateClasses,
  templateCss,
} from '@mse/templates.m15';
export const CardTemplateProvider: FC<PropsWithChildren<{
  template: string;
}>> = ({ template, children }) => {
  return <div className={templateClasses.root}>{children}</div>;
};
