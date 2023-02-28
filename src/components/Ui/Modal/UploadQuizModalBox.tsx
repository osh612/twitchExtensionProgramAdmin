/* eslint-disable jsx-a11y/label-has-associated-control */
import styled from '@emotion/styled/macro';
import { Box, Button, Input } from '@mui/material';
import { readFileSync } from 'fs';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation } from 'react-query';
import * as XLSX from 'xlsx';
import QuizBankServices, { IBankQuizData, IBankXlsxDataParam } from '../../../services/QuizBankServices';
import { colors, spacing } from '../../../Styles/ui';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 488,
  bgcolor: colors.num_222,
  borderRadius: '10px',
  border: `1px solid ${colors.num_444}`,
};

const buttonCss = {
  width: '100%',
  borderRadius: '10px',
  height: 50,
};

// const Input = styled('input')({
//   display: 'none',
// });

type quizItem = string[];

const UploadQuizModalBox = ({ handleClose }: { handleClose: () => void }) => {
  const { t } = useTranslation();
  const [dataParse, setDataParse] = useState<IBankQuizData[]>([]);
  const [fileName, setFileName] = useState<string>('');

  const onChangeFileName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target) {
      if (event.target.files) {
        const { files } = event.target;
        let tmpResult: IBankQuizData[] = [];
        const f = files[0];
        setFileName(f.name);
        const reader = new FileReader();
        reader.onload = function (e: any) {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          workbook.SheetNames.forEach((sheetName) => {
            const roa = XLSX.utils.sheet_to_json<IBankQuizData>(workbook.Sheets[sheetName]);
            tmpResult = roa;
          });
          setDataParse(tmpResult);
          // setFileUploaded(dataParse);
        };
        reader.readAsBinaryString(f);
      }
    }
  };

  const { mutate: createBankXlsxData, isLoading } = useMutation(
    (data: IBankXlsxDataParam) => QuizBankServices.createBankXlsxData(data),
    {
      onSuccess: (data) => {
        handleClose();
      },
    },
  );

  const ConfirmHandler = () => {
    if (dataParse.length > 0) {
      createBankXlsxData({
        quiz_data: dataParse,
      });
    }
  };

  return (
    <Box sx={style}>
      <Header>{t('bank.uploadQuiz.title')}</Header>
      <Body>
        <Label htmlFor='file-input'>
          <Input value={fileName} disableUnderline sx={{ width: '85%' }} readOnly />
          <Input
            type='file'
            id='file-input'
            inputProps={{ accept: '.xlsx' }}
            sx={{ display: 'none' }}
            onChange={onChangeFileName}
          />
          <Button
            sx={{
              width: 111,
              color: colors.text,
              whiteSpace: 'nowrap',
              borderLeft: `solid 1px ${colors.outline}`,
              borderRadius: '0 10px 10px 0',
            }}
            component='span'
          >
            {t('common.find')}
          </Button>
        </Label>
      </Body>
      <ButtonBox>
        <Button
          onClick={handleClose}
          sx={{
            ...buttonCss,
            marginRight: '8px',
            ':hover': {
              color: colors.text,
            },
          }}
          variant='contained'
          color='normal'
        >
          {t('common.button.cancel')}
        </Button>
        <Button onClick={ConfirmHandler} sx={{ ...buttonCss, marginLeft: '8px' }} variant='contained'>
          {t('common.button.confirm')}
        </Button>
      </ButtonBox>
    </Box>
  );
};

export default UploadQuizModalBox;

const Header = styled.div`
  color: ${colors.text};
  font: normal normal bold 18px/26px Noto Sans CJK KR;
  width: 100%;
  padding: 24px 40px;
  border-bottom: solid 1px ${colors.num_444};
`;

const Body = styled.div`
  display: flex;
  color: ${colors.text};
  font: normal normal normal 15px/21px Noto Sans CJK KR;
  width: 100%;
  text-align: center;
  padding: 35px 40px 11px;

  .MuiInput-input {
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    height: 50px;
    border-radius: 10px 10px 10px 10px;
    padding-top: 0;
    padding-bottom: 0;
    ${spacing.paddingX(5)};
    color: ${colors.text} !important;
    background-color: ${colors.num_333} !important;
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  padding: 40px;
`;

const Label = styled.label`
  display: flex;
  width: 100%;
  background-color: ${colors.num_333};
  border-radius: 10px 10px 10px 10px;
`;
