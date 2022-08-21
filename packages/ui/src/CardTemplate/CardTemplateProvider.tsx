import { ThemeProvider } from '@emotion/react';
import { FC, PropsWithChildren } from 'react';
import { template as m15Template } from '../Card/components/cardComponentStyles';
export const CardTemplateProvider: FC<PropsWithChildren<{
  template: string;
}>> = ({ template, children }) => {
  return <ThemeProvider theme={m15Template}>{children}</ThemeProvider>;
};
