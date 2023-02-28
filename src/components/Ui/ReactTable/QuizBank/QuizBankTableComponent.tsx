import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import { useRecoilValue } from 'recoil';
import { Column } from 'react-table';
import QuizBankTable from './Components/QuizBankTable';
import makeQuizBankData, { IQuizBankData } from './makeQuizBankData';
import { permissionsAtom } from '../../../../recoil/Auth/userAtom';
import { IBank } from '../../../../services/QuizBankServices';

const QuizBankTableComponent = ({ bank }: { bank: IBank[] }) => {
  const { t } = useTranslation();
  const perBankEdit = useRecoilValue(permissionsAtom.bankEdit);
  const [arr, setArr] = useState<Column<IQuizBankData>[]>();
  const quizBankTableHeader: Column<IQuizBankData>[] = [
    {
      Header: `${t('bank.table.column.no')}`,
      accessor: 'no',
    },
    {
      Header: `${t('bank.table.column.status')}`,
      accessor: 'status',
    },
    {
      Header: `${t('bank.table.column.quizName')}`,
      accessor: 'quizName',
    },
    {
      Header: `${t('bank.table.column.level')}`,
      accessor: 'level',
    },
    {
      Header: `${t('bank.table.column.game')}`,
      accessor: 'game',
    },
    {
      Header: `${t('bank.table.column.answer')}`,
      accessor: 'answer',
    },
  ];

  useEffect(() => {
    const headerArr = [...quizBankTableHeader];
    if (perBankEdit) {
      setArr([
        ...headerArr,
        {
          Header: t('bank.table.column.fix'),
          accessor: 'edit',
        },
        {
          Header: t('bank.table.column.del'),
          accessor: 'delete',
        },
      ]);
    }
  }, []);

  const columns = React.useMemo(() => arr, [arr]);

  const [data, setData] = React.useState<IQuizBankData[]>(React.useMemo(() => makeQuizBankData(bank), []));
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex: number, columnId: string, value: string) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData((old: any) =>
      old.map((row: any, index: number) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      }),
    );
  };

  return (
    <div>
      <CssBaseline />
      {columns ? (
        <QuizBankTable
          columns={columns}
          data={data}
          setData={setData}
          // updateMyData={updateMyData}
          skipPageReset={skipPageReset}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuizBankTableComponent;
