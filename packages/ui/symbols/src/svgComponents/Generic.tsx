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
    <foreignObject
      viewBox='0 0 100 100'
      x={0}
      y={0}
      height={'100'}
      width={'100'}
      style={{}}
    >
      <span
        style={{
          fontFamily: 'mplantin',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50px,-58px)',
          width: '100%',
          textAlign: 'center',
          color: '#0d0f0f',
          maxHeight: 100,
          minHeight: 100,
          fontSize:
            typeof children !== 'undefined'
              ? `${120 - String(children).length * 30}px`
              : '90px',
        }}
      >
        {children}
      </span>
    </foreignObject>
  </svg>
));
export default GenericSvg;
