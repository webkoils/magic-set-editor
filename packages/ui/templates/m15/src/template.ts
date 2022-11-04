import { mtgSymbolClasses } from '@mse/symbols/src/mtgSymbolClasses';
import { symbolInputClasses } from '@mse/symbol-input/src/symbolInputClasses';
export const CardTemplateClassNames = {
  root: 'MseTemplateM15',
  card: 'MseCard',
  background: 'MseCardBackground',
  topLine: 'MseCardTopLine',
  name: 'MseCardName',
  cost: 'MseCardCost',
  typeLine: 'MseCardTypeLine',
  typeLineDivider: 'MseCardTypeLineDivider',
  setSymbol: 'MseCardSetSymbol',
  pt: 'MseCardPowerToughness',
  ptLabel: 'MseCardPowerToughnessLabel',
  ptDivider: 'MseCardPowerToughnessDivider',
  power: 'MseCardPower',
  toughness: 'MseCardToughness',
  artwork: 'MseCardArtwork',
  textBox: 'MseCardTextBox',

  rulesText: 'MseCardRulesText',
  flavorText: 'MseCardFlavorText',
  textBoxDivider: 'MseCardTextBoxDivider',
} as const;
export const CardStateClassNames = {
  focused: 'MseCard-focused',
  disabled: 'MseCard-disabled',
  empty: 'MseCard-empty',
} as const;
export type CardTemplate = {
  id: string;
  components: Record<string, any>;
};

const Template: CardTemplate = {
  id: 'M15',
  components: {
    [CardTemplateClassNames.card]: {
      position: 'relative',
      width: 375,
      height: 523,
      color: 'black',
      fontFamily: 'beleren',
      [`& .${symbolInputClasses.root}`]: {
        display: 'inline',
        minWidth: '1em',
      },
      [`& .${symbolInputClasses.line}`]: {
        display: 'block',
        marginBottom: '1.5%',
      },
    },
    [CardTemplateClassNames.background]: {
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

    [CardTemplateClassNames.topLine]: {
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
    [CardTemplateClassNames.name]: {
      fontSize: 18 / 16 + 'em',
      height: '100%',
      flex: '0 1 100%',
    },
    [CardTemplateClassNames.cost]: {
      minWidth: 5,
      fontSize: 18 / 16 + 'em',
      height: '100%',
      flex: '0 0 auto',
      [`& .${mtgSymbolClasses.root}`]: {
        filter: 'drop-shadow(-.025em .1em 0px rgb(0 0 0))',
        overflow: 'visible',
      },
    },

    [CardTemplateClassNames.typeLine]: {
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
      [`& .${symbolInputClasses.root}`]: {
        minWidth: '1em',
        fontFamily: 'beleren',
      },
    },
    [CardTemplateClassNames.typeLineDivider]: {
      fontFamily: 'beleren',
      marginLeft: '.5em',
      marginRight: '.5em',
    },

    [CardTemplateClassNames.pt]: {
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
    [CardTemplateClassNames.ptLabel]: {
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
    [CardTemplateClassNames.ptDivider]: {
      fontSize: '1em',
      textAlign: 'center',
      width: '1em',

      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%,-50%)',
      height: 100 + '%',
    },
    [CardTemplateClassNames.power]: {
      fontSize: '1em',
      position: 'relative',
      flex: '0 0 30%',
      height: 100 + '%',

      marginRight: '.25em',
      textAlign: 'right',
    },
    [CardTemplateClassNames.toughness]: {
      fontSize: '1em',
      position: 'relative',
      flex: '0 0 30%',
      height: 100 + '%',
      marginLeft: '.25em',
      textAlign: 'left',
    },

    [CardTemplateClassNames.textBox]: {
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
    [CardTemplateClassNames.rulesText]: {
      flex: '0 0 auto',
      width: '100%',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'flex-end',
      flexFlow: 'column nowrap',
      color: 'black',
      [`&.${CardStateClassNames.empty}`]: {
        minHeight: '1em',
        flex: '0 1 auto',
      },
      [`& .${symbolInputClasses.root}`]: {
        minWidth: '100%',
        display: 'inline',
        fontFamily: 'mplantin',
        minHeight: 1,
      },
    },
    [CardTemplateClassNames.flavorText]: {
      width: '100%',
      flex: '0 0 auto',
      justifyContent: 'flex-start',

      display: 'flex',
      alignItems: 'flex-start',
      flexFlow: 'column nowrap',
      // marginBottom: '1.5%',
      [`&.${CardStateClassNames.empty}`]: {
        minHeight: '1em',
        flex: '0 1 auto',
      },
      [`& .${symbolInputClasses.root}`]: {
        minWidth: '100%',
        display: 'inline',
        fontFamily: 'mplantin',
        fontStyle: 'italic',
        fontWeight: 400,
        minHeight: 1,
      },
    },
    [CardTemplateClassNames.textBoxDivider]: {
      display: 'block',
      width: '80%',
      margin: '3% auto',
      height: '1px',
      flex: '0 0 1px',
      background:
        'linear-gradient(90deg, transparent 0%,black 20%, black 50% ,black 80%, transparent 100% )',
    },

    [CardTemplateClassNames.artwork]: {
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
export default Template;
