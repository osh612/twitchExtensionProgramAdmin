import styled from '@emotion/styled';
import {
  Button,
  FormControlLabel,
  FormControlLabelProps,
  Input,
  InputBase,
  Radio,
  RadioGroup,
  Select,
  useRadioGroup,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { useTranslation } from 'react-i18next';
import { IQuizInfo } from '../../../../../services/QuizServices';
import { colors } from '../../../../../Styles/ui';
import { quizColorMapping } from '../../lib/quizColorMapping';
import { SecLabel, SecTimeWrapper } from './Detail/monitor.quiz.item.bady.input.sec';
import {
  CorrectButtonWrap,
  CountLabel,
  CountWrap,
  getMax10,
  KillWrap,
  QuizResultConsole,
  QuizResultConsoleWrapper,
  QuizSlotInputWrapper,
  QuizSlotItemWrapper,
} from './Detail/monitor.quiz.item.bady.input.slot';
import QuizStatusLabel from './Detail/monitor.quiz.item.bady.label.status';
import {
  ItemBox,
  ItemLabel,
  LineBox,
  mappingMatchState,
  QuizBody,
  QuizMainBox,
  QuizMainHeader,
  QuizVoteBox,
  TooltipBox,
  TooltipLabel,
} from './monitor.quiz.body';
import { QuizItemli } from './monitor.quiz.item';
import { LeftBox, QuizHeader, RightBox, SpanQuizQuestionInput } from './monitor.quiz.item.header';
import { QuizFooter } from './monitor.quiz.item.footer';

const QuizStateRadioCss = {
  color: colors.text,
};

interface StyledFormControlLabelProps extends FormControlLabelProps {
  checked: boolean;
}

const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
  <FormControlLabel {...props} />
))(({ theme, checked }) => ({
  '.MuiFormControlLabel-label': checked && {
    color: colors.main,
  },
}));

function MyFormControlLabel(props: FormControlLabelProps) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    const { value } = props;
    checked = radioGroup.value === value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const MenuProps = {
  PaperProps: {
    style: {
      backgroundColor: colors.text, // select 메뉴의 컨테이너 색  정할 때  수정.
    },
  },
};

const CloseItem = ({ quizInfo }: { quizInfo: IQuizInfo }) => {
  const { t } = useTranslation();

  const getGameSlotListText = (selectnum: number) => {
    return selectnum === 0
      ? `${t('monitor.body.gameSlotList.select')}`
      : `${selectnum}${t('monitor.body.gameSlotList.selected')}`;
  };

  return (
    <QuizItemli>
      <QuizBox outlineColor={quizColorMapping[quizInfo.allCorrect ? 6 : quizInfo.state]}>
        <QuizHeader>
          <LeftBox>
            <SpanQuizQuestionInput maxLength={50} value={quizInfo.name} disabled={quizInfo.state !== 1} />
          </LeftBox>
          <RightBox>
            <QuizStatusLabel status={quizInfo.allCorrect ? 6 : quizInfo.state} />
          </RightBox>
        </QuizHeader>
        <QuizBody>
          <QuizMainHeader>
            <TooltipBox>
              <span>{t('monitor.body.additionalDesc')}</span>
              <TooltipLabel>
                <input placeholder={t('monitor.body.tooltip')} value={quizInfo.tooltip} />
              </TooltipLabel>
            </TooltipBox>
            <RadioButtonWrapper>
              <RadioGroup row value={quizInfo.type}>
                <MyFormControlLabel
                  value={1}
                  control={<Radio sx={QuizStateRadioCss} />}
                  label={t('monitor.body.radioGroup.competition')}
                />
                <MyFormControlLabel
                  value={2}
                  control={<Radio sx={QuizStateRadioCss} />}
                  label={t('monitor.body.radioGroup.trivia')}
                />
                <MyFormControlLabel
                  value={3}
                  control={<Radio sx={QuizStateRadioCss} />}
                  label={t('monitor.body.radioGroup.simple')}
                />
              </RadioGroup>
            </RadioButtonWrapper>
          </QuizMainHeader>
          <QuizMainBox>
            <ItemBox>
              <ItemLabel>
                {t('monitor.body.gameState')} <span className='upStar'>*</span>
              </ItemLabel>
              <Select
                displayEmpty
                value={mappingMatchState[quizInfo.matchState]}
                input={
                  <Input fullWidth disableUnderline value={mappingMatchState[quizInfo.matchState]} disabled />
                }
                renderValue={(selected) => {
                  return t(`monitor.body.gameStateList.${selected}`);
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
                disabled
              />
            </ItemBox>
            <ItemBox>
              <ItemLabel>
                {t('monitor.body.closeTime')} <span className='upStar'>*</span>
              </ItemLabel>
              <SecTimeWrapper>
                <InputBase fullWidth type='text' autoComplete='off' id='' value={quizInfo.times} disabled />
                <SecLabel>Sec</SecLabel>
              </SecTimeWrapper>
              {/* <Input fullWidth type='text' autoComplete='off' id='' /> */}
            </ItemBox>
            <LineBox />
            <ItemBox>
              <ItemLabel>
                {t('monitor.body.answerType')} <span className='upStar'>*</span>
              </ItemLabel>
              <Select
                fullWidth
                displayEmpty
                value={quizInfo.item.length}
                input={
                  <Input disableUnderline value={quizInfo.item.length} disabled={quizInfo.state !== 1} />
                }
                renderValue={(selected) => {
                  return getGameSlotListText(selected);
                }}
                MenuProps={MenuProps}
                inputProps={{ 'aria-label': 'Without label' }}
              />
              {/* <SlotInputBox slotCount={slotCount} setSlotCount={setSlotCount} /> */}
            </ItemBox>
            <QuizVoteBox>
              {[...Array(quizInfo.item.length)].map((_, idx) => {
                return quizInfo.item[idx] ? (
                  <QuizSlotItemWrapper>
                    <QuizSlotInputWrapper>
                      <CountLabel>{idx}</CountLabel>
                      <InputBase
                        placeholder=''
                        fullWidth
                        type='text'
                        autoComplete='off'
                        id=''
                        value={quizInfo.item[idx].name}
                        disabled={quizInfo.state !== 1}
                        sx={{ ':disabled': { color: 'red' } }}
                      />
                    </QuizSlotInputWrapper>
                    <QuizResultConsoleWrapper>
                      <QuizResultConsole>
                        <CountWrap>
                          <PersonIcon sx={{ color: colors.num_888, marginRight: '2px' }} />
                          {quizInfo.item[idx].counts}명
                        </CountWrap>
                        <KillWrap>
                          <PersonIcon sx={{ color: colors.num_888, marginRight: '2px' }} />
                          {getMax10(quizInfo.item[idx].kills)}킬
                        </KillWrap>
                        {/* 투표율: {quizItem.width} */}
                      </QuizResultConsole>
                      {quizInfo.type !== 2 &&
                      (quizInfo.state === 4 || quizInfo.state === 2 || quizInfo.state === 5) ? (
                        <CorrectButtonWrap>
                          <Button variant='contained' color='normal' size='small' disabled>
                            {t('monitor.footer.correct')}
                          </Button>
                        </CorrectButtonWrap>
                      ) : null}
                    </QuizResultConsoleWrapper>
                  </QuizSlotItemWrapper>
                ) : (
                  <></>
                );
              })}
            </QuizVoteBox>
          </QuizMainBox>
        </QuizBody>
        <QuizFooter>
          <LeftBox>
            <Button
              sx={{ color: colors.num_999 }}
              startIcon={<FileUploadIcon sx={{ width: 24, height: 24, color: colors.num_999 }} />}
              disabled
            >
              {t('monitor.footer.upload')}
            </Button>
            <Button
              sx={{ color: colors.num_999 }}
              startIcon={<FileDownloadIcon sx={{ width: 24, height: 24, color: colors.num_999 }} />}
              disabled
            >
              {t('monitor.footer.store')}
            </Button>
          </LeftBox>
        </QuizFooter>
      </QuizBox>
    </QuizItemli>
  );
};

export default CloseItem;

export const QuizBox = styled.div<{ outlineColor: string }>`
  width: 100%;
  border: solid 1px ${({ outlineColor }) => outlineColor};
  border-radius: 10px;
`;

const RadioButtonWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 30px;
  display: flex;
`;
