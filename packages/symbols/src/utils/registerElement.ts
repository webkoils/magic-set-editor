import createUniqueTag from './createUniqueTag';

/**
 * Defines a custom element
 *
 * @param {string} tagName
 * @param {typeof HTMLElement} klass
 * @param {CustomElementRegistry} registry
 */
function defineElement(tagName, klass, registry = customElements) {
  registry.define(tagName, class extends klass {});
}

/**
 * Define a scoped custom element storing the scoped tag name in the cache
 *
 * @param {string} tagName
 * @param {typeof HTMLElement} klass
 * @returns {string}
 */
export function registerElement(tagName, klass) {
  const registry = customElements;

  if (klass === customElements.get(tagName)) {
    return tagName;
  }

  const tag = createUniqueTag(tagName, registry);
  // @ts-ignore
  // we extend it just in case the class has been defined manually
  defineElement(tag, klass, registry);

  return tag;
}
