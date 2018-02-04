import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import UserReducer from './UserReducer';
import QuestionOneReducer from './QuestionOneReducer';
import QuestionTwoReducer from './QuestionTwoReducer';
import QuestionThreeReducer from './QuestionThreeReducer';

export default combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  q_one: QuestionOneReducer,
  q_two: QuestionTwoReducer,
  q_three: QuestionThreeReducer,
});
