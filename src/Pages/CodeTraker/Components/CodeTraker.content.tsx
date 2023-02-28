import { CssBaseline } from '@mui/material';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Column } from 'react-table';
import makeLoadCodeTrakerData, { ICodeTrakerTableData } from './CodeTraker.makedata';
import CodeTrakerTable from './CodeTraker.react-table';

const CodeTrakerContent = ({
  codeTraker,
  setCodeTrakerData,
}: {
  codeTraker: ICodeTrakerTableData[];
  setCodeTrakerData: (loadCodeTrakerData: ICodeTrakerTableData) => void;
}) => {
  const { t } = useTranslation();
  const quizBankLoadTableHeader: Column<ICodeTrakerTableData>[] = [
    {
      Header: t('codeTraker.table.column.no'),
      accessor: 'no',
    },
    {
      Header: t('codeTraker.table.column.accountType'),
      accessor: 'accountType',
    },
    {
      Header: t('codeTraker.table.column.chennel'),
      accessor: 'chennel',
    },
    {
      Header: t('codeTraker.table.column.code'),
      accessor: 'code',
    },
    {
      Header: t('codeTraker.table.column.reissuance'),
      accessor: 'reissuance',
    },
  ];

  const columns = useMemo(() => quizBankLoadTableHeader, []);

  const [data, setData] = useState<ICodeTrakerTableData[]>(
    useMemo(() => makeLoadCodeTrakerData(codeTraker), []),
  );
  const [skipPageReset, setSkipPageReset] = useState(false);

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
      <CodeTrakerTable
        columns={columns}
        data={data}
        setData={setData}
        // updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        setLoadBankData={setCodeTrakerData}
      />
    </div>
  );
};

export default CodeTrakerContent;
