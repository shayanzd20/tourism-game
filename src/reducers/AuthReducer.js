import { EMAIL_CHANGED,
         PASSWORD_CHANGED,
         LOGIN_USER_SUCCESS,
         LOGIN_USER_FAIL,
         LOGIN_USER,
         DIGITS_CHANGED,
         VISIBLE_CHANGED,
         TOKEN_CHANGED,
         DIGITTEXT_CHANGED,
         REALNUMBER_CHANGED,
         NUMBER_CHANGED } from '../actions/types';

const INITIAL_STATE = {
  email: '',
  number: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  realNumber: '',
  token: '',
  digitText: '',
  digits: false,
  visible: false
 };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload, loading: false };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'authentication fail !!!!', password: '', loading: false };
    case NUMBER_CHANGED:
      return { ...state, number: action.payload };
    case DIGITS_CHANGED:
      return { ...state, digits: action.payload };
    case VISIBLE_CHANGED:
      return { ...state, visible: action.payload };
    case DIGITTEXT_CHANGED:
      return { ...state, digitText: action.payload };
    case TOKEN_CHANGED:
      return { ...state, token: action.payload };
    case REALNUMBER_CHANGED:
      return { ...state, realNumber: action.payload };
    default:
      return state;
  }
};
