import createEmotion from '@emotion/css/create-instance';
export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache,
  //@ts-ignore
} = createEmotion({
  // The key option is required when there will be multiple instances in a single app
  key: 'mse',
});
import * as mtg from '@mse/types';

export const cardComponentStyles: Record<mtg.MseCardComponentType, any> = {
  [mtg.MseCardComponentType.CARD]: {
    position: 'relative',
    width: 375,
    height: 523,
    color: 'black',
  },
  [mtg.MseCardComponentType.BACKGROUND]: {
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    zIndex: 1,
    position: 'absolute',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundSize: 'cover',
  },
  [mtg.MseCardComponentType.TOPLINE]: {
    width: 'auto',
    position: 'absolute',
    top: 30,
    left: 32,
    right: 26,
    height: 23,
    // background: 'rgba(255,0,0,.5)',
    zIndex: 2,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontFamily: 'beleren',
  },

  [mtg.MseCardComponentType.NAME]: {
    fontSize: 16 / 16 + 'em',
    height: '100%',
    flex: '0 1 100%',
  },
  [mtg.MseCardComponentType.COST]: {
    minWidth: 5,
    height: '100%',
    flex: '0 0 auto',
    display: 'flex',
    flexFlow: 'row nowrap',

    fontSize: 16 / 16 + 'em',
    //alignItems: 'center',
    // justifyContent: 'flex-end',
  },
  [mtg.MseCardComponentType.TYPE]: {
    width: 310,
    position: 'absolute',
    top: 296,
    paddingTop: '1%',
    left: 32,
    //right: ,
    height: 20,
    // background: 'rgba(0,255,0,.5)',
    zIndex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    fontFamily: 'beleren',
    fontSize: 13 / 16 + 'em',
  },
  [mtg.MseCardComponentType.SETSYMBOL]: {},

  [mtg.MseCardComponentType.PT]: {
    position: 'absolute',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    left: 283,
    top: 466,
    width: 81,
    height: 35,
    backgroundSize: 'contain',
    zIndex: 3,
    fontFamily: 'beleren',
    fontSize: '1em',
    lineHeight: 1.5,
    '& > div': {
      fontSize: '1em',
      textAlign: 'center',
      position: 'relative',
      left: 100 * (13 / 81) + '%',
      top: 100 * (3 / 42) + '%',
      width: 100 * (60 / 81) + '%',
      height: 100 * (28 / 42) + '%',
    },
  },
  [mtg.MseCardComponentType.RULESTEXT]: {
    display: 'block',
    fontFamily: 'mplantin',
    marginBottom: '1.5%',
  },
  [mtg.MseCardComponentType.FLAVORTEXT]: {
    display: 'block',
    fontFamily: 'mplantin',
    fontStyle: 'italic',
    fontWeight: 400,
    marginBottom: '1.5%',
  },
  [mtg.MseCardComponentType.TEXTBOX]: {
    width: 310,
    position: 'absolute',
    top: 327,
    left: 29,
    //right: '8.5%',
    height: 154,
    // background: 'rgba(0,0,255,.5)',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexFlow: 'column nowrap',
    padding: '0 4px 0 6px',

    fontSize: 14 / 16 + 'em',
    lineHeight: 1.2,
  },
  [mtg.MseCardComponentType.TEXT_DIVIDER]: {
    display: 'block',
    width: '80%',
    margin: '3% auto',
    height: '1px',
    flex: '0 0 1px',
    background:
      'linear-gradient(90deg, transparent 0%,black 20%, black 50% ,black 80%, transparent 100% );',
  },
  [mtg.MseCardComponentType.ARTWORK]: {
    width: 316,
    position: 'absolute',
    top: 60,
    left: 29,
    right: 375 - 316,
    height: 231,
    // background: 'rgba(255,255,0,.5)',
    zIndex: 3,
    objectFit: 'contain',
    backgroundSize: 'cover',
  },
} as const;

const templateClassEntries = Object.keys(cardComponentStyles).map((k) => {
  return [k.toLowerCase() as mtg.MseCardComponentType, 'MseCard' + k];
});

export const templateClasses: Record<
  Lowercase<mtg.MseCardComponentType>,
  string
> = Object.fromEntries(templateClassEntries);

export const templateClassParent = css({
  color: 'black',
  ...Object.fromEntries(
    Object.entries(cardComponentStyles).map(([k, v]) => {
      return ['& .MseCard' + k, v];
    })
  ),
});

export const template = {
  mainClass: templateClassParent,
  components: cardComponentStyles,
};
