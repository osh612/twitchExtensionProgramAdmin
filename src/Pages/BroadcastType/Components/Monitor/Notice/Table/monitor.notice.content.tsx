import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CssBaseline from '@mui/material/CssBaseline';
import { useRecoilValue } from 'recoil';
import { Column } from 'react-table';
import makeQuizNoticeData, { IQuizNoticeData } from './monitor.notice.make-data';
import QuizNoticeTable from './Components/monitor.notice.table';
import { IQuizMessageHistoryList } from '../../../../../../services/QuizServices';
import { INoticeSocketHandlerParam } from '../../monitor.notice';

const QuizNoticeComponent = ({
  notice,
  onNoticeSocketHandler,
  isCloseMatch,
}: {
  notice: IQuizMessageHistoryList[];
  onNoticeSocketHandler: (data: INoticeSocketHandlerParam) => void;
  isCloseMatch: boolean;
}) => {
  const { t } = useTranslation();
  const [arr, setArr] = useState<Column<IQuizNoticeData>[]>([
    {
      Header: `${t('monitor.notice.table.no')}`,
      accessor: 'no',
    },
    {
      Header: `${t('monitor.notice.table.time')}`,
      accessor: 'time',
    },
    {
      Header: `${t('monitor.notice.table.message')}`,
      accessor: 'message',
    },
    // {
    //   Header: `${t('monitor.notice.table.state')}`,
    //   accessor: 'state',
    // },
    {
      Header: `${t('none')}`,
      accessor: 'resend',
    },
  ]);

  const columns = React.useMemo(() => arr, [arr]);

  const [data, setData] = React.useState<IQuizNoticeData[]>(
    React.useMemo(() => makeQuizNoticeData(notice), []),
  );
  const [skipPageReset, setSkipPageReset] = React.useState(false);

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

  useEffect(() => {
    setData(makeQuizNoticeData(notice));
  }, [notice]);

  return (
    <div>
      <CssBaseline />
      {columns ? (
        <QuizNoticeTable
          columns={columns}
          data={data}
          setData={setData}
          // updateMyData={updateMyData}
          skipPageReset={skipPageReset}
          onNoticeSocketHandler={onNoticeSocketHandler}
          isCloseMatch={isCloseMatch}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default QuizNoticeComponent;
