import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import { Column } from 'react-table';
import QuizLoadTable from './Components/QuizLoadTable';
import makeData, { IQuizLoadData } from './makeLoadBankData';
import { IBank } from '../../../../services/QuizBankServices';

const QuizLoadTableComponent = ({
  bank,
  setLoadBankData,
}: {
  bank: IBank[];
  setLoadBankData: (loadBankData: IBank) => void;
}) => {
  const { t } = useTranslation();
  const quizBankLoadTableHeader: Column<IQuizLoadData>[] = [
    {
      Header: t('bank.table.column.no'),
      accessor: 'no',
    },
    {
      Header: t('bank.table.column.status'),
      accessor: 'status',
    },
    {
      Header: t('bank.table.column.quizName'),
      accessor: 'quizName',
    },
    {
      Header: t('bank.table.column.level'),
      accessor: 'level',
    },
    {
      Header: t('bank.table.column.game'),
      accessor: 'game',
    },
    {
      Header: t('bank.table.column.answer'),
      accessor: 'answer',
    },
    {
      Header: t('bank.button.quizLoad'),
      accessor: 'quizLoad',
    },
  ];

  const columns = React.useMemo(() => quizBankLoadTableHeader, []);

  const [data, setData] = React.useState<IQuizLoadData[]>(React.useMemo(() => makeData(bank), []));
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
      <QuizLoadTable
        columns={columns}
        data={data}
        setData={setData}
        // updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setLoadBankData={setLoadBankData}
      />
    </div>
  );
};

export default QuizLoadTableComponent;
