import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import styled from '@emotion/styled';
import { TbMusicPlus, TbEdit, TbHttpDelete } from 'react-icons/tb';
import { fetchSongs, deleteSong } from './../services/api';
import { setSongs, deleteSong as DELETE } from '../app/song.slice';
import { RootState } from '../app/root.reducer';
import AddSongModal from './AddSongModal';
import UpdateSongModal from './UpdateSongModal';
import { toast } from 'react-toastify';
import loading from '../assets/Magnify-1s-200px.svg';

export interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
}

const SongsTable = () => {
  Modal.setAppElement('#root');
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [editingSong, setEditingSong] = useState({});
  const [deletingSong, setDeletingSong] = useState({} as Song);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  const { songs } = useSelector((state: RootState) => state.songs);
  const { stats } = useSelector((state: RootState) => state.stats);
  const dispatch = useDispatch();

  const handleSongSelect = (song: Song) => () => {
    setUpdateModal(true);
    setEditingSong(song);
  };

  const handleDeleteModal = (song: Song) => () => {
    setModalIsOpen(true);
    setDeletingSong(song);
  };

  const handleSongDelete = async () => {
    setDeleteLoading(true);
    setDeleteError('');
    try {
      const res = await deleteSong(deletingSong._id);
      if (res?.success) {
        dispatch(DELETE(deletingSong._id));
        toast.success('Song deleted successfully');
      } else {
        setDeleteError('Error deleting song, try again');
      }
    } catch (error) {
      setDeleteError('Server error, try again later');
    } finally {
      setDeleteLoading(false);
      setModalIsOpen(false);
    }
  };

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
  }, [dispatch]);

  if (songs.length === 0 || !stats) {
    return (
      <>
        <p>Please wait, populating data...</p>
        <Loading src={loading} alt="loading" />
      </>
    );
  }

  return (
    <SongsTableContainer>
      {modalIsOpen && (
        <StyledModal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Delete Confirmation Modal"
        >
          <DeleteContainer>
            <h1>Song will be deleted, are you sure?</h1>

            {deleteError && <p>{deleteError}</p>}

            <ButtonsContainer>
              <StyledButton type="button" onClick={handleSongDelete}>
                {deleteLoading ? 'Deleting...' : 'Delete'}
              </StyledButton>
              <StyledButtonCancel
                type="button"
                onClick={() => setModalIsOpen(false)}
              >
                Cancel
              </StyledButtonCancel>
            </ButtonsContainer>
          </DeleteContainer>
        </StyledModal>
      )}

      {addModal && <AddSongModal onClose={() => setAddModal(false)} />}

      {updateModal && (
        <UpdateSongModal
          onClose={() => setUpdateModal(false)}
          song={editingSong as Song}
        />
      )}
      <SongHeader>Songs:</SongHeader>
      <ButtonContainer>
        <AddButton onClick={() => setAddModal(true)}>
          <TbMusicPlus />
          Add Song
        </AddButton>
      </ButtonContainer>
      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Genre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song._id}>
              <td>{song.title}</td>
              <td>{song.artist}</td>
              <td>{song.album}</td>
              <td>{song.genre}</td>
              <Td>
                <button onClick={handleSongSelect(song)}>
                  <TbEdit />
                </button>
                <button onClick={handleDeleteModal(song)}>
                  <TbHttpDelete />
                </button>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </SongsTableContainer>
  );
};

const SongHeader = styled.h1`
  text-align: left;
  font-size: 2em;
  margin: 0 0 0 1em;
  width: 100%;
  text-transform: uppercase;
  font-weight: 500;
  color: #1a1a1a;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
const SongsTableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 100%;
`;
const AddButton = styled.button`
  display: flex;
  gap: 0.5em;
  align-items: center;
  margin-left: auto;
  margin-bottom: 1em;
  border-radius: 8px;
  border: 2px solid #1a1a1a;
  padding: 0.5em 1em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
`;
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;
const Table = styled.table`
  width: 97%;
  border-collapse: collapse;
  thead {
    background-color: #1a1a1a;
    color: white;
    th {
      padding: 0.5em 1em;
    }
  }
  tbody {
    tr {
      &:nth-of-type(odd) {
        background-color: #f2f2f2;
      }
      &:hover {
        background-color: #e6e6e6;
      }
      td {
        padding: 0.5em 1em;
      }
    }
  }
`;
const Td = styled.td`
  display: flex;
  gap: 0.5em;
  button {
    padding: 0.5em;
    border: none;
    border-radius: 8px;
    background-color: #1a1a1a;
    color: white;
    cursor: pointer;
    transition: background-color 0.25s;
    &:hover {
      background-color: gray;
    }
  }
`;
const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  padding: 1em;
  box-sizing: border-box;
  transition: opacity 0.25s;
  opacity: 1;
`;
const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: center;
  width: 30%;
  padding: 1em;
  background-color: white;
  border-radius: 8px;
  h1 {
    font-size: 1.2em;
    margin: 0;
    color: #1a1a1a;
    padding: 0;
  }
  p {
    font-size: 1em;
    margin: 0;
    padding: 0;
    color: red;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  gap: 2em;
`;
const StyledButton = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 8px;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: background-color 0.25s;
  &:hover {
    background-color: gray;
  }
`;
const StyledButtonCancel = styled.button`
  padding: 0.5em 1em;
  border: none;
  border-radius: 8px;
  background-color: red;
  color: white;
  cursor: pointer;
  transition: background-color 0.25s;
  &:hover {
    background-color: darkred;
  }
`;
const Loading = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  width: 10%;
  height: 100%;
`;

export default SongsTable;
