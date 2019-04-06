import {FETCH_PLEX_TOKEN} from '../actions/types';

export default function(state = '', action) {
  switch (action.type) {
    case FETCH_PLEX_TOKEN:
      return action.payload || false;
    default:
      return state;
  }
}
