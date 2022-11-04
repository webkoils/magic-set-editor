export interface SymbolInputClasses {
  root: string;
  multiline: string;
  focused: string;
  readonly: string;
  line: string;
}

export const symbolInputClasses: SymbolInputClasses = {
  root: 'MseSymbolInput',
  multiline: 'MseSymbolInput-multiline',
  focused: 'MseSymbolInput-focused',
  readonly: 'MseSymbolInput-readonly',
  line: 'MseSymbolInputLine',
};

export const isSymbolInputClass = (
  key: string
): key is keyof SymbolInputClasses => {
  return (
    typeof (symbolInputClasses as Record<string, any>)[key] !== 'undefined'
  );
};
