import { takeLatest, call, put } from 'redux-saga/effects';
import {
  fetchSongs,
  fetchStats,
  addSong as ADD,
  updateSong as UPDATE,
  deleteSong as DELETE,
} from '../../services/api';
import { setStats } from '../stat.slice';
import { addSong, deleteSong, setSongs, updateSong } from '../song.slice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleFetchSongs(): any {
  try {
    const songs = yield call(fetchSongs);
    yield put(setSongs(songs.songs));
  } catch (error) {
    console.error(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleFetchStats(): any {
  try {
    const stats = yield call(fetchStats);
    yield put(setStats(stats?.stats));
  } catch (error) {
    console.error(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleAddSong(action: any): any {
  try {
    const song = yield call(ADD, action.payload);
    const stats = yield call(fetchStats);
    yield put(addSong(song?.song));
    yield put(setStats(stats?.stats));
  } catch (error) {
    console.error(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleUpdateSong(action: any): any {
  try {
    const song = yield call(UPDATE, action.payload);
    const stats = yield call(fetchStats);
    yield put(updateSong(song?.song));
    yield put(setStats(stats?.stats));
  } catch (error) {
    console.error(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleDeleteSong(action: any): any {
  try {
    const song = yield call(DELETE, action.payload);
    yield put(deleteSong(song?.song));
    const stats = yield call(fetchStats);
    yield put(setStats(stats?.stats));
  } catch (error) {
    console.error(error);
  }
}

function* songSaga() {
  yield takeLatest('FETCH_SONGS', handleFetchSongs);
  yield takeLatest('FETCH_STATS', handleFetchStats);
  yield takeLatest('ADD_SONG', handleAddSong);
  yield takeLatest('UPDATE_SONG', handleUpdateSong);
  yield takeLatest('DELETE_SONG', handleDeleteSong);
}

export default songSaga;
