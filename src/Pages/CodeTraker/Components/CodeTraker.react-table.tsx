import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import MaUTable from '@mui/material/Table';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import { TablePagination } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { Column, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { ICodeTrakerTableData } from './CodeTraker.makedata';
import TableToolbar from '../../../components/Ui/ReactTable/Components/TableToolbar';
import { colors } from '../../../Styles/ui';
import ReissuanceButton from './CodeTraker.reissuance-button';
import CustomPagination from '../../../components/Ui/ReactTable/Components/CustomPagination';

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}: {
  value: any;
  row: { index: number };
  column: { id: string };
  updateMyData: (rowIndex: number, columnId: string, value: string) => void;
}) => {
  const [value, setValue] = React.useState(initialValue);
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <label htmlFor={value}>{value}</label>;
};

const neeeIcon = (id: string) => {
  if (['quizLoad'].includes(id)) return true;
  return false;
};

const CodeTrakerTable = ({
  columns,
  data,
  setData,
  skipPageReset,
  setLoadBankData,
}: {
  columns: Column<ICodeTrakerTableData>[];
  data: ICodeTrakerTableData[];
  setData: React.Dispatch<React.SetStateAction<ICodeTrakerTableData[]>>;
  skipPageReset: boolean;
  setLoadBankData: (loadBankData: ICodeTrakerTableData) => void;
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
      autoResetPage: !skipPageReset,
    },
    useGlobalFilter,
    // useSortBy,
    usePagination,
    useRowSelect,
  );

  const handleChangePage = (event: any, newPage: any) => {
    gotoPage(newPage);
  };

  const getFunctionIcon = (id: string, value: boolean, idx: number, uid: string) => {
    if (id === 'reissuance') {
      return <ReissuanceButton />;
    }
    return <></>;
  };

  // Render the UI for your table
  return (
    <TableContainer>
      <TableToolbar
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        count={data.length}
      />
      <MaUTable
        {...getTableProps()}
        sx={{
          overflow: 'hidden',
        }}
      >
        <TableHead
          sx={{
            backgroundColor: colors.num_111,
            color: colors.text,
            borderTop: `solid 2px ${colors.main}`,
          }}
        >
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  sx={{
                    color: colors.text,
                    textAlign: 'center',
                    borderBottom: `solid 1px ${colors.num_444}`,
                  }}
                  {...column.getHeaderProps()}
                >
                  {column.render('Header')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row);
            const idx = row.values?.no;
            const uid = row.values?.id;
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const { id } = cell.column;
                  const { value } = cell;
                  return (
                    <TableCell
                      sx={{
                        color: colors.text,
                        textAlign: 'center',
                        borderBottomColor: colors.num_444,
                      }}
                      {...cell.getCellProps()}
                    >
                      {neeeIcon(id) ? getFunctionIcon(id, value, idx, uid) : cell.render('Cell')}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter>
          <TableRow
            sx={{
              '.MuiTablePagination-root': {
                overflow: 'hidden',
              },
            }}
          >
            <TablePagination
              colSpan={columns.length}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onPageChange={handleChangePage}
              // onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={CustomPagination}
              sx={{
                '.MuiTablePagination-spacer, .MuiTablePagination-selectLabel, .MuiInputBase-root, .MuiTablePagination-displayedRows':
                  {
                    display: 'none',
                  },
                borderBottom: 'none',
              }}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </TableContainer>
  );
};

export default CodeTrakerTable;
