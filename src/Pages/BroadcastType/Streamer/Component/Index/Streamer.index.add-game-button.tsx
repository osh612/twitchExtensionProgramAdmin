import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../../../../recoil/Auth/userAtom';
import ScheduleServices, { ICreateSteamerScheduleParam } from '../../../../../services/ScheduleServices';

interface IAddStreamerGameButtonParam {
  scheduleHandler: () => void;
}

const AddStreamerGameButton = ({ scheduleHandler }: IAddStreamerGameButtonParam) => {
  const { t } = useTranslation();
  const user = useRecoilValue(userAtom);
  const { mutate: createSteamerSchedule, isLoading } = useMutation(
    (data: ICreateSteamerScheduleParam) => ScheduleServices.createSteamerSchedule(data),
    {
      onSuccess: (data) => {
        scheduleHandler();
      },
    },
  );

  const clickHandler = () => {
    if (user) {
      createSteamerSchedule({ accountIdx: user.accountIdx });
    }
  };

  return (
    <Button variant='contained' onClick={clickHandler}>
      {t('streamer.index.button.addGame')}
    </Button>
  );
};

export default AddStreamerGameButton;
