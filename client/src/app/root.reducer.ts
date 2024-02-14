import { combineReducers } from 'redux';
import songsReducer from './song.slice';
import statsReducer from './stat.slice';

const rootReducer = combineReducers({
  songs: songsReducer,
  stats: statsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
