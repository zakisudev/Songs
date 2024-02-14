import { useEffect } from 'react';
import { fetchSongs } from './../services/api';
import { setSongs } from '../app/song.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/root.reducer';

const SongsTable = () => {
  const { songs } = useSelector((state: RootState) => state.songs);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSongsFromBackend = async () => {
      try {
        const res = await fetchSongs();
        dispatch(setSongs(res.songs));
      } catch (error) {
        console.error(error);
      }
    };
    fetchSongsFromBackend();
  }, []);

  return (
    <div>
      <h1>Songs Table</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song._id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.genre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SongsTable;
