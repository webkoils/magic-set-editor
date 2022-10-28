import BSvg from './BSvg';
import CSvg from './CSvg';
import GSvg from './GSvg';
import RSvg from './RSvg';
import WSvg from './WSvg';
import USvg from './USvg';
import TapSvg from './TapSvg';
import PhySvg from './PhySvg';
import InfiniteSvg from './InfiniteSvg';
import SplitMask from '../svgComponents/SplitMask';

import GenericSvg from './Generic';
import { CircleBackgroundSvg } from './CircleBackgroundSvg';

const mapping = {
  Symbols: {
    W: WSvg,
    U: USvg,
    B: BSvg,
    R: RSvg,
    G: GSvg,
    C: CSvg,
    Inf: InfiniteSvg,
    P: PhySvg,
    T: TapSvg,
    Generic: GenericSvg,
  },
  Background: CircleBackgroundSvg,
  SplitMask,
};
export default mapping;
