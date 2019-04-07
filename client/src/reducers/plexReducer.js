import {types} from '../actions/index';

export const initialState = {
  loading: false,
  plexToken: '',
  mediaResponse: [],
};
export default function(state = initialState, action) {
  console.log('Action!', action);
  console.log('State!!', state);
  switch (action.type) {
    case types.FETCH_PLEX_TOKEN:
      return action.payload.plexToken || false;
    case types.FETCH_MEDIA_RESPONSE:
      return action.payload.mediaResponse || false;
    case types.SET_LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
}
