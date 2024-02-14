import { useEffect } from 'react';
import { fetchStats } from './../services/api';
import { setStats } from '../app/stat.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/root.reducer';
import StatByGenre from './StatByGenre';
import StatByArtist from './StatByArtist';
import StatByAlbum from './StatByAlbum';

interface StatsProps {
  totalSongs: number;
  totalArtists: number;
  totalAlbums: number;
  totalGenres: number;
  genreCounts: { _id: string; count: number }[];
  artistAlbumCounts: {
    totalSongs: number;
    artist: string;
    totalAlbums: number;
  }[];
  songStats: { _id: string; totalSongs: number }[];
}

const StatsTable = () => {
  const stats: StatsProps = useSelector(
    (state: RootState) => state.stats.stats
  );
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
  }, []);

  return (
    <div>
      <h1>Songs Stats:</h1>
      <div>
        <h2>General stats:</h2>
        <div>
          <p>Total # of Songs</p>
          <p>{stats?.totalSongs}</p>
        </div>
        <div>
          <p>Total # of Artists</p>
          <p>{stats?.totalArtists}</p>
        </div>
        <div>
          <p>Total # of Albums</p>
          <p>{stats?.totalAlbums}</p>
        </div>
        <div>
          <p>Total # of Genres</p>
          <p>{stats?.totalGenres}</p>
        </div>
      </div>
      <div>
        <h2>Stats in detail:</h2>
        <div>
          <h3>By Genre</h3>
          <StatByGenre stats={stats?.genreCounts} />
        </div>
        <div>
          <h3>By Artist</h3>
          <StatByArtist stats={stats?.artistAlbumCounts} />
        </div>
        <div>
          <h3>By Album</h3>
          <StatByAlbum stats={stats?.songStats} />
        </div>
      </div>
    </div>
  );
};

export default StatsTable;
