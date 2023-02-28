import { Icon, SxProps } from '@mui/material';

interface IConvertSvgIconParam {
  img: string;
  props?: SxProps;
}

export default function ConvertSvgIcon({ img, props }: IConvertSvgIconParam) {
  return (
    <Icon sx={props}>
      <img src={`/Images/icon/ico-${img}.svg`} alt='' />
    </Icon>
  );
}
