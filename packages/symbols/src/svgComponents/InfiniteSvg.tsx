import { memo } from 'react';

const InfiniteSvg: React.FC<JSX.IntrinsicElements['svg']> = memo((props) => (
  <svg
    {...props}
    viewBox='0 0 100 100'
    preserveAspectRatio='xMinYMin meet'
    className='MtgSymbol-Inf-Svg'
  >
    <svg
      width={100}
      y={22}
      x={0}
      viewBox='0 0 24.447 11.176'
      preserveAspectRatio='xMinYMin meet'
    >
      <path
        d='M737.761 584.277c2.032-2.837 4.276-4.255 6.774-4.255 1.672 0 2.984.508 3.979 1.524.995 1.016 1.482 2.35 1.482 4.022 0 1.65-.487 3.005-1.482 4.064-.995 1.058-2.307 1.566-3.937 1.566-2.455 0-4.72-1.418-6.816-4.254-2.159 2.836-4.402 4.254-6.752 4.254-1.65 0-2.984-.508-3.98-1.545-.994-1.037-1.48-2.392-1.48-4.064 0-1.651.486-3.006 1.48-4.022.996-1.037 2.33-1.545 3.98-1.545 2.392 0 4.636 1.418 6.752 4.255zm-1.058 1.354c-1.905-2.603-3.831-3.915-5.757-3.915-1.164 0-2.075.36-2.752 1.079-.698.72-1.037 1.651-1.037 2.794 0 1.164.339 2.095 1.037 2.857.677.741 1.588 1.101 2.752 1.101 1.82 0 3.746-1.291 5.757-3.916zm2.074 0c1.99 2.625 3.937 3.916 5.842 3.916 1.122 0 2.011-.36 2.688-1.08.678-.719 1.016-1.65 1.016-2.793 0-1.207-.338-2.16-1.016-2.879-.677-.72-1.587-1.08-2.772-1.08-1.165 0-2.265.403-3.302 1.25-.635.507-1.44 1.396-2.456 2.666z'
        style={{
          fill: '#0d0f0f',
          fillOpacity: 1,
          fillRule: 'nonzero',
          stroke: 'none',
        }}
        transform='translate(-725.548 -580.022)'
      />
    </svg>
  </svg>
));
export default InfiniteSvg;
