import styled from '@emotion/styled';
import SongsTable from '../components/SongsTable';
import StatsTable from '../components/StatsTable';

const Home = () => {
  const MainContainer = styled.main`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 100vh;
    background-color: white;
    overflow: hidden;
  `;
  const MusicContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightblue;
  `;
  const StatContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: lightgreen;
  `;

  return (
    <MainContainer>
      <MusicContainer>
        <SongsTable />
      </MusicContainer>
      <StatContainer>
        <StatsTable />
      </StatContainer>
    </MainContainer>
  );
};

export default Home;
