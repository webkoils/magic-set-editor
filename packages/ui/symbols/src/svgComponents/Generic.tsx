import { memo } from 'react';
import { mtgSymbolClasses } from '../mtgSymbolClasses';

const GenericSvg: React.FC<
  { children?: string | number } & Omit<
    JSX.IntrinsicElements['svg'],
    'children'
  >
> = memo(({ children, ...props }) => (
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
        textAnchor='middle'
        dominantBaseline={'central'}
        textLength={100}
        style={{
          fontFamily: 'mplantin',
          fill: '#0d0f0f',
          fontSize:
            typeof children !== 'undefined'
              ? `${120 - String(children).length * 30}px`
              : '90px',
        }}
      >
        {children}
      </text>
    </g>
  </svg>
));
export default GenericSvg;
