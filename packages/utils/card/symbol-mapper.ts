export const createSymbolMap = (symbols: any[]) => {
  const mapping: Record<string, any> = {};
  symbols.forEach((sym) => {
    if (sym.code) {
      mapping[sym.code] = sym;
    }
  });
  return mapping;
};
