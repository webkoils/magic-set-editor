import { memo } from 'react';
import { mtgSymbolClasses } from '../mtgSymbolClasses';
const WSvg: React.FC<JSX.IntrinsicElements['svg']> = memo((props) => (
  <svg
    {...props}
    viewBox='0 0 100 100'
    preserveAspectRatio='xMinYMin meet'
    className={mtgSymbolClasses.mana.root + ' ' + mtgSymbolClasses.mana.W}
  >
    <svg
      preserveAspectRatio='xMinYMin meet'
      height={100}
      y={0}
      x={0}
      viewBox='0 0 26.924 27.072'
    >
      <path
        d='M354.561 401.537c-1.862-1.058-3.048-1.587-3.556-1.587-.38 0-.677.296-.91.889-.212.571-.635.867-1.27.867-.254 0-.804-.105-1.609-.296-.444.699-.677 1.143-.677 1.334 0 .254.19.571.593.91.38.36.72.55.973.55.17 0 .403-.042.699-.106.296-.084.487-.106.571-.106.297 0 .445.53.445 1.588 0 1.037-.233 2.603-.72 4.699-.614-2.413-1.27-3.62-1.947-3.62-.106 0-.296.064-.593.212-.296.148-.508.212-.656.212-.698 0-1.312-.635-1.862-1.884-1.08.17-1.63.72-1.63 1.672 0 .466.211.847.656 1.143.444.275.656.487.656.593 0 .656-.931 1.63-2.815 2.963-.995.72-1.672 1.207-2.053 1.503.338-.445.656-.995.995-1.672.38-.783.571-1.397.571-1.82 0-.255-.275-.572-.825-.995-.55-.445-.805-.89-.805-1.355 0-.402.127-.91.424-1.503-.318-.36-.678-.529-1.101-.529-.953 0-1.44.296-1.44.91v.974c.022.783-.57 1.164-1.777 1.164-.932 0-2.477-.212-4.657-.635 2.455-.614 3.704-1.334 3.704-2.138 0 .106-.042-.19-.148-.847-.085-.74.423-1.397 1.566-1.99-.211-1.1-.783-1.65-1.714-1.65-.127 0-.402.254-.783.762-.381.487-.72.74-1.059.74-.571 0-1.312-.613-2.201-1.862-.445-.614-1.1-1.524-1.969-2.73.55.275 1.101.571 1.63.846.72.339 1.291.508 1.715.508.338 0 .656-.296.973-.868.34-.592.741-.889 1.27-.889.085 0 .55.149 1.419.445.465-.699.677-1.207.677-1.545 0-.275-.17-.614-.508-.974-.339-.36-.656-.55-.953-.55-.105 0-.296.042-.55.106-.233.063-.423.105-.55.105-.424 0-.635-.529-.635-1.608 0-.275.275-1.905.825-4.869-.02.36.127 1.016.466 1.99.402 1.185.868 1.778 1.418 1.778.085 0 .275-.063.572-.212.275-.148.508-.211.677-.211.55 0 .995.317 1.355.931l.529.953c.487 0 .91-.17 1.249-.53.317-.36.486-.783.486-1.29 0-.509-.211-.91-.656-1.186-.444-.275-.656-.487-.656-.614 0-.508.783-1.355 2.35-2.54 1.27-.952 2.074-1.503 2.455-1.672-1.016 1.376-1.524 2.392-1.524 3.027 0 .338.19.698.593 1.058.508.466.783.783.867.974.233.55.212 1.29-.084 2.243.656.445 1.143.678 1.46.678.699 0 1.037-.36 1.037-1.08 0-.063-.02-.296-.084-.677-.064-.381-.085-.593-.064-.635.106-.339.762-.487 1.969-.487.762 0 2.328.212 4.74.635-.528.148-1.311.36-2.349.635-.952.296-1.439.614-1.439.974 0 .148.064.444.19.846.106.403.17.699.17.89 0 .338-.212.634-.635.93l-1.207.847c.276.53.466.826.572.932.233.275.55.423.952.423.297 0 .55-.254.784-.74.232-.509.613-.763 1.143-.763.635 0 1.354.593 2.18 1.778.444.678 1.143 1.693 2.095 3.048zm-7.916-2.074c0-1.524-.55-2.836-1.672-3.958-1.1-1.101-2.434-1.672-3.937-1.672-1.545 0-2.879.55-4 1.65-1.122 1.122-1.694 2.435-1.715 3.98-.021 1.524.55 2.836 1.693 3.937 1.164 1.1 2.498 1.65 4.022 1.65 1.609 0 2.942-.528 4.021-1.587 1.08-1.058 1.61-2.392 1.588-4zm-.53 0c0 1.44-.486 2.646-1.46 3.598-.973.953-2.18 1.418-3.62 1.418-1.417 0-2.603-.487-3.597-1.46-.995-.974-1.503-2.16-1.503-3.556 0-1.376.508-2.561 1.503-3.535 1.016-.995 2.2-1.482 3.598-1.482 1.376 0 2.561.487 3.577 1.482.995 1.016 1.503 2.18 1.503 3.535z'
        style={{
          fill: '#0d0f0f',
          fillOpacity: 1,
          fillRule: 'nonzero',
          stroke: 'none',
        }}
        transform='translate(-327.637 -386)'
      />
    </svg>
  </svg>
));
export default WSvg;
