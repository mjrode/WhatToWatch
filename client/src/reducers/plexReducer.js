import {types} from '../actions/index';

export const initialState = {
  loading: false,
  plexToken: '',
  tvShowList: [],
  mediaResponse: [],
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PLEX_TOKEN:
      return {...state, plexToken: action.payload.plexToken || false};
    case types.FETCH_MEDIA_RESPONSE:
      return {...state, mediaResponse: action.payload.mediaResponse || false};
    case types.SET_LOADING:
      return {...state, loading: action.payload};
    case types.GET_MOST_WATCHED:
      console.log('GET MOST WATCHED', action);
      return {...state, tvShowList: [...state.tvShowList, ...action.payload]};
    default:
      return state;
  }
}
