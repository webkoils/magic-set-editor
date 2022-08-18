import '@emotion/react';

import * as mtg from '@mse/types';

export const cardComponentStyles: Record<
  mtg.CardComponentType,
  Partial<React.CSSProperties>
> = {
  [mtg.CardComponentType.CARD]: {
    position: 'relative',
    width: '100%',
    minHeight: 0,
    paddingTop: (523 / 375) * 100 + '%',
  },
  [mtg.CardComponentType.BACKGROUND]: {
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    zIndex: 1,
    position: 'absolute',
    borderRadius: '5%',
    overflow: 'hidden',
  },
  [mtg.CardComponentType.TOPLINE]: {
    width: 'auto',
    position: 'absolute',
    top: '5.7%',
    left: '8.5%',
    right: '7%',
    height: '4.4%',
    // background: 'rgba(255,0,0,.5)',
    zIndex: 2,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    fontFamily: 'beleren',
  },

  [mtg.CardComponentType.NAME]: {
    fontSize: '1em',
    height: '100%',
    flex: '0 1 100%',
  },
  [mtg.CardComponentType.COST]: {
    minWidth: '1.3%',
    height: '100%',
    flex: '0 0 auto',
    display: 'flex',
    fontSize: '1em',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  [mtg.CardComponentType.TYPE]: {
    width: 'auto',
    position: 'absolute',
    top: '56.5%',
    paddingTop: '1%',
    left: '8.5%',
    right: '8.8%',
    height: '4%',
    // background: 'rgba(0,255,0,.5)',
    zIndex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    fontFamily: 'beleren',
    fontSize: 13 / 16 + 'em',
  },
  [mtg.CardComponentType.SETSYMBOL]: {},

  [mtg.CardComponentType.PT]: {
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    left: 100 * (283 / 375) + '%',
    top: (100 * 466) / 523 + '%',
    width: (100 * 81) / 375 + '%',
    height: (100 * 35) / 523 + '%',
    backgroundSize: 'contain',
    zIndex: 3,
    fontFamily: 'beleren',
    fontSize: '1em',
    lineHeight: 1.5,
  },
  [mtg.CardComponentType.RULESTEXT]: {
    display: 'block',
    fontFamily: 'mplantin',
    marginBottom: '1.5%',
  },
  [mtg.CardComponentType.FLAVORTEXT]: {
    display: 'block',
    fontFamily: 'mplantin',
    fontStyle: 'italic',
    fontWeight: 400,
    marginBottom: '1.5%',
  },
  [mtg.CardComponentType.TEXTBOX]: {
    width: 'auto',
    position: 'absolute',
    top: '62.5%',
    left: '7.7%',
    right: '8.5%',
    height: '29.5%',
    // background: 'rgba(0,0,255,.5)',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexFlow: 'column nowrap',
    padding: '.5%',

    fontSize: 14 / 16 + 'em',
    lineHeight: 1.2,
  },
  [mtg.CardComponentType.TEXT_DIVIDER]: {
    display: 'block',
    width: '80%',
    margin: '3% auto',
    height: '1px',
    flex: '0 0 1px',
    background:
      'linear-gradient(90deg, transparent 0%,black 20%, black 50% ,black 80%, transparent 100% );',
  },
  [mtg.CardComponentType.ARTWORK]: {
    width: '84.3%',
    position: 'absolute',
    top: '11.4%',
    left: '7.7%',
    right: '8%',
    height: '44.1%',
    // background: 'rgba(255,255,0,.5)',
    zIndex: 3,
    objectFit: 'contain',
    backgroundSize: 'contain',
  },
};

declare module '@emotion/react' {
  export interface Theme {
    components: typeof cardComponentStyles;
  }
}
export const template = {
  components: cardComponentStyles,
};
