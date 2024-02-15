import styled from '@emotion/styled';
import SongsTable from '../components/SongsTable';
import StatsTable from '../components/StatsTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainContainer = styled.main`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 95vw;
  height: 87vh;
  padding: 0;
  padding-top: 0.5em;
  background-color: lightgray;
  border-radius: 5px;
  color: black;
  overflow-y: auto;
`;
const MusicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  width: 100%;
  max-height: 100%;
`;
const StatContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  float: right;
  width: 100%;
`;

const Home = () => {
  return (
    <MainContainer>
      <MusicContainer>
        <SongsTable />
      </MusicContainer>
      <StatContainer>
        <StatsTable />
      </StatContainer>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </MainContainer>
  );
};

export default Home;
