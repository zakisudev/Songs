import { all } from 'redux-saga/effects';
import songsSagas from './sagas/songs.saga';

export default function* rootSaga() {
  yield all([songsSagas()]);
}
