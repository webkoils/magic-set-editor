import React, { useCallback, useContext, useRef } from 'react';
import { CardTemplate } from './cardTemplate';
import { useState, useMemo } from 'react';
import { CacheProvider, css, SerializedStyles } from '@emotion/react';
import { createTemplate } from './utils';
import defaultTemplate from './defaultTheme';
import createCache from '@emotion/cache';
import { CSSObject } from '@emotion/css';

export const mseCache = createCache({
  key: 'mse',
});
const DefaultTemplate = createTemplate(defaultTemplate);
const defaultTemplateContext: Record<
  string,
  ReturnType<typeof createTemplate>
> = {
  default: DefaultTemplate,
  m15: DefaultTemplate,
};

export const useTemplate = (templateId: string) => {
  return useMemo(() => defaultTemplateContext[templateId] || DefaultTemplate, [
    templateId,
  ]);
};
