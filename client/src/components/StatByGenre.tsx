import { useState } from 'react';
import styled from '@emotion/styled';

interface StatByGenreProps {
  genreStat: { _id: string; count: number }[];
  title: string;
}

const GenreContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  width: 250px;
  padding: 0.5em 1em;
  border: 1px solid black;
  border-radius: 5px;
  background-color: lightgray;
  color: black;
  font-size: 1em;
  font-weight: 500;
  text-transform: uppercase;
`;
const SelectorContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1em;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 1em;
  font-weight: 500;
`;
const SelectedTitle = styled.h5`
  margin: 0;
  padding: 0;
  font-size: 1em;
  font-weight: 500;
`;
const SelectedPar = styled.p`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 0;
  padding: 0;
  font-size: 1em;
  font-weight: 500;
`;
const SelectedSpan = styled.span`
  margin: 0;
  padding: 0;
  font-size: 0.75em;
  font-weight: 500;
`;

const StatByGenre = ({ genreStat, title }: StatByGenreProps) => {
  const [selectedCount, setSelectedCount] = useState<number>(0);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGenre =
      genreStat &&
      genreStat?.find(
        (genre: { _id: string }) => genre?._id === event.target.value
      );
    setSelectedCount(selectedGenre ? selectedGenre?.count : 0);
  };

  return (
    <GenreContainer>
      <SelectorContainer>
        <SelectedTitle>By {title}</SelectedTitle>
        <select onChange={handleChange} defaultValue="">
          <option value="" disabled>
            Select a genre
          </option>
          {genreStat &&
            genreStat?.map((genre: { _id: string; count: number }) => (
              <option key={genre._id} value={genre._id}>
                {genre._id}
              </option>
            ))}
        </select>
      </SelectorContainer>
      <SelectedPar>
        <SelectedSpan>Number of songs: </SelectedSpan>
        <span>{selectedCount}</span>
      </SelectedPar>
    </GenreContainer>
  );
};

export default StatByGenre;
