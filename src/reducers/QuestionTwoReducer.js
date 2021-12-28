import {
  QUESTION_TWO_PROGRESS_UPDATE,
  QUESTION_TWO_RESULT_UPDATE,
  QUESTION_TWO_ANSWER_UPDATE,
  QUESTION_TWO_QUESTION_UPDATE,
  QUESTION_TWO_ALTS_UPDATE,
  QUESTION_TWO_MODAL_VISIBLE,
          } from '../actions/types';

const INITIAL_STATE = {
  progress: 0,
  result: null,
  answer: null,
  img: null,
  modal_visible: false,
  text_modal: '',
  status: null,
  alts: []
 };

 export default (state = INITIAL_STATE, action) => {
   switch (action.type) {
     case QUESTION_TWO_PROGRESS_UPDATE:
       return { ...state, progress: action.payload };
     case QUESTION_TWO_RESULT_UPDATE:
       return { ...state, result: action.payload.input, text_modal: action.payload.text, status: action.payload.status };
     case QUESTION_TWO_ANSWER_UPDATE:
       return { ...state, answer: action.payload };
     case QUESTION_TWO_QUESTION_UPDATE:
       return { ...state, img: action.payload };
     case QUESTION_TWO_ALTS_UPDATE:
       return { ...state, alts: action.payload };
     case QUESTION_TWO_MODAL_VISIBLE:
       return { ...state, modal_visible: action.payload };
     default:
       return state;
   }
 };
