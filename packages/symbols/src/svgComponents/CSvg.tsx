import React, { memo } from 'react';
import { mtgSymbolClasses } from '../mtgSymbolClasses';

const CSvg: React.FC<JSX.IntrinsicElements['svg']> = (props) => (
  <svg
    {...props}
    viewBox='0 0 100 100'
    preserveAspectRatio='xMinYMin meet'
    className={mtgSymbolClasses.mana.root + ' ' + mtgSymbolClasses.mana.C}
  >
    <svg
      height={100}
      width={100}
      preserveAspectRatio='xMinYMin meet'
      viewBox='0 0 300 300'
    >
      <path d='M149.062 36.079c7.424 14.903 16.512 29.378 27.288 43.424 4.584 5.897 9.838 12.063 15.762 18.442 5.843 6.379 12.33 12.759 19.353 19.031 7.076 6.272 14.823 12.223 23.267 17.852s17.53 10.775 27.287 15.386c-14.34 7.667-28.547 16.995-42.674 28.038-5.869 4.61-12.008 9.918-18.441 15.976-6.379 6.005-12.651 12.599-18.79 19.729a255.605 255.605 0 0 0-17.69 23.481c-5.63 8.417-10.75 17.369-15.36 26.858-7.184-14.1-16.136-28.038-26.885-41.869-9.221-11.794-20.881-24.178-34.98-37.259-14.072-13.081-31.12-24.714-51.09-34.954 14.367-7.451 28.574-16.672 42.673-27.662 12.035-9.489 24.446-21.337 37.232-35.543 12.81-14.207 23.8-31.148 33.048-50.93zM132.55 194.764c6.674 8.471 12.169 17.048 16.512 25.733 5.656-12.063 12.438-22.409 20.344-31.094 7.936-8.738 15.654-16.029 23.08-21.927 8.443-6.594 17.262-12.384 26.51-17.315-12.304-5.576-22.758-12.384-31.309-20.318-8.604-7.935-15.842-15.601-21.711-23.053-6.675-8.416-12.331-17.369-16.915-26.858-5.629 12.277-12.384 22.784-20.157 31.47-7.827 8.738-15.439 15.976-22.865 21.926a159.005 159.005 0 0 1-26.51 16.887c12.303 6.38 22.784 13.563 31.496 21.498s15.896 15.653 21.525 23.051z' />
    </svg>
  </svg>
);
export default memo(CSvg);