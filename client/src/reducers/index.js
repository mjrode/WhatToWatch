import {combineReducers} from 'redux';
import authReducer from './authReducer';
import plexReducer from './plexReducer';
import sonarrReducer from './sonarrReducer';

export default combineReducers({
  auth: authReducer,
  plex: plexReducer,
  sonarr: sonarrReducer,
});
