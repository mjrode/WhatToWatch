import {types} from '../actions/index';

export const initialState = {
  loading: false,
  plexToken: '',
  tvShowList: [],
  mediaResponse: '',
  currentShow: '',
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PLEX_TOKEN:
      return {...state, plexToken: action.payload};
    case types.FETCH_MEDIA_RESPONSE:
      const newState = {...state, mediaResponse: action.payload};
      return newState;
    case types.SET_LOADING:
      return {...state, loading: action.payload};
    case types.GET_MOST_WATCHED:
      return {...state, tvShowList: [...action.payload]};
    case types.CURRENT_SHOW:
      return {...state, currentShow: action.payload};
    default:
      return state;
  }
}
