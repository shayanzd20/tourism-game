import {
         QUESTION_ONE_PROGRESS_UPDATE,
         QUESTION_ONE_RESULT_UPDATE,
         QUESTION_ONE_ANSWER_UPDATE,
         QUESTION_ONE_QUESTION_UPDATE,
         QUESTION_ONE_ALTS_UPDATE,
         QUESTION_ONE_MODAL_VISIBLE,
          } from '../actions/types';

const INITIAL_STATE = {
  progress: 0,
  result: null,
  answer: null,
  question: null,
  modal_visible: false,
  text_modal: '',
  status: null,
  // alts: {
  //   altOne: null,
  //   altTwo: null,
  //   altThree: null,
  //   altFour: null,
  // }
  alts: []
 };

export default (state = INITIAL_STATE, action) => {
  // console.log('this is action in question one reducer:');
  // console.log(action);
  // console.log('this is state in question one reducer', state);
  switch (action.type) {
    case QUESTION_ONE_PROGRESS_UPDATE:
      return { ...state, progress: action.payload };
    case QUESTION_ONE_RESULT_UPDATE:
      return { ...state, result: action.payload.input, text_modal: action.payload.text, status: action.payload.status };
    case QUESTION_ONE_ANSWER_UPDATE:
      return { ...state, answer: action.payload };
    case QUESTION_ONE_QUESTION_UPDATE:
      return { ...state, question: action.payload };
    case QUESTION_ONE_ALTS_UPDATE:
      return { ...state, alts: action.payload };
    case QUESTION_ONE_MODAL_VISIBLE:
      return { ...state, modal_visible: action.payload };
    default:
      return state;
  }
};
