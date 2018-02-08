import {
         USER_STATUS,
         USER_QUESTION_UPDATE,
         UPDATE_FIRST_SCORE,
         UPDATE_SECOND_SCORE,
         UPDATE_THIRD_SCORE,
          } from '../actions/types';

const INITIAL_STATE = {
  user_status: null,
  token: '',
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
  thirdObj: null
 };

export default (state = INITIAL_STATE, action) => {
  console.log('this is action in user reducer:');
  console.log(action);
  console.log('this is state in user reducer', state);
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
    default:
      return state;
  }
};
