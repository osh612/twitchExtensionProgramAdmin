import styled from '@emotion/styled/macro';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useLocation } from 'react-router-dom';
import ManagementPermitTable from '../../../components/Ui/ReactTable/Management/ManagementPermitTable';
import ManagementTable from '../../../components/Ui/ReactTable/Management/ManagementTable';
import TotalHeader from '../../../components/Ui/TotalHeader';
import JoinServices from '../../../services/JoinServices';
import ManagementServices, {
  IAccount,
  IAccountPermit,
  IManagementReadSuccess,
} from '../../../services/ManagementServices';
import { getManagementMenuIdx, getManagementMenuKey, ManagementMenu } from '../lib/Management.menu';

const ManagementIndex = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [accountCount, setAccountCount] = useState<number>(0);
  const [accountList, setAccountList] = useState<IAccount[]>([]);
  const [accountPermitList, setAccountPermitList] = useState<IAccountPermit[]>([]);
  const TabKey = getManagementMenuKey(location.pathname.split('/management')[1]);

  const { mutate: getManagementList, isLoading: getManagementListLoading } = useMutation(
    () => ManagementServices.getManagementList(),
    {
      onSuccess: (data: IManagementReadSuccess) => {
        setAccountCount(data.count);
        setAccountList(data.managementList);
      },
    },
  );

  const { mutate: getManagementPermitList, isLoading: getManagementPermitListLoading } = useMutation(
    () => ManagementServices.getManagementPermitList(),
    {
      onSuccess: (data) => {
        setAccountCount(data.count);
        setAccountPermitList(data.managementPermitList);
      },
    },
  );

  const { mutate: joinHistory, isLoading: joinHistoryLoading } = useMutation(
    () => JoinServices.joinHistory(),
    {
      onSuccess: (data) => {
        // setAccountCount(data.count);
        // setAccountList(data.joinHistory);
      },
    },
  );

  const loading = getManagementListLoading || getManagementPermitListLoading || joinHistoryLoading;

  const getDataList = () => {
    if (TabKey === ManagementMenu[0].key) {
      getManagementList();
    } else if (TabKey === ManagementMenu[1].key) {
      getManagementPermitList();
    } else {
      // joinHistory();
      setAccountCount(0);
      setAccountList([]);
    }
  };

  useEffect(() => {
    getDataList();
  }, [TabKey]);

  function getManagementTable() {
    if (getManagementMenuIdx(TabKey) === 0) {
      return <ManagementTable accountList={accountList} getDataList={getDataList} />;
    }
    if (getManagementMenuIdx(TabKey) === 1) {
      return <ManagementPermitTable accountList={accountPermitList} getDataList={getDataList} />;
    }
    return <></>;
  }

  return (
    <>
      <TableBox>
        <TotalHeader text={t('management.manageCount').replace('@', accountCount.toString())} />
        {loading ? <></> : getManagementTable()}
      </TableBox>
    </>
  );
};

export default ManagementIndex;

const TableBox = styled.div`
  margin: 40.5px 0 0 0;
`;
