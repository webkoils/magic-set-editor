import { mtgSymbolShadow } from '@mse/symbols';
import { CardTemplate } from './cardTemplateClasses';

const defaultTemplate: CardTemplate = {
  id: 'm15',
  components: {
    root: {
      fontSize: '1em',
      position: 'relative',
      width: 375,
      height: 523,
      color: 'black',
      fontFamily: 'beleren',

      symbol: {
        root: {},
      },

      input: {
        root: {
          outline: 0,

          display: 'inline',
          minWidth: '1em',
          position: 'relative',
          cursor: 'pointer',
          '&::before': {
            position: 'absolute',
            left: -1,
            right: -1,
            top: -1,
            bottom: -1,
            visibility: 'visible',
            borderRadius: 4,
            content: "''",
            transition:
              'opacity 100ms 0s linear,background-color 100ms 0s linear',
            border: '1px dashed rgba(0,0,0,1)',
            backgroundColor: 'rgba(0,0,0,.1)',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 0,
          },
          '&:focused': {
            outline: 0,
          },
          '&:hover': {
            '&::before': {
              transition:
                'opacity 100ms 0s linear,background-color 100ms 0s linear',
              opacity: 1,
            },
          },
        },
        focused: {
          '&::before': { opacity: 1, backgroundColor: 'transparent' },
          '&:hover': {
            backgroundColor: 'transparent',
            '&::before': {
              opacity: 1,
            },
          },
          marginBottom: '1.5%',
          cursor: 'text',
        },
        singleLine: { marginBottom: '0' },
        readonly: {
          cursor: 'default',

          '&:hover': {
            backgroundColor: 'transparent',
            '&::before': {
              opacity: 0,
            },
          },
        },
      },
    },
    hiddenField: {
      outline: 0,

      display: 'inline',
      minWidth: '1em',
      position: 'relative',
      cursor: 'pointer',
      '&::before': {
        position: 'absolute',
        left: -1,
        right: -1,
        top: -1,
        bottom: -1,
        visibility: 'visible',
        borderRadius: 4,
        content: "''",
        transition: 'opacity 100ms 0s linear,background-color 100ms 0s linear',
        border: '1px solid rgba(0,0,0,1)',
        backgroundColor: 'rgba(0,0,0,.1)',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -1,
      },
      '&:focused': {
        outline: 0,
      },
      '&:hover': {
        '&::before': {
          transition:
            'opacity 100ms 0s linear,background-color 100ms 0s linear',
          opacity: 1,
        },
      },
    },
    background: {
      bottom: 0,
      right: 0,
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
      top: 298,
      // paddingTop: '1%',
      left: 32,
      // right: ,
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
      input: {
        root: { height: '100%' },
      },
    },
    typeLineDivider: {
      fontFamily: 'beleren',
      marginLeft: '.5em',
      height: '100%',
      marginRight: '.5em',
    },

    pt: {
      position: 'absolute',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      left: 287,
      top: 469,
      width: 65,
      height: 32,
      backgroundSize: '100% 100%',
      zIndex: 3,
      fontFamily: 'beleren',
      fontSize: '1em',
      lineHeight: 1.5,
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
    ptLabel: {
      fontSize: '1em',
      textAlign: 'center',
      flex: '0 1 60px',
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginRight: '-8%',
      input: { root: { minWidth: '0' } },
    },
    ptDivider: {
      fontSize: '1em',
      textAlign: 'center',
      flex: '0 0 auto',

      height: 100 + '%',
    },
    power: {
      fontSize: '1em',
      position: 'relative',
      flex: '0 1 auto',
      height: 100 + '%',

      textAlign: 'right',
      state: {
        empty: {
          minHeight: '1em',
          flex: '0 1 auto',
        },
      },
    },
    toughness: {
      fontSize: '1em',
      position: 'relative',
      flex: '0 1 auto',
      height: 100 + '%',
      minWidth: '0',

      textAlign: 'left',
      state: {
        empty: {
          minHeight: '1em',
          flex: '0 1 auto',
        },
      },
    },

    textBox: {
      width: 310,
      position: 'absolute',
      top: 327,
      left: 29,
      // right: '8.5%',
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
      input: { line: { display: 'block', marginBottom: '1.5%' } },
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
export { defaultTemplate };
