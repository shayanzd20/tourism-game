import { Actions } from 'react-native-router-flux';
import { EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  NUMBER_CHANGED,
  DIGITS_CHANGED,
  TOKEN_CHANGED,
  DIGITTEXT_CHANGED,
  REALNUMBER_CHANGED,
  VISIBLE_CHANGED,
  USER_STATUS,
  USER_QUESTION_UPDATE,
  UPDATE_FIRST_SCORE,
  UPDATE_SECOND_SCORE,
  UPDATE_THIRD_SCORE,
  QUESTION_ONE_PROGRESS_UPDATE,
  QUESTION_ONE_RESULT_UPDATE,
  QUESTION_ONE_ANSWER_UPDATE,
  QUESTION_ONE_QUESTION_UPDATE,
  QUESTION_ONE_ALTS_UPDATE,
  QUESTION_ONE_MODAL_VISIBLE,
  QUESTION_TWO_PROGRESS_UPDATE,
  QUESTION_TWO_RESULT_UPDATE,
  QUESTION_TWO_ANSWER_UPDATE,
  QUESTION_TWO_QUESTION_UPDATE,
  QUESTION_TWO_ALTS_UPDATE,
  QUESTION_TWO_MODAL_VISIBLE,
  QUESTION_THREE_PROGRESS_UPDATE,
  QUESTION_THREE_RESULT_UPDATE,
  QUESTION_THREE_ANSWER_UPDATE,
  QUESTION_THREE_QUESTION_UPDATE,
  QUESTION_THREE_ALTS_UPDATE,
  QUESTION_THREE_MODAL_VISIBLE,
} from './types';

export const numberChanged = (number) => {
  return {
    type: NUMBER_CHANGED,
    payload: number
  };
};

export const visibleChanged = (input) => {
  return (dispatch) => {
    dispatch({
      type: VISIBLE_CHANGED,
      payload: input
    });
  };
};

export const digitsChanged = (input) => {
  return (dispatch) => {
    dispatch({
      type: DIGITS_CHANGED,
      payload: input
    });
  };
};

export const tokenChanged = (input) => {
  return (dispatch) => {
    dispatch({
      type: TOKEN_CHANGED,
      payload: input
    });
  };
};

export const digitTextChanged = (input) => {
  return (dispatch) => {
    dispatch({
      type: DIGITTEXT_CHANGED,
      payload: input
    });
  };
};

export const realNumberChanged = (input) => {
  return (dispatch) => {
    dispatch({
      type: REALNUMBER_CHANGED,
      payload: input
    });
  };
};

export const userStatusChanged = (input) => {
  return (dispatch) => {
    dispatch({
      type: USER_STATUS,
      payload: input
    });
  };
};

// choose game page actions

export const userQuestionUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: USER_QUESTION_UPDATE,
      payload: input
    });
  };
};

export const updateFirstScore = (input) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_FIRST_SCORE,
      payload: input
    });
  };
};

export const updateSecondScore = (input) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_SECOND_SCORE,
      payload: input
    });
  };
};

export const updateThirdScore = (input) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_THIRD_SCORE,
      payload: input
    });
  };
};

///////////////////////////////

// game one actions ///////////

export const questionOneProgressUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_ONE_PROGRESS_UPDATE,
      payload: input
    });
  };
};

export const questionOneResultUpdate = (input, text, status) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_ONE_RESULT_UPDATE,
      payload: { input, text, status }
    });
  };
};

export const questionOneAnswerUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_ONE_ANSWER_UPDATE,
      payload: input
    });
  };
};

export const questionOneQuestionUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_ONE_QUESTION_UPDATE,
      payload: input
    });
  };
};

export const questionOneAltsUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_ONE_ALTS_UPDATE,
      payload: input
    });
  };
};

export const questionOneModalUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_ONE_MODAL_VISIBLE,
      payload: input
    });
  };
};

// game Two actions ///////////

export const questionTwoProgressUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_TWO_PROGRESS_UPDATE,
      payload: input
    });
  };
};

export const questionTwoResultUpdate = (input, text, status) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_TWO_RESULT_UPDATE,
      payload: { input, text, status }
    });
  };
};

export const questionTwoAnswerUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_TWO_ANSWER_UPDATE,
      payload: input
    });
  };
};

export const questionTwoQuestionUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_TWO_QUESTION_UPDATE,
      payload: input
    });
  };
};

export const questionTwoAltsUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_TWO_ALTS_UPDATE,
      payload: input
    });
  };
};

export const questionTwoModalUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_TWO_MODAL_VISIBLE,
      payload: input
    });
  };
};

// game THREE actions ///////////

export const questionThreeProgressUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_THREE_PROGRESS_UPDATE,
      payload: input
    });
  };
};

export const questionThreeResultUpdate = (input, text, status) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_THREE_RESULT_UPDATE,
      payload: { input, text, status }
    });
  };
};

export const questionThreeAnswerUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_THREE_ANSWER_UPDATE,
      payload: input
    });
  };
};

export const questionThreeQuestionUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_THREE_QUESTION_UPDATE,
      payload: input
    });
  };
};

export const questionThreeAltsUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_THREE_ALTS_UPDATE,
      payload: input
    });
  };
};

export const questionThreeModalUpdate = (input) => {
  return (dispatch) => {
    dispatch({
      type: QUESTION_THREE_MODAL_VISIBLE,
      payload: input
    });
  };
};
///////////////////////////////

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    console.log(email);
    console.log(password);
    if (password === 123 || password === '123') {
      loginUserSuccess(dispatch, 'shayan');
    } else {
      loginUserFail(dispatch);
    }
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.employeeList();
};

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
};
