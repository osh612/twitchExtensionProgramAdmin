import styled from '@emotion/styled';
import { Input } from '@mui/material';
import { spacing } from '../../../Styles/ui';

const getPlaceholder = (id: string) => {
  switch (id) {
    case 'uid':
      return 'ID';
      break;
    case 'password':
      return 'PASSWORD';
      break;
    case 're-password':
      return 'CONFIRM PASSWORD';
      break;
    case 'email':
      return 'E-MAIL';
      break;
    case 'streamer':
      return 'Streamer';
      break;
    case 'code':
      return 'EXTENSION CODE';
      break;
    default:
      return '';
  }
};

const InputBox = ({
  id,
  type = 'text',
  value,
  onChange,
}: {
  id: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <Wrapper>
      <Input
        disableUnderline
        fullWidth
        type={type}
        // className='id'
        id={id}
        value={value}
        placeholder={getPlaceholder(id)}
        autoComplete={id === 'password' ? 'new-password' : 'off'}
        onChange={onChange}
        readOnly={id === 'uid'}
      />
    </Wrapper>
  );
};

export default InputBox;

const Wrapper = styled.div`
  ${spacing.marginB(3)};
`;
