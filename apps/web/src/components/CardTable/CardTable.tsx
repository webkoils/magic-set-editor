import React, { useCallback, useMemo } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { useCardSetContext } from '../../client-state/CardSetState';
import { CardListColumn, ColumnKey } from '../../client-state/types';
import { OrderDirection } from '../../client-state/CardSetFilters';

interface CardTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: ColumnKey
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  orderDirection: OrderDirection;
  orderBy: string;
  rowCount: number;
  columns: CardListColumn[];
}

function CardTableHead(props: CardTableProps) {
  const {
    onSelectAllClick,
    orderDirection,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
  } = props;
  const createSortHandler =
    (property: ColumnKey) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            color='primary'
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all cards',
            }}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'none'}
            sortDirection={orderBy === headCell.id ? orderDirection : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? orderDirection : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {orderDirection === 'desc'
                    ? 'sorted descending'
                    : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export function CardTable({
  onRowClick,
}: {
  onRowClick: (rowId: string) => void;
}) {
  const { filters, sortedAndFilteredCards } = useCardSetContext();
  const {
    orderDirection,
    toggleSelected,
    toggleOrder,
    cardIsSelected,
    orderBy,
    selected,
    columns,
  } = useMemo(() => filters, [filters]);

  const handleRequestSort = useCallback(
    (_event: React.MouseEvent<unknown>, property: ColumnKey) => {
      toggleOrder(property);
    },
    [toggleOrder]
  );

  const handleSelectAllClick = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>) => {
      toggleSelected('all');
    },
    [toggleSelected]
  );

  const handleSelectClick = useCallback(
    (event: React.MouseEvent<unknown>, id: string) => {
      event.stopPropagation();
      event.preventDefault();
      toggleSelected(id);
    },
    [toggleSelected]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby='cards' size={'small'}>
            <CardTableHead
              columns={columns}
              numSelected={selected.length}
              orderDirection={orderDirection}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={sortedAndFilteredCards.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
              {sortedAndFilteredCards.map((row, index) => {
                const isItemSelected = cardIsSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    sx={{ cursor: 'pointer' }}
                    hover
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    onClick={() => onRowClick(row.id)}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        onClick={(event) => handleSelectClick(event, row.id)}
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    {columns.map((c, i) =>
                      i === 0 ? (
                        <TableCell
                          key={c.id}
                          component='th'
                          id={labelId}
                          align='left'
                          scope='row'
                          padding='none'
                        >
                          {c.getFormattedValue
                            ? c.getFormattedValue(row)
                            : row[c.id]}
                        </TableCell>
                      ) : (
                        <TableCell key={c.id} align='left' padding='none'>
                          {c.getFormattedValue
                            ? c.getFormattedValue(row)
                            : row[c.id]}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
