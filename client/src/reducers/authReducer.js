import { types } from '../actions/index';

export const initialState = {
  loading: false,
  plexPin: '',
  user: '',
  users: '',
};

export default function(state = {}, action) {
  console.log('action - type', action.type);
  console.log('action - type', action.payload);
  switch (action.type) {
    case types.FETCH_USER:
      return action.payload || false;
    case types.SIGN_UP_USER:
      return action.payload || false;
    case types.FETCH_USERS:
      return { ...state, users: action.payload };
    case types.FETCH_PIN:
      return { ...state, plexPin: action.payload };
    case types.CHECK_PLEX_PIN:
      return { ...state, plexToken: action.payload };
    default:
      return state;
  }
}
