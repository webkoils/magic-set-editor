const baseURL = '/sheet.svg';
import { staticSymbols } from './static';
export class MyIconElement extends HTMLElement {
  // This tells the browser we want to be told
  // if the `name` attribute changes.
  container: HTMLElement;

  static get observedAttributes() {
    return ['name'];
  }

  constructor() {
    super();

    // Here we create the DOM elements from the template
    // and put them in the ~~spooky~~ shadow DOM.
    this.attachShadow({ mode: 'open' });
    this.container = document.createElement('span');
    this.shadowRoot?.appendChild(this.container);
    console.log(this.getAttribute('name'), staticSymbols);
    this.shadowRoot &&
      (this.shadowRoot.innerHTML =
        staticSymbols[this.getAttribute('name') || 'C-shadow']);

    // Lets also grab a reference to that use element
  }

  // This is called whenever an attribute in the
  // observed attributes changes. It means you can
  // change `name` and it will update.
  attributeChangedCallback(name: string, oldValue_: string, newValue: string) {
    this.shadowRoot &&
      (this.shadowRoot.innerHTML =
        staticSymbols[this.getAttribute('name') || 'C-shadow']);
  }
}

// Finally lets define this custom element
customElements.define('mtg-symbol', MyIconElement);
console.log(customElements);
export {};
