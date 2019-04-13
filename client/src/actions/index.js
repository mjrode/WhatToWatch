import {toast} from 'react-toastify';
import axios from 'axios';
export const types = {
  SET_LOADING: 'set_loading',
  FETCH_USER: 'fetch_user',
  FETCH_MEDIA_RESPONSE: 'fetch_media_response',
  GET_MOST_WATCHED: 'get_most_watched',
  ADD_SERIES: 'add_series',
  CURRENT_SHOW: 'current_show',
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
  dispatch({type: types.SET_LOADING, payload: false});
  dispatch({type: types.FETCH_MEDIA_RESPONSE, payload: res.data});
};

export const getMostWatched = params => async dispatch => {
  dispatch({type: types.SET_LOADING, payload: true});
  const res = await axios.get('/api/recommend/most-watched');
  dispatch({type: types.SET_LOADING, payload: false});
  dispatch({type: types.GET_MOST_WATCHED, payload: res.data});
};

export const addSeries = params => async dispatch => {
  dispatch({type: types.SET_LOADING, payload: true});
  dispatch({type: types.CURRENT_SHOW, payload: params.showName});
  const res = await axios.get('/api/sonarr/series/add', {params});
  dispatch({type: types.SET_LOADING, payload: false});
  toast(res.data);
  dispatch({type: types.ADD_SERIES, payload: res.data});
};
