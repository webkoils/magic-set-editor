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
    <svg
      height={100}
      width={100}
      preserveAspectRatio='xMinYMin meet'
      viewBox='0 0 100 100'
    >
      <foreignObject
        viewBox='0 0 100 100'
        x={0}
        y={0}
        height={'100%'}
        width={'100%'}
      >
        <span
          style={{
            fontFamily: 'mplantin',
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            textAlign: 'center',
            color: '#0d0f0f',
            fontSize:
              typeof children !== 'undefined'
                ? `${150 - String(children).length * 30}px`
                : '100px',
          }}
        >
          {children}
        </span>
      </foreignObject>
    </svg>
  </svg>
));
export default GenericSvg;
