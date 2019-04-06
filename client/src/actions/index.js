import axios from 'axios';
import {FETCH_USER, FETCH_MEDIA} from './types';

// Action Creators
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/auth/current_user');
  dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchMedia = () => async dispatch => {
  const res = await axios.get('/api/plex/import/all');
  console.log('action res', res);
  dispatch({type: FETCH_MEDIA, payload: res.data});
};

// export const fetchPlexToken = (
//   username,
//   password,
//   plexUrl,
// ) => async dispatch => {
//   const params = {username, password, plexUrl};
//   const token = await axios.get('/plex/auth', {params});
//   dispatch({type: FETCH_PLEX_TOKEN, payload: token});
// };
