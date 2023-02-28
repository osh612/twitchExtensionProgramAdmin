import React from 'react';
import { useTranslation } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import { Column } from 'react-table';
import makeSignboardData from './makeSignboardData';
import { ISignboard } from '../../../../services/SignBoardServices';
import SignboardTable from './Components/SignboardTable';

const SignboardTableComponent = ({ signboardList }: { signboardList: ISignboard[] }) => {
  const { t } = useTranslation();
  const signboardTableHeader: Column<ISignboard>[] = [
    {
      Header: t('signboard.table.column.idx'),
      accessor: 'idx',
    },
    {
      Header: t('signboard.table.column.uid'),
      accessor: 'uid',
    },
    {
      Header: t('signboard.table.column.regDate'),
      accessor: 'regDate',
    },

    {
      Header: t('signboard.table.column.displayName'),
      accessor: 'login',
    },
    {
      Header: t('signboard.table.column.state'),
      accessor: 'state',
    },
    {
      Header: t('signboard.table.column.sign'),
      accessor: 'sign',
    },
  ];

  const columns = React.useMemo(() => signboardTableHeader, []);

  const [data, setData] = React.useState<ISignboard[]>(
    React.useMemo(() => makeSignboardData(signboardList), []),
  );
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data

  return (
    <div>
      <CssBaseline />
      <SignboardTable columns={columns} data={data} skipPageReset={skipPageReset} hiddenColumns={['sign']} />
    </div>
  );
};

export default SignboardTableComponent;
