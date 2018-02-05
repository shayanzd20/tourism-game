import {
  QUESTION_THREE_PROGRESS_UPDATE,
  QUESTION_THREE_RESULT_UPDATE,
  QUESTION_THREE_ANSWER_UPDATE,
  QUESTION_THREE_QUESTION_UPDATE,
  QUESTION_THREE_ALTS_UPDATE,
  QUESTION_THREE_MODAL_VISIBLE,
          } from '../actions/types';

const INITIAL_STATE = {
  progress: 0,
  result: null,
  answer: null,
  video: null,
  modal_visible: false,
  text_modal: '',
  status: null,
  alts: []
 };

 export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
     case QUESTION_THREE_PROGRESS_UPDATE:
       return { ...state, progress: action.payload };
     case QUESTION_THREE_RESULT_UPDATE:
       return { ...state, result: action.payload.input, text_modal: action.payload.text, status: action.payload.status };
     case QUESTION_THREE_ANSWER_UPDATE:
       return { ...state, answer: action.payload };
     case QUESTION_THREE_QUESTION_UPDATE:
       return { ...state, video: action.payload };
     case QUESTION_THREE_ALTS_UPDATE:
       return { ...state, alts: action.payload };
     case QUESTION_THREE_MODAL_VISIBLE:
       return { ...state, modal_visible: action.payload };
     default:
       return state;
   }
 };
