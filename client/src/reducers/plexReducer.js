import {FETCH_PLEX_TOKEN, FETCH_MEDIA} from '../actions/types';

export default function(state = '', action) {
  console.log('Action!', action);
  switch (action.type) {
    case FETCH_PLEX_TOKEN:
      return action.payload || false;
    case FETCH_MEDIA:
      return action.payload || false;
    default:
      return state;
  }
}
