import { useState } from 'react';

interface StatByArtistProps {
  stats: { totalSongs: number; artist: string; totalAlbums: number }[];
}

const StatByArtist = ({ stats }: StatByArtistProps) => {
  const [selectedArtTotalSongs, setSelectedArtTotalSongs] = useState(0);
  const [selectedArtTotalAlbums, setSelectedArtTotalAlbums] = useState(0);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArt = stats?.find((a) => a?.artist === event.target.value);
    setSelectedArtTotalSongs(selectedArt ? selectedArt.totalSongs : 0);
    setSelectedArtTotalAlbums(selectedArt ? selectedArt.totalAlbums : 0);
  };

  return (
    <>
      <select onChange={handleChange}>
        <option value="" disabled selected>
          Select an artist
        </option>
        {stats?.map(
          (artist: {
            totalSongs: number;
            artist: string;
            totalAlbums: number;
          }) => (
            <option key={artist.artist} value={artist.artist}>
              {artist.artist}
            </option>
          )
        )}
      </select>
      <p>Number of Albums: {selectedArtTotalAlbums}</p>
      <p>Number of songs: {selectedArtTotalSongs}</p>
    </>
  );
};

export default StatByArtist;
