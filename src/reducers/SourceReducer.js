import {
         SOURCE_CITY_UPDATE,
         UPDATE_CITIES,
         UPDATE_TICKETS,
          } from '../actions/types';

const INITIAL_STATE = {
  city: null,
  cities: null,
  tickets: null
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SOURCE_CITY_UPDATE:
      return { ...state, city: action.payload };
    case UPDATE_CITIES:
      return { ...state, cities: action.payload };
    case UPDATE_TICKETS:
      return { ...state, tickets: action.payload };
    default:
      return state;
  }
};
