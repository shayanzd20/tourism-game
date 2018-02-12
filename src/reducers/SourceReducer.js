import {
         SOURCE_CITY_UPDATE,
          } from '../actions/types';

const INITIAL_STATE = {
  city: null,
 };

export default (state = INITIAL_STATE, action) => {
  console.log('this is action in source reducer:');
  console.log(action);
  console.log('this is state in source reducer', state);
  switch (action.type) {
    case SOURCE_CITY_UPDATE:
      return { ...state, city: action.payload };
    default:
      return state;
  }
};
