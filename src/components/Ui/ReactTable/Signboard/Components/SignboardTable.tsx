import React from 'react';
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
import { colors } from '../../../../../Styles/ui';
import { SignboardButtonBox } from './SignboardButtonBox';
import { ISignboard } from '../../../../../services/SignBoardServices';
import TableToolbar from '../../Components/TableToolbar';
import CustomPagination from '../../Components/CustomPagination';

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
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  // const onChange = (e) => {
  //   setValue(e.target.value);
  // };

  // // We'll only update the external data when the input is blurred
  // const onBlur = () => {
  //   updateMyData(index, id, value);
  // };

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return <label htmlFor={value}>{value}</label>;
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

const neeeIcon = (id: string) => {
  if (['state'].includes(id)) return true;
  return false;
};

const EnhancedTable = ({
  columns,
  data,
  skipPageReset,
  hiddenColumns,
}: {
  columns: Column<ISignboard>[];
  data: ISignboard[];
  skipPageReset: boolean;
  hiddenColumns: string[];
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter },
  } = useTable(
    {
      columns,
      data,
      // defaultColumn,
      autoResetPage: !skipPageReset,

      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      initialState: {
        hiddenColumns,
      },
    },
    useGlobalFilter,
    // useSortBy,
    usePagination,
    useRowSelect,
  );

  const handleChangePage = (event: any, newPage: any) => {
    gotoPage(newPage);
  };

  // const handleChangeRowsPerPage = (event) => {
  //   setPageSize(Number(event.target.value));
  // };

  const getFunctionIcon = (id: string, content: string, idx: number, uid: string) => {
    if (id === 'state') {
      return <SignboardButtonBox uid={uid} idx={idx} content={content} />;
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
            const idx = row.values?.idx;
            const uid = row.values?.login;
            const content = row.values?.sign;
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
                      {neeeIcon(id) ? getFunctionIcon(id, content, idx, uid) : cell.render('Cell')}
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

export default EnhancedTable;
