import { createTemplate, TemplateMapping } from './utils';
import { defaultTemplate } from './defaultTemplate';
export * from './cardTemplateClasses';
export const DefaultTemplate: TemplateMapping = createTemplate(defaultTemplate);
export { createTemplate, defaultTemplate };

export type { TemplateMapping };
