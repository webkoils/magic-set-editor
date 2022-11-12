import { atom, selector, selectorFamily } from 'recoil';
export const activeGlobalTemplatesState = atom<Record<string, number>>({
  key: 'ActiveGlobalTemplatesState',
  default: {},
});

export const activeTemplatesState = selector<string[]>({
  key: 'ActiveTemplates',
  get: ({ get }) => {
    return Object.entries(get(activeGlobalTemplatesState) || {})
      .filter(([, v]) => v > 0)
      .map(([k]) => k);
  },
});

export const activeTemplateState = selectorFamily<boolean, string>({
  key: 'GlobalTemplatesState',
  get: () => () => true,
  set: (templateId: string) => ({ set }, newVal) => {
    set(activeGlobalTemplatesState, (prevActives) => ({
      ...prevActives,
      [templateId]: (prevActives[templateId] || 0) + (newVal ? 1 : -1),
    }));
  },
});
