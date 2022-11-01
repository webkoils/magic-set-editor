import React, { FC, useContext, useEffect, useMemo } from 'react';
import ManaSymbols from '../svgComponents';

export const MtgSymbolContext = React.createContext<
  typeof ManaSymbols | undefined
>(ManaSymbols);

export const MtgSymbolProvider: FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <MtgSymbolContext.Provider value={ManaSymbols}>
      {children}
    </MtgSymbolContext.Provider>
  );
};

export const useMtgSymbol = () => {
  const symbolContext = useContext(MtgSymbolContext);

  return useMemo(() => {
    return symbolContext || ManaSymbols;
  }, [symbolContext]);
};
