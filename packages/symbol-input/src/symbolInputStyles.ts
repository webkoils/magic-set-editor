import { css, keyframes } from '@emotion/css';
const blinkAnimation = keyframes`
  0%  {
    opacity:0;
  }
  50%  {
    opacity:1
  } 
  100%  {
    opacity:0
  }
`;

const inputClass = css({
  outline: 0,
  background: 'transparent',
  fontFamily: 'inherit',
  position: 'relative',
  fontSize: 'inherit',
  color: 'inherit',
  overflow: 'visible',
  minHeight: '1.2em',
  minWidth: '1ch',
  backgroundColor: 'inherit',
  userSelect: 'none',
  cursor: 'text',

  border: '1px inset transparent',

  '& .MseTextInputCursor': {
    opacity: 0,
    width: '0px',
    height: '1em',
    display: 'inline-block',
    position: 'relative',
    overflow: 'visible',
    margin: 0,
    '&::after': {
      content: "''",
      visibility: 'visible',
      position: 'absolute',
      left: '-.5px',
      right: '-.5px',
      top: '0em',
      bottom: '-.2em',
      backgroundColor: 'black',
      animationName: blinkAnimation,
      animationDuration: '1s',
      animationDelay: '0s',
      animationFillMode: 'forwards',
      animationIterationCount: 'infinite',
      animationTimingFunction: 'step-start',
    },
  },
  '&.focused': {
    '& .MseTextInputCursor': {
      opacity: 1,
    },
    border: '1px  rgba(0,0,0,.7) inset',
  },
});
const inputClassFocused = inputClass + ' focused';
const cursorClass = 'MseTextInputCursor';
const symbolInputClasses = {
  root: inputClass,
  focused: inputClassFocused,
  cursor: cursorClass,
};
export default symbolInputClasses;
