import React from 'react';

import Checkbox from '@mui/material/Checkbox';
import MaUTable from '@mui/material/Table';
import { t } from 'i18next';
import PropTypes from 'prop-types';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TableHead from '@mui/material/TableHead';
import { TablePagination } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import styled from '@emotion/styled';
import { Column, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { IQuizNoticeData } from '../monitor.notice.make-data';
import TableToolbar from '../../../../../../../components/Ui/ReactTable/Components/TableToolbar';
import { colors } from '../../../../../../../Styles/ui';
import CustomPagination from '../../../../../../../components/Ui/ReactTable/Components/CustomPagination';
import ResendButton from './monitor.notice.button.resend';
import { INoticeSocketHandlerParam, INoticeSocketParam } from '../../../monitor.notice';

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

const QuizNoticeTable = ({
  columns,
  data,
  setData,
  skipPageReset,
  onNoticeSocketHandler,
  isCloseMatch,
}: {
  columns: Column<IQuizNoticeData>[];
  data: IQuizNoticeData[];
  setData: React.Dispatch<React.SetStateAction<IQuizNoticeData[]>>;
  skipPageReset: boolean;
  onNoticeSocketHandler: (data: INoticeSocketHandlerParam) => void;
  isCloseMatch: boolean;
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
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data,
      autoResetPage: !skipPageReset,
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
  );

  const handleChangePage = (event: any, newPage: any) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = (event: { target: { value: any } }) => {
    setPageSize(Number(event.target.value));
  };

  const neeeTransfer = (id: string) => {
    if (['resend', 'state'].includes(id)) return true;
    return false;
  };

  const getFunctionIcon = (id: string, value: any, row: Record<string, any>) => {
    if (id === 'resend') {
      if (row?.values) {
        return (
          <ResendButton
            idx={row.values.no}
            selectedUid={row.values.idx}
            message={row.values.message}
            onNoticeSocketHandler={onNoticeSocketHandler}
            isCloseMatch={isCloseMatch}
          />
        );
      }
    }
    // if (id === 'state') {
    //   const text = t(`monitor.notice.send-state.${value}`);
    //   return <SendStateLabel state={value}>{text}</SendStateLabel>;
    // }
    return <></>;
  };

  // Render the UI for your table
  return (
    <TableContainer>
      {/* <TableToolbar
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        count={data.length}
      /> */}
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
            const message = row.values?.message;
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  const { id } = cell.column;
                  const { value } = cell;
                  return (
                    <TableCell
                      sx={{
                        color: colors.num_ccc,
                        textAlign: id === 'message' ? 'left' : 'center',
                        borderBottomColor: colors.num_444,
                      }}
                      {...cell.getCellProps()}
                    >
                      {neeeTransfer(id) ? getFunctionIcon(id, value, row) : cell.render('Cell')}
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

export default QuizNoticeTable;

const getStateColor = (state: number) => {
  switch (state) {
    case 0:
      return colors.num_6f6;
    case 1:
      return colors.main;
    default:
      return colors.text;
  }
};

const SendStateLabel = styled.label<{ state: number }>`
  color: ${({ state }) => getStateColor(state)};
`;
