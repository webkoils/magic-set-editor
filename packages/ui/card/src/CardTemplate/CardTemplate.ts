export const templateClasses = {
  card: { root: 'MseCard-Root' },
  background: { root: 'MseBackground-Root' },
  topLine: {
    root: 'MseTopLine-Root',
    name: 'MseTopLine-Name',
    cost: 'MseTopLine-Cost',
  },
  typeLine: {
    root: 'MseTypeLine-Root',
    divider: 'MseTypeLine-Divider',
    input: 'MseTypeLine-Input',
    setSymbol: 'MseTypeLine-SetSymbol',
  },
  powerToughness: {
    root: 'MsePowerToughness-Root',
    label: 'MsePowerToughness-Label',
    divider: 'MsePowerToughness-Divider',
    power: 'MsePowerToughness-Power',
    toughness: 'MsePowerToughness-Toughness',
  },
  textBox: {
    root: 'MseTextBox-Root',
    rulesText: 'MseTextBox-RulesText',
    flavorText: 'MseTextBox-FlavorText',
    textBoxDivider: 'MseTextBox-TextBoxDivider',
  },
  artwork: { root: 'MseArtwork-Root' },
  input: {
    root: 'MseCardField',
    focused: 'MseCardField-Focused',
    readonly: 'MseCardField-Readonly',
  },
  symbol: { root: 'MtgSymbol', background: 'MtgSymbolCircleBackground' },
} as const;
