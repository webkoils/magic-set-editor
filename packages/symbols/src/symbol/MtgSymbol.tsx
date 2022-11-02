import { isColor, MseColor } from '@mse/types';
import React, {
  ComponentPropsWithoutRef,
  FC,
  memo,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';
import { mtgSymbolClasses } from '../mtgSymbolClasses';
import { useMtgSymbol } from './MtgSymbolProvider';
const dimensions = [
  [
    {
      height: '80',
      width: '80',
      x: '10',
      y: '10',
      fontSize: 80,
    },
  ],
  [
    {
      height: '37',
      width: '37',
      x: '13',
      y: '13',
      fontSize: 63,
    },
    {
      height: '37',
      width: '37',
      x: '53',
      y: '53',
      fontSize: 63,
    },
  ],
  [
    {
      height: '37',
      width: '37',
      x: '10',
      y: '15',
      fontSize: 20,
    },
    {
      height: '37',
      width: '37',
      x: '55',
      y: '15',
      fontSize: 20,
    },
    {
      height: '37',
      width: '37',
      x: '30',
      y: '60',
      fontSize: 20,
    },
  ],
];

export const MtgSymbol: FC<
  { children: string | number; shadow?: boolean; color?: MseColor } & Partial<
    JSX.IntrinsicElements['svg']
  >
> = memo(({ children, shadow, ...props }) => {
  const ManaSymbols = useMtgSymbol();
  const { childSymbols, className } = useMemo(() => {
    let splitChildren = String(children).split('/').slice(0, 3);
    let dimensionsForSymbolSplit = dimensions[splitChildren.length - 1];
    if (!dimensionsForSymbolSplit) {
      return { className: '', childSymbols: [] };
    }
    const classNameList: string[] = [mtgSymbolClasses.root];
    if (splitChildren.length > 1) {
      classNameList.push(mtgSymbolClasses.split.root);

      if (splitChildren.length === 2) {
        classNameList.push(mtgSymbolClasses.split.half);
      } else if (splitChildren.length === 3) {
        classNameList.push(mtgSymbolClasses.split.third);
      }
    } else {
      classNameList.push(mtgSymbolClasses.whole.root);
    }
    const symbols = splitChildren.map((sym, i, arr) => {
      let childClassName: string[] = [];
      if (splitChildren.length === 2) {
        if (i === 0) {
          childClassName.push(mtgSymbolClasses.split['half1_2']);
        } else if (i === 1) {
          childClassName.push(mtgSymbolClasses.split['half2_2']);
        }
      } else if (splitChildren.length === 3) {
        if (i === 0) {
          childClassName.push(mtgSymbolClasses.split['third1_3']);
        } else if (i === 1) {
          childClassName.push(mtgSymbolClasses.split['third2_3']);
        } else if (i === 2) {
          childClassName.push(mtgSymbolClasses.split['third3_3']);
        }
      }

      let symbol: keyof typeof ManaSymbols.Symbols = 'Generic';
      let backgroundColor: MseColor = MseColor.COLORLESS;

      const dimensionsForSymbol = dimensionsForSymbolSplit[i];
      if (isColor(sym)) {
        backgroundColor = sym;
        symbol = sym;
      } else if (sym.match(/^P(?:W|U|B|R|G|C)?$/)) {
        let [phy, color] = sym.split('');
        symbol = 'P';
        backgroundColor = isColor(color) ? color : MseColor.COLORLESS;
      } else if (sym.match(/^Inf$/)) {
        symbol = 'Inf';
        backgroundColor = MseColor.COLORLESS;
      } else if (sym.match(/^T$/)) {
        symbol = 'T';
        backgroundColor = MseColor.COLORLESS;
      }

      const SymbolComponent = ManaSymbols.Symbols[symbol];
      return [
        <svg
          key={backgroundColor + sym + i}
          x='0'
          y='0'
          className={classNames(childClassName)}
          style={{ overflow: 'visible' }}
          height='100%'
          width='100%'
          viewBox='0 0 100 100'
          clipPath={
            splitChildren.length > 1
              ? `url(#mse-split-${i + 1}-${splitChildren.length})`
              : undefined
          }
        >
          <ManaSymbols.Background
            color={backgroundColor}
            shadow={shadow}
            height='100'
            width='100'
          />

          <SymbolComponent
            width={dimensionsForSymbol.width}
            height={dimensionsForSymbol.height}
            x={dimensionsForSymbol.x}
            y={dimensionsForSymbol.y}
          >
            {symbol === 'Generic' ? sym : undefined}
          </SymbolComponent>
        </svg>,
      ];
    });
    return { childSymbols: symbols, className: classNames(classNameList) };
  }, [children, shadow]);

  return (
    <svg
      className={classNames(className, props.className)}
      style={{
        height: '1em',
        width: '1em',
        overflow: 'visible',
        marginLeft: '.05em',
        marginRight: '.05em',
        marginBottom: '-.125em',
      }}
      {...props}
      viewBox='0 0 100 100'
    >
      <ManaSymbols.SplitMask size={childSymbols.length} />
      {childSymbols}
    </svg>
  );
});
