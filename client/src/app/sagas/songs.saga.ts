import { call, put, takeLatest } from 'redux-saga/effects';
import { setSongs } from '../song.slice';
import { fetchSongs } from '../../services/api';

function* handleFetchSongs(): Generator {
  try {
    const songs = yield call(fetchSongs);
    yield put(setSongs(songs));
  } catch (error) {
    console.log(error);
    yield put(setSongs([]));
  }
}

function* songSaga() {
  yield takeLatest('songs/fetchSongs', handleFetchSongs);
}

export default songSaga;
