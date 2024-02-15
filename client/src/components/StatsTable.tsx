import { useEffect } from 'react';
import { fetchStats } from './../services/api';
import { setStats } from '../app/stat.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/root.reducer';
import StatByGenre from './StatByGenre';
import StatByArtist from './StatByArtist';
import StatByAlbum from './StatByAlbum';
import styled from '@emotion/styled';

const StatHeader = styled.h1`
  text-align: center;
  margin: 0;
  padding: 0;
  font-size: 2em;
  width: 100%;
  text-transform: uppercase;
  font-weight: 500;
  color: #1a1a1a;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
const StatContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0;
  gap: 1em;
  justify-content: start;
  align-items: center;
  width: 100%;
  max-height: 100%;
  overflow: scroll;
`;
const StatsDetailHeader = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 1.5em;
  font-weight: 600;
  text-decoration: underline;
  text-align: left;
  color: #1a1a1a;
  margin-bottom: 0em;
`;
const GenStatContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  width: 300px;
  margin: 0 auto;
  padding: 0 2em;
`;
const GenStatDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 1em;
  font-size: 1.2em;
  font-weight: 500;
`;
const DetailsDiv = styled.div`
  margin: 0;
  padding: 0;
  font-size: 0.75em;
  font-weight: 500;
  text-transform: uppercase;
`;

const StatsTable = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { stats }: any = useSelector((state: RootState) => state.stats);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchStatsFromBackend = async () => {
      try {
        const res = await fetchStats();
        if (res?.success) {
          dispatch(setStats(res.stats));
        } else {
          console.error(res.error);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchStatsFromBackend();
  }, [dispatch]);

  return (
    <StatContainer>
      <StatHeader>Songs Stats:</StatHeader>
      <GenStatContainer>
        <StatsDetailHeader>General stats:</StatsDetailHeader>
        <GenStatDetails>
          <DetailsDiv>Total # of Songs</DetailsDiv>
          <DetailsDiv>{stats?.totalSongs}</DetailsDiv>
        </GenStatDetails>
        <GenStatDetails>
          <DetailsDiv>Total # of Artists</DetailsDiv>
          <DetailsDiv>{stats?.totalArtists}</DetailsDiv>
        </GenStatDetails>
        <GenStatDetails>
          <DetailsDiv>Total # of Albums</DetailsDiv>
          <DetailsDiv>{stats?.totalAlbums}</DetailsDiv>
        </GenStatDetails>
        <GenStatDetails>
          <DetailsDiv>Total # of Genres</DetailsDiv>
          <DetailsDiv>{stats?.totalGenres}</DetailsDiv>
        </GenStatDetails>
      </GenStatContainer>
      <GenStatContainer>
        <StatsDetailHeader>Stats in detail:</StatsDetailHeader>
        <GenStatDetails>
          <DetailsDiv>
            <StatByGenre genreStat={stats?.genreCounts} title="Genre" />
          </DetailsDiv>
        </GenStatDetails>
        <GenStatDetails>
          <DetailsDiv>
            <StatByArtist
              artistStat={stats?.artistAlbumCounts}
              title="Artist"
            />
          </DetailsDiv>
        </GenStatDetails>
        <GenStatDetails>
          <DetailsDiv>
            <StatByAlbum albumStat={stats?.songStats} title="Album" />
          </DetailsDiv>
        </GenStatDetails>
      </GenStatContainer>
    </StatContainer>
  );
};

export default StatsTable;
