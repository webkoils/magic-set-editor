import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { CardListColumn, ColumnKey } from './types';
import { manaSymbolMapping, parseText } from '@mse/utils/symbolRenderer';
import { MseCard } from '@mse/types';
import { cardSorterDesc, sortColors } from '@mse/utils.card';

const columns: CardListColumn[] = [
  {
    id: 'collectorNumber',
    label: 'Number',
  },

  { id: 'name', label: 'Name', valueGetter: (card) => card.name },
  {
    id: 'manaCost',
    label: 'Cost',
    displayGetter: (card) =>
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
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (typeof b[orderBy] !== 'undefined' && typeof a[orderBy] !== 'undefined') {
    if (
      String(a[orderBy]).match(/[0-9]*/) &&
      String(b[orderBy]).match(/[0-9]*/)
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

type Order = 'asc' | 'desc';

function getComparator(
  order: Order,
  orderBy: ColumnKey
): (a: MseCard, b: MseCard) => number {
  let col = columns.find((c) => c.id === orderBy);
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

interface CardTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: ColumnKey
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function CardTableHead(props: CardTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property: ColumnKey) => (
    event: React.MouseEvent<unknown>
  ) => {
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
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {columns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'left'}
            padding={'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface CardTableToolbarProps {
  numSelected: number;
}

function CardTableToolbar(props: CardTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color='inherit'
          variant='subtitle1'
          component='div'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant='h6'
          id='tableTitle'
          component='div'
        >
          Cards
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title='Delete'>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export function CardTable({
  rows,
  onRowClick,
}: {
  rows: MseCard[];
  onRowClick: (rowId: string) => void;
}) {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<ColumnKey>('collectorNumber');
  const [selected, setSelected] = useState<readonly string[]>([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const sorter = useMemo(() => {
    return getComparator(order, orderBy);
  }, [orderBy, order]);

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: ColumnKey) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.id);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    },
    [rows]
  );

  const handleSelectClick = useCallback(
    (event: React.MouseEvent<unknown>, id: string) => {
      event.stopPropagation();
      event.preventDefault();
      setSelected((prev) => {
        const selectedIndex = prev.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(prev, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(prev.slice(1));
        } else if (selectedIndex === selected.length - 1) {
          newSelected = newSelected.concat(prev.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            prev.slice(0, selectedIndex),
            prev.slice(selectedIndex + 1)
          );
        }

        return newSelected;
      });
    },
    []
  );

  // const handleChangePage = useCallback((event: unknown, newPage: number) => {
  //   setPage(newPage);
  // }, []);

  // const handleChangeRowsPerPage = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //     setPage(0);
  //   },
  //   []
  // );

  // const handleChangeDense = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setDense(event.target.checked);
  //   },
  //   []
  // );

  const isSelected = useCallback((id: string) => selected.indexOf(id) !== -1, [
    selected,
  ]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = useMemo(
    () => (page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0),
    [page, rowsPerPage, rows]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CardTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table aria-labelledby='tableTitle' size={'small'}>
            <CardTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.sort(getComparator(order, orderBy)).slice() */}
              {rows
                .sort(sorter)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
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
                            scope='row'
                            padding='none'
                          >
                            {c.displayGetter ? c.displayGetter(row) : row[c.id]}
                          </TableCell>
                        ) : (
                          <TableCell key={c.id} align='right'>
                            {c.displayGetter ? c.displayGetter(row) : row[c.id]}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Paper>
    </Box>
  );
}
