type ResizeHandler = (element: HTMLElement, onResize: () => void) => void;

type DetectElementResize = {
  addResizeListener: ResizeHandler;
  removeResizeListener: ResizeHandler;
};
function createDetectElementResize(nonce: string): DetectElementResize;
export default createDetectElementResize;
