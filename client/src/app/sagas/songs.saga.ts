import { takeEvery, call, put } from 'redux-saga/effects';
import { addSong, deleteSong, updateSong } from '../song.slice';
import { fetchStats as FETCH } from '../../services/api';
import { setStats } from '../stat.slice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleAddSong(action: any): any {
  try {
    yield call(addSong, action.payload);
    const stats = yield call(FETCH);
    yield put(setStats(stats?.stats));
  } catch (error) {
    console.error(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleUpdateSong(action: any): any {
  try {
    yield call(updateSong, action.payload);
    const stats = yield call(FETCH);
    yield put(setStats(stats?.stats));
  } catch (error) {
    console.error(error);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* handleDeleteSong(action: any): any {
  try {
    yield call(deleteSong, action.payload);
    const stats = yield call(FETCH);
    yield put(setStats(stats?.stats));
  } catch (error) {
    console.error(error);
  }
}

function* songSaga() {
  yield takeEvery(addSong.type, handleAddSong);
  yield takeEvery(updateSong.type, handleUpdateSong);
  yield takeEvery(deleteSong.type, handleDeleteSong);
}

export default songSaga;
