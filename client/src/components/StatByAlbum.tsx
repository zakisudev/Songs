import { useState } from 'react';

interface StatByAlbumProps {
  stats: { _id: string; totalSongs: number }[];
}

const StatByAlbum = ({ stats }: StatByAlbumProps) => {
  const [selectedAlbumTotalSongs, setSelectedAlbumTotalSongs] =
    useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = stats?.find(
      (genre: { _id: string }) => genre?._id === event.target.value
    );
    setSelectedAlbumTotalSongs(selectedGenre ? selectedGenre?.totalSongs : 0);
  };

  return (
    <>
      <select onChange={handleChange}>
        <option value="" disabled selected>
          Select an album
        </option>
        {stats?.map((genre: { _id: string; totalSongs: number }) => (
          <option key={genre._id} value={genre._id}>
            {genre._id}
          </option>
        ))}
      </select>
      <p>Number of songs: {selectedAlbumTotalSongs}</p>
    </>
  );
};

export default StatByAlbum;
