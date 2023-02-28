import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import ScheduleAtom from '../../../../recoil/schedule/scheduleAtom';
import { colors } from '../../../../Styles/ui';

const LeagueListBox = () => {
  const leagueList = useRecoilValue(ScheduleAtom.leagueList);
  const param = useParams();
  const navigate = useNavigate();

  const clickHandler = (name: string) => {
    return navigate(`/${param.type}/${param.game}/${name}`);
  };

  // 나중에 MSI 이름 바꿔달라고 요청 해야함.

  return (
    <Wrapper>
      {leagueList.map((league) => {
        const name = league.subTitle.toLowerCase();
        return (
          <LeagueBox>
            <LeagueImgBox active={param.league === name} onClick={() => clickHandler(name)}>
              <LeagueImg src={`/Images/league/ico-league-${name}.png`} />
            </LeagueImgBox>
            {league.subTitle}
          </LeagueBox>
        );
      })}
    </Wrapper>
  );
};

export default LeagueListBox;

const Wrapper = styled.div`
  width: 100%;
  height: 177px;
  background-color: ${colors.num_333};
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 10px 10px 0px 0px;
`;

const LeagueBox = styled.div`
  height: 112px;
  text-align: center;
`;

const LeagueImgBox = styled.button<{ active: boolean }>`
  width: 82px;
  height: 82px;
  background-color: ${({ active }) => (active ? colors.btn_confirm : colors.num_222)};
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  cursor: pointer;

  :hover {
    background-color: ${colors.btn_confirm};
  }
`;

const LeagueImg = styled.img`
  width: 46px;
  height: 46px;
`;
