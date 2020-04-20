import {ADD_TOMATO, INIT_TOMATOES, UPDATE_TOMATO} from '../actionTypes';

export default (state: any[] = [], action: any) => {
  switch (action.type) {
    case ADD_TOMATO:
      return [action.payload, ...state];
    case INIT_TOMATOES:
      return [...action.payload];
    case UPDATE_TOMATO:
      return state.map(t => {
        if (t.id === action.payload.id) {
          return action.payload;
        } else {
          return t;
        }
      });
    default:
      return state;
  }
}