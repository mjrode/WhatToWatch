import {combineReducers} from 'redux';
import authReducer from './authReducer';
import plexReducer from './plexReducer';

export default combineReducers({
  auth: authReducer,
  plex: plexReducer,
});
