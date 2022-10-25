import { memo } from 'react';

const Generic = memo(({ children }: { children?: string | number }) => (
  <svg
    height={100}
    width={100}
    preserveAspectRatio='xMinYMin meet'
    viewBox='0 0 300 300'
  >
    <foreignObject x={0} y={0} height={300} width={300}>
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
              ? `${320 - String(children).length * 50}px`
              : '240px',
        }}
      >
        {children}
      </span>
    </foreignObject>
  </svg>
));
export default memo(Generic);
