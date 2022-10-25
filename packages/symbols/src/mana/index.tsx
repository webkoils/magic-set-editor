import * as mse from '@mse/types';
import BSvg from './BSvg';
import CSvg from './CSvg';
import GSvg from './GSvg';
import RSvg from './RSvg';
import WSvg from './WSvg';
import USvg from './USvg';
import TapSvg from './TapSvg';
import PhySvg from './PhySvg';
import InfiniteSvg from './InfiniteSvg';

import GenericSvg from './Generic';
import { MtgSymbol, MtgSymbolProps } from '../MtgSymbol';
import { memo } from 'react';

export interface ManaSymbolProps extends Partial<MtgSymbolProps> {
  children?: string | number;
}

const Mana = {
  W: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.WHITE}>
      <WSvg />
    </MtgSymbol>
  )),
  U: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.BLUE}>
      <USvg />
    </MtgSymbol>
  )),
  B: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.BLACK}>
      <BSvg />
    </MtgSymbol>
  )),
  R: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.RED}>
      <RSvg />
    </MtgSymbol>
  )),
  G: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.GREEN}>
      <GSvg />
    </MtgSymbol>
  )),
  C: memo(({ children, ...props }: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.COLORLESS}>
      {children ? <GenericSvg>{children}</GenericSvg> : <CSvg />}
    </MtgSymbol>
  )),
  T: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.COLORLESS}>
      <TapSvg />
    </MtgSymbol>
  )),
  P: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={props.color || mse.MseColor.COLORLESS}>
      <PhySvg />
    </MtgSymbol>
  )),
  PW: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.WHITE}>
      <PhySvg />
    </MtgSymbol>
  )),
  PU: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.BLUE}>
      <PhySvg />
    </MtgSymbol>
  )),
  PB: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.BLACK}>
      <PhySvg />
    </MtgSymbol>
  )),
  PR: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.RED}>
      <PhySvg />
    </MtgSymbol>
  )),
  PG: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={mse.MseColor.GREEN}>
      <PhySvg />
    </MtgSymbol>
  )),
  Inf: memo((props: ManaSymbolProps) => (
    <MtgSymbol {...props} color={props.color || mse.MseColor.COLORLESS}>
      <InfiniteSvg />
    </MtgSymbol>
  )),
};
export { Mana };
