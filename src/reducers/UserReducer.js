import {
         USER_STATUS,
         USER_QUESTION_UPDATE,
         UPDATE_FIRST_SCORE,
         UPDATE_SECOND_SCORE,
         UPDATE_THIRD_SCORE,
         CITY_STATUS,
         DIAMOND_UPDATE,
         COIN_UPDATE,
         INSUFFICIANT_MODAL_VISIBLE,
         VIDEO_CITY_MODAL
          } from '../actions/types';

const INITIAL_STATE = {
  user_status: null,
  visible: false,
  q_first: false,
  q_second: false,
  q_third: false,
  dis_touch_first: false,
  dis_touch_second: false,
  dis_touch_third: false,
  scoreFirst: 0,
  scoreSecond: 0,
  scoreThird: 0,
  firstObj: null,
  secondObj: null,
  thirdObj: null,
  city_status: null,
  coin: 0,
  diamond: 0,
  insufficiant_visible: false,
  video_city_modal: false
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_STATUS:
      return { ...state, user_status: action.payload };
    case USER_QUESTION_UPDATE:
      return { ...state,
        firstObj: action.payload.firstObj,
        secondObj: action.payload.secondObj,
        thirdObj: action.payload.thirdObj,
       };
    case UPDATE_FIRST_SCORE:
      return { ...state,
        scoreFirst: action.payload.scoreFirst,
        q_first: action.payload.q_first,
        dis_touch_first: action.payload.dis_touch_first
       };
    case UPDATE_SECOND_SCORE:
      return { ...state,
        scoreSecond: action.payload.scoreSecond,
        q_second: action.payload.q_second,
        dis_touch_second: action.payload.dis_touch_second
       };
    case UPDATE_THIRD_SCORE:
      return { ...state,
        scoreThird: action.payload.scoreThird,
        q_third: action.payload.q_third,
        dis_touch_third: action.payload.dis_touch_third
      };
    case CITY_STATUS:
      return { ...state, city_status: action.payload };

    case DIAMOND_UPDATE:
      return { ...state, diamond: action.payload };
    case COIN_UPDATE:
      return { ...state, coin: action.payload };
    case INSUFFICIANT_MODAL_VISIBLE:
      return { ...state, insufficiant_visible: action.payload };
    case VIDEO_CITY_MODAL:
      return { ...state, video_city_modal: action.payload };
    default:
      return state;
  }
};
