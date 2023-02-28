import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { IconButton } from '@mui/material';
import { ReactElement, useRef } from 'react';
import { colors } from '../../Styles/ui';

const MoveTopButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton
      onClick={() => onClick()}
      sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: colors.num_ccc,
        ':hover': {
          backgroundColor: colors.num_222,
        },
      }}
    >
      <ArrowUpwardIcon />
    </IconButton>
  );
};

export default MoveTopButton;
