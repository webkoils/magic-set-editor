import { css } from '@emotion/css';
import { FC, PropsWithChildren } from 'react';
import { template as m15Template } from '../Card/cardComponentStyles';
export const CardTemplateProvider: FC<PropsWithChildren<{
  template: string;
}>> = ({ template, children }) => {
  return <div className={m15Template.mainClass}>{children}</div>;
};
