import styled from '@emotion/styled';
import { IconButton, Input, InputBaseComponentProps, SvgIconTypeMap, SxProps } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { colors, spacing } from '../../Styles/ui';
import ConvertSvgIcon from './ConvertSvgIcon';

type IMuiIcon = OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
  muiName: string;
};

interface InputBoxParam {
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  type?: string;
  name?: string;
  startimg?: string;
  starticonHandler?: any;
  StartMuiIcon?: IMuiIcon;
  endimg?: string;
  EndMuiIcon?: IMuiIcon;
  endiconHandler?: any;
  sx?: SxProps;
  readOnly?: boolean;
  inputProps?: InputBaseComponentProps;
}

const getIconBox = (img: string, onClick?: () => void) => {
  return <IconBox onClick={onClick}>{ConvertSvgIcon({ img })}</IconBox>;
};

export const CustomInput = ({
  id,
  value,
  onChange,
  name = 'null',
  type = 'text',
  placeholder = '',
  startimg,
  endimg,
  StartMuiIcon,
  EndMuiIcon,
  starticonHandler,
  endiconHandler,
  sx,
  inputProps,
  readOnly,
}: InputBoxParam) => {
  return (
    <InputWrapper type={type}>
      {startimg ? getIconBox(startimg, starticonHandler) : <></>}
      {StartMuiIcon ? (
        <IconButton onClick={starticonHandler}>
          <StartMuiIcon sx={{ color: colors.text }} />
        </IconButton>
      ) : (
        <></>
      )}
      <Input
        id={id}
        disableUnderline
        value={value}
        type={type}
        name={name}
        autoComplete='off'
        onChange={onChange}
        placeholder={placeholder}
        sx={sx}
        inputProps={inputProps}
        readOnly={readOnly}
      />
      {endimg ? getIconBox(endimg, endiconHandler) : <></>}
      {EndMuiIcon ? (
        <IconButton onClick={endiconHandler}>
          <EndMuiIcon sx={{ color: colors.text }} />
        </IconButton>
      ) : (
        <></>
      )}
    </InputWrapper>
  );
};

const IconBox = styled.div`
  padding: 0 10px;
`;

const InputWrapper = styled.div<{ type?: string }>`
  width: 100%;
  display: flex;
  align-items: center;
  color: ${colors.text} !important;
  background-color: ${colors.num_333} !important;
  border-radius: 10px;

  .MuiInputBase-input {
    font: normal normal normal 15px/25px Noto Sans CJK KR;
    height: 40px;
    ${spacing.paddingX(5)};
    color: ${colors.text} !important;
    background-color: ${colors.num_333} !important;
    border-radius: 10px;
    ${({ type }) => type === 'number' && 'text-align: right;'}
  }

  .MuiInput-root {
    height: 100% !important;
    width: 100% !important;
  }

  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const GoodsModalItemBox = styled.div`
  ${spacing.marginB(3)};
  width: 100%;
  margin-right: 10px;
`;
export const GoodsModalLabel = styled.div`
  width: auto;
  color: ${colors.text};
  font-size: 20px;
  margin-bottom: 10px;
`;
export const GoodsModalHeader = styled.div`
  padding-bottom: 30px;
`;
export const GoodsModalHeaderLabel = styled.label`
  color: ${colors.text};
  font-size: 24px;
  padding: 0 10px 5px;
  border-bottom: solid 3px ${colors.보라색[800]};
`;
