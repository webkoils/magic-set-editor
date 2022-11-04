import { CacheProvider, Global } from '@emotion/react';
import classNames from 'classnames';
import { FC, PropsWithChildren, useEffect } from 'react';
import { useTemplate, mseCache } from './GlobalTemplateProvider';

export const CardTemplateProvider: FC<PropsWithChildren<{
  templateId: string;
}>> = ({ templateId, children }) => {
  const template = useTemplate(templateId);

  return (
    <>
      <Global styles={{ [`.${template.rootClassName}`]: template.styles }} />
      <div className={template.rootClassName}>{children}</div>
    </>
  );
};
