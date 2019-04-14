import {types} from '../actions/index';

export const initialState = {
  loading: false,
  plexPin: '',
  user: '',
};

export default function(state = {}, action) {
  console.log('action - payload', action.payload);
  switch (action.type) {
    case types.FETCH_USER:
      return action.payload || false;
    case types.FETCH_PIN:
      return {...state, plexPin: action.payload};
    case types.CHECK_PLEX_PIN:
      return {...state, plexToken: action.payload};
    default:
      return state;
  }
}
