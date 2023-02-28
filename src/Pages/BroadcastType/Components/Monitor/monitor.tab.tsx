import { Tab, Tabs } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface IMonitorTabParam {
  tab: number;
  handleTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const MonitorTab = ({ tab, handleTabChange }: IMonitorTabParam) => {
  const { t } = useTranslation();
  return (
    <Tabs value={tab} onChange={handleTabChange} sx={{}} centered>
      {/* {[...new Array(getMatchTotalCount(winCount))].map((_, i) => {
    return <Tab label={`SET ${i + 1}`} />;
  })} */}
      <Tab label={t('monitor.tab.quiz')} />
      {/* <Tab label={t('monitor.tab.vote')} /> */}
      <Tab label={t('monitor.tab.close')} />
      <Tab label={t('monitor.tab.notice')} />
    </Tabs>
  );
};

export default MonitorTab;
