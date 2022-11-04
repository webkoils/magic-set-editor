import { mtgSymbolShadow } from '@mse/symbols';
import { CardTemplate } from './cardTemplateClasses';

const defaultTemplate: CardTemplate = {
  id: 'm15',
  components: {
    root: {
      position: 'relative',
      width: 375,
      height: 523,
      color: 'black',
      fontFamily: 'beleren',

      symbol: {
        root: {
          display: 'inline',
          minWidth: '1em',
        },
      },
      input: {
        line: { display: 'block', marginBottom: '1.5%' },
      },
    },
    background: {
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

    topLine: {
      width: 'auto',
      position: 'absolute',
      top: 28,
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
    name: {
      fontSize: 18 / 16 + 'em',
      height: '100%',
      flex: '0 1 100%',
    },
    cost: {
      minWidth: 5,
      fontSize: 18 / 16 + 'em',
      height: '100%',
      flex: '0 0 auto',

      symbol: {
        root: {
          filter: mtgSymbolShadow,
          overflow: 'visible',
        },
      },
    },

    typeLine: {
      width: 310,
      position: 'absolute',
      top: 300,
      // paddingTop: '1%',
      left: 32,
      //right: ,
      height: 20,
      // background: 'rgba(0,255,0,.5)',
      zIndex: 2,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      fontSize: 15 / 16 + 'em',

      flexFlow: 'row nowrap',
      symbol: {
        root: {
          minWidth: '1em',
          fontFamily: 'beleren',
        },
      },
    },
    typeLineDivider: {
      fontFamily: 'beleren',
      marginLeft: '.5em',
      marginRight: '.5em',
    },

    pt: {
      position: 'absolute',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      left: 283,
      top: 466,
      width: 69,
      height: 35,
      backgroundSize: '100% 100%',
      zIndex: 3,
      fontFamily: 'beleren',
      fontSize: '1em',
      lineHeight: 1.5,
    },
    ptLabel: {
      fontSize: '1em',
      textAlign: 'center',
      width: 60,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      left: '54%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
    },
    ptDivider: {
      fontSize: '1em',
      textAlign: 'center',
      width: '1em',

      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      height: 100 + '%',
    },
    power: {
      fontSize: '1em',
      position: 'relative',
      flex: '0 0 30%',
      height: 100 + '%',

      marginRight: '.25em',
      textAlign: 'right',
    },
    toughness: {
      fontSize: '1em',
      position: 'relative',
      flex: '0 0 30%',
      height: 100 + '%',
      marginLeft: '.25em',
      textAlign: 'left',
    },

    textBox: {
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

      fontSize: 16 / 16 + 'em',
      lineHeight: 1.2,
    },
    rulesText: {
      flex: '0 0 auto',
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      flexFlow: 'column nowrap',
      color: 'black',
      state: {
        empty: {
          minHeight: '1em',
          flex: '0 1 auto',
        },
      },
      input: {
        root: {
          minWidth: '100%',
          display: 'inline',
          fontFamily: 'mplantin',
          minHeight: 1,
        },
      },
    },
    flavorText: {
      width: '100%',
      flex: '0 0 auto',
      justifyContent: 'flex-start',

      display: 'flex',
      alignItems: 'flex-start',
      flexFlow: 'column nowrap',
      // marginBottom: '1.5%',
      state: {
        empty: {
          minHeight: '1em',
          flex: '0 1 auto',
        },
      },
      input: {
        root: {
          minWidth: '100%',
          display: 'inline',
          fontFamily: 'mplantin',
          fontStyle: 'italic',
          fontWeight: 400,
          minHeight: 1,
        },
      },
    },
    textBoxDivider: {
      display: 'block',
      width: '80%',
      margin: '3% auto',
      height: '1px',
      flex: '0 0 1px',
      background:
        'linear-gradient(90deg, transparent 0%,black 20%, black 50% ,black 80%, transparent 100% )',
    },

    artwork: {
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
  },
};
export default defaultTemplate;
