import { Button, Modal } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as XLSX from 'xlsx';

import ConfirmModal2Box from '../../../../components/Ui/Modal/ConfirmModal2Box';
import { IBank } from '../../../../services/QuizBankServices';

const DownloadQuizButton = ({
  buttonCss,
  bank,
}: {
  buttonCss: { padding: string; height: number; borderRadius: string };
  bank: IBank[];
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const exportExcel = (bank: IBank[]) => {
    // Header 주면 이걸로 교체
    // const Heading = [['FirstName', 'Last Name', 'Email']];
    // const wb = XLSX.utils.book_new();
    // XLSX.utils.sheet_add_aoa(wb, Heading);
    // XLSX.utils.sheet_add_json(wb, bank, { origin: 'A2', skipHeader: true });
    // XLSX.utils.book_append_sheet(wb, ws, 'quiz_bank');

    // 임시 방편
    const ws = XLSX.utils.json_to_sheet(bank);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'quiz_bank');
    XLSX.writeFile(wb, 'book.xlsx');
    handleClose();
  };

  return (
    <>
      <Button
        color='normal'
        variant='contained'
        sx={{ ...buttonCss, marginRight: '20px' }}
        onClick={() => {
          handleOpen();
        }}
      >
        {t('bank.button.downloadQuiz')}
      </Button>
      <Modal open={open}>
        <ConfirmModal2Box
          headerText={t('bank.button.downloadQuiz')}
          contentText={t('bank.downloadQuiz.desc')}
          CancelHandler={handleClose}
          ConfirmHandler={() => exportExcel(bank)}
        />
      </Modal>
    </>
  );
};

export default DownloadQuizButton;
