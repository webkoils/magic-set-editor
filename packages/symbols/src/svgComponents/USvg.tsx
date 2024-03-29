import React, { memo } from 'react';
import { mtgSymbolClasses } from '../mtgSymbolClasses';
const USvg: React.FC<JSX.IntrinsicElements['svg']> = (props) => (
  <svg
    {...props}
    viewBox='0 0 100 100'
    preserveAspectRatio='xMinYMin meet'
    className={mtgSymbolClasses.mana.root + ' ' + mtgSymbolClasses.mana.U}
  >
    <svg
      height={80}
      y={10}
      x={25}
      preserveAspectRatio='xMinYMin meet'
      viewBox='0 0 14.139 22.712'
    >
      <path
        d='M347.675 408.09c-1.333 1.376-3.006 2.053-4.974 2.053-2.223 0-3.98-.762-5.292-2.286-1.227-1.44-1.841-3.28-1.841-5.524 0-2.413 1.058-5.165 3.154-8.255a31.7 31.7 0 0 1 6.032-6.647c-.339 1.546-.508 2.646-.508 3.281 0 1.503.466 2.963 1.418 4.382a153.508 153.508 0 0 0 2.625 3.767c.952 1.418 1.418 2.815 1.418 4.149 0 2.01-.677 3.704-2.032 5.08zm-.021-7.726c-.36-.804-.783-1.355-1.27-1.609.063.149.106.34.106.614 0 .508-.148 1.228-.424 2.16l-.486 1.46c0 .846.423 1.27 1.27 1.27.889 0 1.333-.593 1.333-1.778 0-.614-.17-1.313-.53-2.117z'
        style={{
          fill: '#0d0f0f',
          fillOpacity: 1,
          fillRule: 'nonzero',
          stroke: 'none',
        }}
        transform='translate(-335.568 -387.431)'
      />
    </svg>
  </svg>
);
export default memo(USvg);
