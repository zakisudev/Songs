export const fetchSongs = () => {
  return {
    type: 'FETCH_SONGS',
  };
};

export const fetchStats = () => {
  return {
    type: 'FETCH_STATS',
  };
};

export const setSongs = (songs: []) => {
  return {
    type: 'SET_SONGS',
    payload: songs,
  };
};

export const setStats = (stats: []) => {
  return {
    type: 'SET_STATS',
    payload: stats,
  };
};

export const addSong = (song: object) => {
  return {
    type: 'ADD_SONG',
    payload: song,
  };
};

export const updateSong = (song: object) => {
  return {
    type: 'UPDATE_SONG',
    payload: song,
  };
};

export const deleteSong = (id: string) => {
  return {
    type: 'DELETE_SONG',
    payload: id,
  };
};
