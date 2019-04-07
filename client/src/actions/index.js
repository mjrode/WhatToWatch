import axios from 'axios';
export const types = {
  SET_LOADING: 'set_loading',
  FETCH_USER: 'fetch_user',
  FETCH_MEDIA_RESPONSE: 'fetch_media_response',
};

export const setLoading = loading => dispatch => {
  dispatch({type: types.SET_LOADING, payload: {loading: loading}});
};

// Action Creators
export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/auth/current_user');
  dispatch({type: types.FETCH_USER, payload: res.data});
};

export const fetchMedia = () => async dispatch => {
  dispatch({type: types.SET_LOADING, payload: true});
  const res = await axios.get('/api/plex/import/all');
  console.log('action res', res);
  dispatch({type: types.FETCH_MEDIA_RESPONSE, payload: res.data});
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
