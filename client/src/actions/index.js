import axios from 'axios';
import {FETCH_USER, FETCH_PLEX_TOKEN} from './types';

// Action Creators
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/auth/current_user');
  dispatch({type: FETCH_USER, payload: res.data});
};

export const fetchPlexToken = (
  username,
  password,
  plexUrl,
) => async dispatch => {
  const params = {username, password, plexUrl};
  const token = await axios.get('/plex/auth', {params});
  dispatch({type: FETCH_PLEX_TOKEN, payload: token});
};
