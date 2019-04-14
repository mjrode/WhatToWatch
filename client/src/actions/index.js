import {toast} from 'react-toastify';
import axios from 'axios';
export const types = {
  SET_LOADING: 'set_loading',
  FETCH_USER: 'fetch_user',
  FETCH_MEDIA_RESPONSE: 'fetch_media_response',
  GET_MOST_WATCHED: 'get_most_watched',
  ADD_SERIES: 'add_series',
  CURRENT_SHOW: 'current_show',
  FETCH_PIN: 'fetch_pin',
  CHECK_PLEX_PIN: 'check_plex_pin',
};

export const setLoading = loading => dispatch => {
  dispatch({type: types.SET_LOADING, payload: {loading: loading}});
};

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/auth/current_user');
  dispatch({type: types.FETCH_USER, payload: res.data});
};

export const fetchPin = () => async dispatch => {
  const res = await axios.get('/api/plex/plex-pin');
  dispatch({type: types.FETCH_PIN, payload: res.data});
};

export const fetchMedia = () => async dispatch => {
  dispatch({type: types.SET_LOADING, payload: true});
  const res = await axios.get('/api/plex/import/all');
  console.log('fetchMedia', res);
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
  res.data.title
    ? toast('Successfully added: ' + res.data.title)
    : toast(res.data);
  dispatch({type: types.ADD_SERIES, payload: res.data});
};

const createPoller = (interval, initialDelay) => {
  let timeoutId = null;
  let poller = () => {};
  return fn => {
    window.clearTimeout(timeoutId);
    poller = () => {
      timeoutId = window.setTimeout(poller, 2000);
      return fn();
    };
    if (initialDelay) {
      return (timeoutId = window.setTimeout(poller, 2000));
    }
    return poller();
  };
};

export const createPollingAction = (action, interval, initialDelay) => {
  const poll = createPoller(action, initialDelay);
  return () => (dispatch, getState) => poll(() => action(dispatch, getState));
};

export const checkPlexPin = createPollingAction(dispatch => {
  axios.get('/api/plex/check-plex-pin').then(res => {
    if (res.data) {
      var highestTimeoutId = setTimeout(';');
      for (var i = 0; i < highestTimeoutId; i++) {
        clearTimeout(i);
      }
    }
    console.log('action res', res);
    dispatch({type: types.CHECK_PLEX_PIN, payload: res.data});
  });
}, 15000);
