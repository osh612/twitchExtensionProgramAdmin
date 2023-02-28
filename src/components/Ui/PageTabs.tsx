import styled from '@emotion/styled';
import { Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../Styles/ui';

const PageTabs = ({ tabList }: { tabList: { key: string; value: string }[] }) => {
  const [tab, setTab] = useState<number>(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
    navigate(tabList[newValue].key);
  };
  return (
    <Wrapper>
      <Tabs value={tab} onChange={handleTabChange} centered>
        {tabList.map((data) => {
          return <Tab sx={{ width: 200 }} label={`${t(data.value)}`} />;
        })}
      </Tabs>
    </Wrapper>
  );
};

export default PageTabs;

const Wrapper = styled.div`
  .MuiTabs-flexContainer {
    border-bottom: solid 1px ${colors.num_444};
  }

  .MuiTab-root {
    border-radius: 10px 10px 0px 0px;
    border: 1px solid ${colors.num_444};
    border-bottom-color: ${colors.num_222};
    color: ${colors.text};
    margin: 0 3px;
  }

  .MuiTabs-indicator {
    border: 1px solid ${colors.num_222};
    background-color: ${colors.num_222};
  }
`;
