import React, { memo } from 'react';

const TapSvg: React.FC<JSX.IntrinsicElements['svg']> = memo((props) => (
  <svg
    {...props}
    viewBox='0 0 100 100'
    preserveAspectRatio='xMinYMin meet'
    className='MtgSymbol-Tap-Svg'
  >
    <svg
      height={65}
      y={23}
      x={23}
      preserveAspectRatio='xMinYMin meet'
      viewBox='0 0 17.78 18.542'
    >
      <path
        d='M729.837 542.937h-10.16l3.726-2.646c-1.397-1.1-2.985-1.65-4.805-1.65-.91 0-1.524.19-1.863.529-.317.338-.486.973-.486 1.883 0 2.498 1.29 5.165 3.852 8.001l-2.921 2.985c-3.408-4.17-5.122-7.874-5.122-11.134 0-1.968.592-3.513 1.778-4.678 1.164-1.143 2.751-1.735 4.699-1.735 2.391 0 4.974.91 7.789 2.73l2.18-3.725 1.333 9.44z'
        style={{ fill: '#0d0f0f' }}
        transform='translate(-712.058 -533.497)'
      />
    </svg>
  </svg>
));
export default TapSvg;
