import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import createDetectElementResize from './createDetectElementResize';
export const useElementSize = (
  ref: MutableRefObject<HTMLElement | null>,
  nonce: string
) => {
  const sizeRef = useRef({ width: 0, height: 0 });
  const detectElementResize = useRef<
    ReturnType<typeof createDetectElementResize>
  >();
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onResize = useCallback(() => {
    if (ref.current) {
      // Guard against AutoSizer component being removed from the DOM immediately after being added.
      // This can result in invalid style values which can result in NaN values if we don't handle them.
      // See issue #150 for more context.

      const height = ref.current.offsetHeight || 0;
      const width = ref.current.offsetWidth || 0;

      const style = window.getComputedStyle(ref.current) || {};
      const paddingLeft = parseInt(style.paddingLeft, 10) || 0;
      const paddingRight = parseInt(style.paddingRight, 10) || 0;
      const paddingTop = parseInt(style.paddingTop, 10) || 0;
      const paddingBottom = parseInt(style.paddingBottom, 10) || 0;

      const newHeight = height - paddingTop - paddingBottom;
      const newWidth = width - paddingLeft - paddingRight;
      if (
        newHeight !== sizeRef.current.height ||
        newWidth !== sizeRef.current.width
      ) {
        sizeRef.current = { height: newHeight, width: newWidth };
        setSize(sizeRef.current);
      }
    }
  }, []);

  useEffect(() => {
    if (
      ref.current &&
      ref.current.parentNode &&
      ref.current.parentNode.ownerDocument &&
      ref.current.parentNode.ownerDocument.defaultView &&
      ref.current.parentNode instanceof
        ref.current.parentNode.ownerDocument.defaultView.HTMLElement
    ) {
      const currentNode = ref.current;
      const cb = onResize;
      const detectElementResizeObj = createDetectElementResize(nonce);
      detectElementResize.current = detectElementResizeObj;
      detectElementResize.current.addResizeListener(ref.current, cb);
      onResize();
      return () => {
        if (detectElementResizeObj) {
          detectElementResizeObj.removeResizeListener(currentNode, cb);
        }
      };
    }
  }, [ref, onResize]);

  return size;
};
