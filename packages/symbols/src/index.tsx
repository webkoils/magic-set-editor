import { Mana } from './mana';
import type { SymbolDelimeters, SymbolMapping } from '@mse/symbol-input';
const manaSymbolMapping: SymbolMapping = [
  { code: 'G', component: Mana.G },
  { code: 'U', component: Mana.U },
  { code: 'B', component: Mana.B },
  { code: 'R', component: Mana.R },
  { code: 'C', component: Mana.C },
  { code: 'W', component: Mana.W },
  { code: 'Inf', component: Mana.Inf },
  { code: 'P', component: Mana.P },
  { code: 'PW', component: Mana.PW },
  { code: 'PU', component: Mana.PU },
  { code: 'PB', component: Mana.PB },
  { code: 'PR', component: Mana.PR },
  { code: 'PG', component: Mana.PG },
  { code: 'T', component: Mana.T },
  { code: '[0-9A-Z]+', component: Mana.C },
];
const manaSymbolDelimeters: SymbolDelimeters = [
  { code: '(', start: true },
  { code: ')', end: true },
];
export { Mana, manaSymbolMapping, manaSymbolDelimeters };
