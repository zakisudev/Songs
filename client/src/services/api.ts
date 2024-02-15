import axios from 'axios';

const baseUrl = '/api';

// @desc    Fetch all songs
// @route   GET /api/songs
export const fetchSongs = async () => {
  try {
    const response = await axios.get(`${baseUrl}/songs`);
    if (response?.data && response?.data?.success) {
      return response.data;
    } else {
      throw new Error('Failed to fetch songs');
    }
  } catch (error) {
    console.error(error);
  }
};

// @desc    Add new song
// @route   POST /api/songs
export const addSong = async (newSong: object) => {
  try {
    const response = await axios.post(`${baseUrl}/songs`, newSong);
    if (response?.data && response?.data?.success) {
      return response?.data;
    } else {
      throw new Error('Failed to add song');
    }
  } catch (error) {
    console.error(error);
  }
};

// @desc    Update song
// @route   PUT /api/songs/:id
export const updateSong = async (id: string, updatedSong: object) => {
  try {
    const response = await axios.put(`${baseUrl}/songs/${id}`, updatedSong);
    if (response?.data && response?.data?.success) {
      return response?.data;
    } else {
      throw new Error('Failed to update song');
    }
  } catch (error) {
    console.error(error);
  }
};

// @desc    Delete song
// @route   DELETE /api/songs/:id
export const deleteSong = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/songs/${id}`);
    if (response?.data && response?.data?.success) {
      return response?.data;
    } else {
      throw new Error('Failed to delete song');
    }
  } catch (error) {
    console.error(error);
  }
};

// @desc    Fetch statistics
// @route   GET /api/stats
export const fetchStats = async () => {
  try {
    const response = await axios.get(`${baseUrl}/stats`);
    if (response?.data && response?.data?.success) {
      return response.data;
    } else {
      throw new Error('Failed to fetch statistics');
    }
  } catch (error) {
    console.error(error);
  }
};
