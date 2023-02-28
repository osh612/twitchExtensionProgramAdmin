import React, { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { useTable } from 'react-table';
import EditAccountButton from '../../../../Pages/Management/Components/management.button.edit-account';
import DeleteAccountButton from '../../../../Pages/Management/Components/management.button.delete-account';
import JoinAcceptButton from '../../../../Pages/Management/Components/management.button.join-accept';
import { colors } from '../../../../Styles/ui';
import { IAccount } from '../../../../services/ManagementServices';
import makeAccountData from './makeAccountData';

function Table({
  columns,
  data,
  hideKeys,
  getDataList,
}: {
  columns: {
    Header: string;
    accessor: string;
  }[];
  data: any;
  hideKeys: string[];
  getDataList: () => void;
}) {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
    initialState: {
      hiddenColumns: hideKeys,
    },
  });

  const needColorGreen = (id: string, value: string | number) => {
    if (['quizRegister', 'quizQuestion', 'gradeManage'].includes(id) && value === 'O') return true;
    return false;
  };

  const neeeIcon = (id: string) => {
    if (['edit', 'delete', 'checkAccept'].includes(id)) return true;
    return false;
  };

  const getFunctionIcon = (id: string, value: boolean, idx: number, values: any) => {
    if (value) return <></>;

    if (id === 'edit') {
      return <EditAccountButton uid={values.id} getDataList={getDataList}/>;
    }
    // if (id === 'delete') {
    //   return <DeleteAccountButton idx={idx} values={values}  />;
    // }
    // if (id === 'checkAccept') {
    //   return <JoinAcceptButton values={values} />;
    // }
    return <></>;
  };

  // Render the UI for your table
  return (
    <MuiTable {...getTableProps()}>
      <TableHead sx={{ backgroundColor: colors.num_111, borderTop: `solid 2px ${colors.main}` }}>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell
                sx={{ color: colors.text, textAlign: 'center', borderBottomColor: colors.num_444 }}
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          const idx = row.values?.no;
          const { values } = row;
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                const { id } = cell.column;
                const { value } = cell;
                return (
                  <TableCell
                    sx={{
                      color: needColorGreen(cell.column.id, cell.value) ? colors.main : colors.num_ccc,
                      textAlign: 'center',
                      borderBottomColor: colors.num_444,
                    }}
                    {...cell.getCellProps()}
                  >
                    {neeeIcon(id) ? getFunctionIcon(id, value, idx, values) : cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );
}

const ManagementTable = ({
  accountList,
  getDataList,
}: {
  accountList: IAccount[];
  getDataList: () => void;
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  let arr: {
    Header: string;
    accessor: string;
  }[] = [];
  let showItems = [];
  let hideItems: { Header: string; accessor: string }[] = [];

  const columnsDataset = {
    no: {
      Header: t('management.accountTable.header.no'),
      accessor: 'no',
    },
    idx: {
      Header: t('management.accountTable.header.no'),
      accessor: 'idx',
    },
    id: {
      Header: t('management.accountTable.header.id'),
      accessor: 'id',
    },
    channel: {
      Header: t('management.accountTable.header.channel'),
      accessor: 'channel',
    },
    email: {
      Header: t('management.accountTable.header.email'),
      accessor: 'email',
    },
    broadcastType: {
      Header: t('management.accountTable.header.broadcastType'),
      accessor: 'broadcastType',
    },
    gameList: {
      Header: t('management.accountTable.header.gameList'),
      accessor: 'gameList',
    },
    leagueList: {
      Header: t('management.accountTable.header.leagueList'),
      accessor: 'leagueList',
    },
    grade: {
      Header: t('management.accountTable.header.grade'),
      accessor: 'grade',
    },
    note: {
      Header: t('management.accountTable.header.note'),
      accessor: 'note',
    },
    edit: {
      Header: t('management.accountTable.header.edit'),
      accessor: 'edit',
    },
    password: {
      Header: t('management.accountTable.header.password'),
      accessor: 'password',
    },
    state: {
      Header: t('management.accountTable.header.state'),
      accessor: 'state',
    },
    joinDate: {
      Header: t('management.accountTable.header.joinDate'),
      accessor: 'joinDate',
    },
    checkAccept: {
      Header: t('management.accountTable.header.checkAccept'),
      accessor: 'checkAccept',
    },
    checkJoin: {
      Header: t('management.accountTable.header.checkJoin'),
      accessor: 'checkJoin',
    },
    processingDate: {
      Header: t('management.accountTable.header.processingDate'),
      accessor: 'processingDate',
    },
  };

  // 탭에 맞는 테이블 셋팅
  const { no, id, email, broadcastType, grade, note, edit, gameList, leagueList, state, password } =
    columnsDataset;
  showItems = [no, id, email, broadcastType, grade, note, edit];
  hideItems = [gameList, leagueList, state, password];
  arr = arr.concat(showItems); // show
  arr = arr.concat(hideItems); // hide

  const columns = React.useMemo(() => arr, [accountList]);
  const data = React.useMemo(() => makeAccountData(accountList), [accountList]);

  return (
    <Wrapper>
      <CssBaseline />
      <Table
        columns={columns}
        data={data}
        hideKeys={hideItems.map((data) => data.accessor)}
        getDataList={getDataList}
      />
    </Wrapper>
  );
};

export default ManagementTable;

const Wrapper = styled.div`
  margin-top: 16px;
  .MuiIconButton-root {
    padding: 0;
  }
`;
