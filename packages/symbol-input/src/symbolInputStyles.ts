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
  background: 'transparent',
  fontFamily: 'inherit',
  position: 'relative',
  fontSize: 'inherit',
  color: 'inherit',
  overflow: 'visible',
  minHeight: '1em',
  minWidth: '1ch',
  backgroundColor: 'inherit',
  userSelect: 'none',
  cursor: 'text',
  whiteSpace: 'pre-wrap',
  outline: 'transparent solid 1px',

  '& .MseTextInputCursor': {
    opacity: 0,
    width: '0px',
    height: '0px',
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
      top: '-1em',
      bottom: '-.3em',
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
    outline: 'black solid 1px',
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
