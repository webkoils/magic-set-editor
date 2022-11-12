import { useMemo, useEffect } from 'react';
import {
  DefaultTemplate,
  createTemplate,
  TemplateMapping,
} from '@mse/templates.base';
import createCache from '@emotion/cache';
import { Global } from '@emotion/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  activeTemplateState,
  activeTemplatesState,
} from './cardTemplates.state';

export const mseCache = createCache({
  key: 'mse',
});
const M15Template = createTemplate({ id: 'm15' });
const defaultTemplateContext: Record<string, TemplateMapping> = {
  default: DefaultTemplate,
  m15: M15Template,
};

export const useTemplate = (templateId: string) => {
  const setActiveTemplate = useSetRecoilState(activeTemplateState(templateId));
  const template = useMemo(
    () => defaultTemplateContext[templateId] || DefaultTemplate,
    [templateId]
  );
  useEffect(() => {
    setActiveTemplate(true);
    return () => setActiveTemplate(false);
  }, [setActiveTemplate]);

  return template;
};

export const GlobalTemplates = () => {
  const templateIds = useRecoilValue(activeTemplatesState);
  const activeTemplates = useMemo(() => {
    return Object.fromEntries(
      templateIds.map((id) => {
        const temp = defaultTemplateContext[id] || DefaultTemplate;
        return [`.${temp.rootClassName}`, temp.styles];
      })
    );
  }, [templateIds]);

  return <Global styles={activeTemplates} />;
};
