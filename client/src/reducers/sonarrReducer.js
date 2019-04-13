import {types} from '../actions/index';

export const initialState = {
  loading: false,
  addSeries: '',
};
export default function(state = initialState, action) {
  switch (action.type) {
    case types.ADD_SERIES:
      return {...state, sonarrAddSeries: action.payload};
    case types.SET_LOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
}
