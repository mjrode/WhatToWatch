import {types} from '../actions/index';

export default function(state = {}, action) {
  switch (action.type) {
    case types.FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
