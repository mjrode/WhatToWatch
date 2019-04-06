import {FETCH_USER} from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
