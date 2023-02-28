import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { IconCss } from '../../../../../lib/Ui/IconCss';

const EditQuizButton = ({ idx, selectedUid }: { idx: number; selectedUid: string }) => {
  const onConfirm = () => {
    // console.log('정답이다 연금술사');
  };

  return (
    <IconButton
      onClick={() => {
        onConfirm();
      }}
    >
      <EditIcon sx={IconCss} fontSize='inherit' />
    </IconButton>
  );
};

export default EditQuizButton;
