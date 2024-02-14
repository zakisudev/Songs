import { useState } from 'react';

const StatByGenre = ({
  stats,
}: {
  stats: { _id: string; count: number }[];
}) => {
  const [selectedCount, setSelectedCount] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre = stats?.find(
      (genre: { _id: string }) => genre?._id === event.target.value
    );
    setSelectedCount(selectedGenre ? selectedGenre?.count : 0);
  };

  return (
    <>
      <select onChange={handleChange}>
        <option value="" disabled selected>
          Select a genre
        </option>
        {stats?.map((genre: { _id: string; count: number }) => (
          <option key={genre._id} value={genre._id}>
            {genre._id}
          </option>
        ))}
      </select>
      <p>Number of songs: {selectedCount}</p>
    </>
  );
};

export default StatByGenre;
