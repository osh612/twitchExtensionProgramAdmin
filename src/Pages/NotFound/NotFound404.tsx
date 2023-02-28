/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { borderRadiusStyle, buttonStyle, colors, spacing, typoStyle } from '../../Styles/ui';

const NotFound404 = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Container>
        <ImageContainer>
          <img src='/Images/404.png' alt='Not Found' />
        </ImageContainer>
        <TextContainer>
          <h2>죄송합니다. 현재 찾을 수 없는 페이지를 요청 하셨습니다.</h2>
          <p>
            존재하지 않는 주소를 입력하셨거나,
            <br />
            요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
          </p>
        </TextContainer>
        <ButtonContainer>
          <Button type='button' onClick={() => navigate('/')}>
            홈으로
          </Button>
          <Button type='button' onClick={() => navigate(-1)}>
            이전 페이지
          </Button>
        </ButtonContainer>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  min-height: 500px;
  background-color: ${colors.num_111};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${colors.num_111};
  width: 500px;
`;

const ImageContainer = styled.div`
  ${spacing.marginB(10)}
  img {
    display: block;
    width: 100%;
    object-fit: contain;
  }
`;

const TextContainer = styled.div`
  ${typoStyle.body}
  ${spacing.marginB(10)}
  text-align: center;

  h2 {
    font-weight: bold;
    ${spacing.marginB(6)}
  }

  p {
    ${typoStyle.table_text}
    line-height: 28px;
  }
`;
const ButtonContainer = styled.div`
  button {
    width: 225px;
    height: 60px;
    ${borderRadiusStyle[20]}
    ${typoStyle.body}
    line-height: 0;
  }
  button:first-of-type {
    ${buttonStyle.color.normal}
    ${spacing.marginR(2)}
    color: ${colors.text}
  }

  button:last-of-type {
    ${buttonStyle.color.main}
  }
`;

export default NotFound404;
