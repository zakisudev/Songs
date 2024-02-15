import { useState } from 'react';
import styled from '@emotion/styled';

interface StatByArtistProps {
  artistStat: {
    _id: string;
    totalSongs: string;
    artist: string;
    totalAlbums: string;
  }[];
  title: string;
}

const ArtistContainer = styled.div`
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

const StatByArtist = ({ artistStat, title }: StatByArtistProps) => {
  const [selectedArtTotalSongs, setSelectedArtTotalSongs] = useState<number>(0);
  const [selectedArtTotalAlbums, setSelectedArtTotalAlbums] =
    useState<number>(0);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedArtist = artistStat?.find(
      (a) => a.artist === event.target.value
    );
    setSelectedArtTotalAlbums(
      selectedArtist ? parseInt(selectedArtist.totalAlbums) : 0
    );
    setSelectedArtTotalSongs(
      selectedArtist ? parseInt(selectedArtist.totalSongs) : 0
    );
  };

  return (
    <ArtistContainer>
      <SelectorContainer>
        <SelectedTitle>By {title}</SelectedTitle>
        <select onChange={handleChange} defaultValue="">
          <option value="" disabled>
            Select an artist
          </option>
          {artistStat?.map((ar) => (
            <option key={ar?.artist} value={ar?.artist}>
              {ar?.artist}
            </option>
          ))}
        </select>
      </SelectorContainer>
      <SelectedPar>
        <SelectedSpan>Number of Albums:</SelectedSpan>
        <span>{selectedArtTotalAlbums}</span>
      </SelectedPar>
      <SelectedPar>
        <SelectedSpan>Number of songs:</SelectedSpan>
        <span>{selectedArtTotalSongs}</span>
      </SelectedPar>
    </ArtistContainer>
  );
};

export default StatByArtist;
