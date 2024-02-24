import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import { IoMdClose } from 'react-icons/io';
import loading from '../assets/Gear-0.6s-200px.svg';
import { addSong } from './../app/actions';

interface AddSongProps {
  onClose: () => void;
}

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  width: 400px;
  background-color: white;
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
  font-size: 1.5em;
  text-transform: uppercase;
  font-weight: 500;
  color: #1a1a1a;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;
const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
`;
const ModalCloseButton = styled.button`
  border: none;
  color: #1a1a1a;
  border-radius: 50%;
  padding: 0;
  background-color: transparent;
  font-size: 1.5em;
  cursor: pointer;
  transition: color 0.25s;
  &:hover {
    color: red;
  }
`;
const InputContainer = styled.div`
  display: flex;
  gap: 1em;
  flex: 1;
  width: 100%;
`;
const InputLabel = styled.label`
  font-size: 1.2em;
  font-weight: 500;
  color: #1a1a1a;
  text-transform: uppercase;
`;
const Input = styled.input`
  width: 200px;
  padding: 0.5em 1em;
  margin-left: auto;
  margin-bottom: 1em;
  border-radius: 8px;
  border: 1px solid #1a1a1a;
  font-size: 1em;
  font-family: inherit;
`;
const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  width: 100%;
  padding: 0.5em;
  border-radius: 8px;
  border: none;
  background-color: #1a1a1a;
  color: white;
  font-size: 1em;
  font-family: inherit;
  cursor: pointer;
  transition: background-color 0.25s;
  &:hover {
    background-color: #2a2a2a;
  }
`;
const LoadingAnimation = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25px;
  height: 25px;
  background-color: transparent;
`;

const AddSongModal: React.FC<AddSongProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [newSong, setNewSong] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
  });
  const [addLoading, setAddLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAddSong = () => {
    if (!newSong.title || !newSong.artist || !newSong.album || !newSong.genre) {
      setError('All fields are required');
      return;
    }

    try {
      setAddLoading(true);
      setError('');
      dispatch(addSong(newSong));
      toast.success('Song added successfully');
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add song');
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <Modal>
      <ModalContent>
        <ModalHeader>
          Add New Song
          <ModalCloseButton onClick={onClose}>
            <IoMdClose />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <InputContainer>
            <InputLabel>Title:</InputLabel>
            <Input
              type="text"
              value={newSong?.title}
              onChange={(e) =>
                setNewSong({ ...newSong, title: e.target.value })
              }
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Artist:</InputLabel>
            <Input
              type="text"
              value={newSong.artist}
              onChange={(e) =>
                setNewSong({ ...newSong, artist: e.target.value })
              }
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Album:</InputLabel>
            <Input
              type="text"
              value={newSong.album}
              onChange={(e) =>
                setNewSong({ ...newSong, album: e.target.value })
              }
              required
            />
          </InputContainer>
          <InputContainer>
            <InputLabel>Genre:</InputLabel>
            <Input
              type="text"
              value={newSong.genre}
              onChange={(e) =>
                setNewSong({ ...newSong, genre: e.target.value })
              }
              required
            />
          </InputContainer>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <StyledButton onClick={handleAddSong} disabled={addLoading}>
            Add Song
            {addLoading && <LoadingAnimation src={loading} alt="loading" />}
          </StyledButton>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddSongModal;
