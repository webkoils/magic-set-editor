import { Component, createRef, createElement, MutableRefObject } from 'react';
import { registerElement } from './registerElement';

// See https://reactjs.org/docs/events.html
const syntheticEvents = [
  // Clipboard
  'copy',
  'cut',
  'paste',
  // Composition Events
  'compositionEnd',
  'compositionStart',
  'compositionUpdate',
  // Keyboard Events
  'keyDown',
  'keyPress',
  'KeyUp',
  // Focus Events
  'focus',
  'blur',
  // Form Events
  'input',
  'invalid',
  'reset',
  'submit',
  // Generic Events
  'error',
  'load',
  // Mouse Events
  'click',
  'contextMenu',
  'doubleClick',
  'drag',
  'dragEnd',
  'dragEnter',
  'dragExit',
  'dragLeave',
  'dragOver',
  'dragStart',
  'drop',
  'mouseDown',
  'mouseEnter',
  'mouseLeave',
  'mouseMove',
  'mouseOut',
  'mouseOver',
  'mouseUp',
];

export function reactifyLitElementComponent<T extends JSX.IntrinsicAttributes>(
  tagName: string,
  klass: { getPropertyOptions: (arg0: string) => any }
) {
  const scopedTagName = registerElement(tagName, klass);
  return class reactifyWebComponent extends Component<T> {
    eventHandlers: any[];
    ref: MutableRefObject<any>;
    constructor(props: T) {
      super(props);
      this.eventHandlers = [];
      this.ref = createRef();
    }

    setEvent(event: string, val: Function) {
      if (syntheticEvents.includes(event)) return;
      this.eventHandlers.push([event, val]);
      this.ref.current.addEventListener(event, val);
    }

    update() {
      this.clearEventHandlers();
      Object.entries(this.props).forEach(([prop, val]) => {
        const propertyOptions = klass.getPropertyOptions(prop);
        if (prop === 'children') {
          return undefined;
        }
        if (prop.toLowerCase() === 'classname') {
          return (this.ref.current.className = val);
        }
        if (typeof val === 'function' && prop.match(/^on[A-Z]/)) {
          const event = (prop[2].toLowerCase() + prop.substr(3))
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
            .toLowerCase();
          return this.setEvent(event, val);
        }
        if (typeof val === 'function' && prop.match(/^on-[a-z]/)) {
          const event = prop.substr(3);
          return this.setEvent(event, val);
        }
        if (
          propertyOptions &&
          (propertyOptions.type === String || propertyOptions.type === Number)
        ) {
          this.ref.current[prop] = val;
          return this.ref.current.setAttribute(prop, val);
        }
        if (propertyOptions && propertyOptions.type === Boolean) {
          if (val) {
            this.ref.current[prop] = true;
            return this.ref.current.setAttribute(prop, val);
          }
          delete this.ref.current[prop];
          return this.ref.current.removeAttribute(prop);
        }
        this.ref.current[prop] = val;
        return undefined;
      });
    }
    componentDidUpdate() {
      this.update();
    }
    componentDidMount() {
      this.update();
    }
    componentWillUnmount() {
      this.clearEventHandlers();
    }
    clearEventHandlers() {
      this.eventHandlers.forEach(([event, handler]) => {
        this.ref.current.removeEventListener(event, handler);
      });
      this.eventHandlers = [];
    }
    render() {
      //@ts-ignore
      // eslint-disable-next-line no-unused-vars,react/prop-types
      const { children, style, ...otherProps } = this.props;
      const attributes: any = {};
      Object.entries(otherProps).forEach(([prop, val]) => {
        const propertyOptions = klass.getPropertyOptions(prop);
        if (
          propertyOptions &&
          (propertyOptions.type === String || propertyOptions.type === Number)
        ) {
          attributes[prop] = val;
        } else if (propertyOptions && propertyOptions.type === Boolean) {
          if (val) {
            attributes[prop] = val;
          }
        }
      });
      return createElement(
        scopedTagName,
        { ref: this.ref, ...attributes },
        children
      );
    }
  };
}
export default reactifyLitElementComponent;
