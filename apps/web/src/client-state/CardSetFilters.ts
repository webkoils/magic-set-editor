import { MseCard } from '@mse/types';
import { cardSorterDesc } from '@mse/utils.card';
import { manaSymbolMapping, parseText } from '@mse/utils.symbol-renderer';
import { useCallback, useMemo, useState } from 'react';
import { CardListColumn, ColumnKey } from './types';

const columns: CardListColumn[] = [
  {
    id: 'collectorNumber',
    label: 'Number',
  },

  { id: 'name', label: 'Name' },
  {
    id: 'manaCost',
    label: 'Cost',
    getFormattedValue: (card) =>
      !card.manaCost
        ? '-'
        : parseText(card.manaCost, manaSymbolMapping, card).flat(),
    sort: (a, b) => {
      return cardSorterDesc(a, b, 'manaCost');
    },
  },
  {
    id: 'types',
    label: 'Types',
  },
  {
    id: 'subtypes',
    label: 'Subtypes',
  },
  {
    id: 'power',
    label: 'P',
  },
  {
    id: 'toughness',
    label: 'T',
  },
];
export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (typeof b[orderBy] !== 'undefined' && typeof a[orderBy] !== 'undefined') {
    if (
      String(a[orderBy]).match(/^[0-9]+$/) &&
      String(b[orderBy]).match(/^[0-9]+$/)
    ) {
      return Number(b[orderBy]) - Number(a[orderBy]);
    }

    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  } else {
    return (
      Number(typeof b[orderBy] !== 'undefined') -
      Number(typeof a[orderBy] !== 'undefined')
    );
  }
}

export type OrderDirection = 'asc' | 'desc';

export function getComparator(
  order: OrderDirection,
  orderBy: ColumnKey
): (a: MseCard, b: MseCard) => number {
  const col = columns.find((c) => c.id === orderBy);
  const sorter = col?.sort;
  if (typeof sorter !== 'undefined') {
    return order === 'desc'
      ? (a, b) => sorter(a, b)
      : (a, b) => -1 * sorter(a, b);
  }
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export const useCardSetFilters = () => {
  const [orderDirection, setOrderDirection] = useState<OrderDirection>('asc');
  const [orderBy, setOrderBy] = useState<ColumnKey>('collectorNumber');
  const [selected, setSelected] = useState<string[]>([]);

  const sorter = useMemo(() => {
    return getComparator(orderDirection, orderBy);
  }, [orderBy, orderDirection]);

  const toggleSelected = useCallback((id: string) => {
    if (id === 'all') {
      setSelected((prev) => (prev[0] === 'all' ? [] : ['all']));
    } else {
      setSelected((prev) => {
        const selectedIndex = prev.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(prev, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(prev.slice(1));
        } else if (selectedIndex === prev.length - 1) {
          newSelected = newSelected.concat(prev.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            prev.slice(0, selectedIndex),
            prev.slice(selectedIndex + 1)
          );
        }

        return newSelected;
      });
    }
  }, []);
  const toggleOrder = useCallback(
    (property: ColumnKey) => {
      const isAsc = orderBy === property && orderDirection === 'asc';
      setOrderDirection(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [orderBy, orderDirection]
  );
  const cardIsSelected = useCallback(
    (id: string) => selected[0] === 'all' || selected.includes(id),
    [selected]
  );

  return useMemo(
    () => ({
      selected,
      toggleSelected,
      sorter,
      orderDirection,
      orderBy,
      setOrderBy,
      setOrderDirection,
      cardIsSelected,
      toggleOrder,
      columns,
      setSelected,
    }),
    [
      selected,
      toggleSelected,
      sorter,
      orderDirection,
      orderBy,
      setOrderBy,
      setOrderDirection,
      cardIsSelected,
      toggleOrder,
      setSelected,
    ]
  );
};
