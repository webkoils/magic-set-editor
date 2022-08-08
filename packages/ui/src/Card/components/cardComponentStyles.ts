import { mtg } from '../../typings/mtg';

export const cardComponentStyles: Record<
  mtg.CardComponentType,
  Partial<React.CSSProperties>
> = {
  [mtg.CardComponentType.CARD]: {
    height: '100%',
    width: '100%',
    left: 0,
    top: 0,
    zIndex: 0,
    position: 'absolute',
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
    backgroundSize: 'cover',
  },
  [mtg.CardComponentType.TOPLINE]: {
    width: 'auto',
    position: 'absolute',
    top: '5.7%',
    left: '8.5%',
    right: '7%',
    height: '4.4%',
    background: 'rgba(255,0,0,.5)',
    zIndex: 2,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },

  [mtg.CardComponentType.NAME]: { height: '100%', flex: '0 1 100%' },
  [mtg.CardComponentType.COST]: {
    minWidth: '1.3%',
    height: '100%',
    flex: '0 0 auto',
    display: 'flex',
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  [mtg.CardComponentType.TYPE]: {
    width: 'auto',
    position: 'absolute',
    top: '56.5%',
    left: '8.5%',
    right: '8.8%',
    height: '4%',
    background: 'rgba(0,255,0,.5)',
    zIndex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
  },
  [mtg.CardComponentType.SETSYMBOL]: {},

  [mtg.CardComponentType.PT]: {
    position: 'absolute',

    left: 100 * (273 / 375) + '%',
    top: (100 * 466) / 523 + '%',
    width: (100 * 81) / 375 + '%',
    height: (100 * 42) / 523 + '%',

    zIndex: 3,
  },
  [mtg.CardComponentType.RULESTEXT]: {
    display: 'block',
  },
  [mtg.CardComponentType.FLAVORTEXT]: { display: 'block' },
  [mtg.CardComponentType.TEXTBOX]: {
    width: 'auto',
    position: 'absolute',
    top: '62.5%',
    left: '7.7%',
    right: '8.5%',
    height: '29.5%',
    background: 'rgba(0,0,255,.5)',
    zIndex: 2,
  },
  [mtg.CardComponentType.ARTWORK]: {
    width: 'auto',
    position: 'absolute',
    top: '11.4%',
    left: '7.7%',
    right: '8%',
    height: '44.1%',
    background: 'rgba(255,255,0,.5)',
    zIndex: 3,
  },
};
