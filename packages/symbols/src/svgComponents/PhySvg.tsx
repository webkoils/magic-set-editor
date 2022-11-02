import { memo } from 'react';
import { mtgSymbolClasses } from '../mtgSymbolClasses';

const PhySvg: React.FC<JSX.IntrinsicElements['svg']> = memo((props) => (
  <svg
    {...props}
    viewBox='0 0 100 100'
    preserveAspectRatio='xMinYMin meet'
    className={mtgSymbolClasses.mana.root + ' ' + mtgSymbolClasses.mana.Phy}
  >
    <svg
      height={100}
      width='100'
      preserveAspectRatio='xMinYMin meet'
      y={0}
      x={15}
      viewBox='0 0 15.654 27.665'
    >
      <path
        d='M604.035 482.595c.021-1.503-.444-3.027-1.397-4.212-.444-.487-.825-1.059-1.312-1.524-1.058-1.059-2.646-1.122-3.916-1.8-.063-.655-.317-1.333-.17-1.989.043-.233.107-.466 0-.677-.338-.762-.063-1.609-.105-2.413-.042-.402-.021-.932-.423-1.186-.085.868-.424 1.694-.678 2.52-.127.634-.127 1.312-.402 1.925.19.614-.17 1.143-.55 1.588-.826.444-1.82.529-2.561 1.164-.508.444-1.08.825-1.651 1.185-.445.55-.932 1.08-1.122 1.757-.783.953-.868 2.223-1.312 3.323 0 1.63.317 3.387 1.375 4.7.741.613 1.27 1.46 2.011 2.074.72.423 1.482.783 2.223 1.164.486.106.973.169 1.46.296.381 2.01.656 4.064 1.44 5.969.253-.783.232-1.63.444-2.413.317-1.164-.318-2.392.042-3.535.55-.487 1.46-.17 2.053-.592 1.165-.699 2.392-1.397 3.218-2.498.317-.614.973-1.08.973-1.842 0-1.016.593-1.947.36-2.984zm-8.572 6.202c-.826-.212-1.609-.614-2.307-1.1-.762-.509-1.037-1.44-1.778-1.948-.699-.847-.55-1.969-.847-2.964.127-.677.254-1.375.339-2.074.338-.55.846-.995.995-1.65.508-.72 1.27-1.207 1.883-1.821.445-.508 1.143-.297 1.715-.318-.042.55-.085 1.143.042 1.694.064.338.233.677.17 1.037-.106.762.169 1.524-.022 2.286-.423 1.566.021 3.154.064 4.741-.043.72-.085 1.418-.254 2.117zm6.35-2.985c-.55.381-1.016.868-1.503 1.355-.847.571-1.672 1.185-2.667 1.482.085-.72.17-1.46-.064-2.16-.55-1.566.127-3.217.254-4.825-.105-.932-.02-1.948-.444-2.837-.064-.656.233-1.29.423-1.905.656.275 1.27.635 1.82 1.08.678.508 1.694.825 1.842 1.757.064.613.74.973.72 1.608-.043 1.482.17 3.027-.381 4.445z'
        style={{
          fill: '#111212',
          fillOpacity: 1,
          fillRule: 'nonzero',
          stroke: 'none',
        }}
        transform='translate(-588.436 -468.794)'
      />
    </svg>
  </svg>
));
export default PhySvg;