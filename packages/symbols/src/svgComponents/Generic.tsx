import React, { memo } from 'react';
import { mtgSymbolClasses } from '../mtgSymbolClasses';

const GenericSvg: React.FC<
  { children?: string | number } & Omit<
    JSX.IntrinsicElements['svg'],
    'children'
  >
> = ({ children, ...props }) => (
  <svg
    viewBox='0 0 100 100'
    preserveAspectRatio='xMinYMin meet'
    {...props}
    className={mtgSymbolClasses.mana.root + ' ' + mtgSymbolClasses.mana.generic}
  >
    <g transform='translate(0 0)'>
      <text
        x='50'
        y='50'
        dy='.25em'
        // textAnchor='middle'
        // dominantBaseline={'central'}
        style={{
          fontFamily: 'mplantin',
          fill: '#0d0f0f',
          textAnchor: 'middle',
          //   dominantBaseline: 'central',
          fontSize:
            typeof children !== 'undefined'
              ? `${110 - String(children).length * 15}px`
              : '90px',
        }}
      >
        {children &&
          String(children)
            .split('')
            .map((c, i) => (
              <tspan dx={i > 0 ? '-5%' : 0} key={i}>
                {c}
              </tspan>
            ))}
      </text>
    </g>
  </svg>
);
export default memo(GenericSvg);
