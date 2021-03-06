import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from './errorReducer'
import profileReducer from './profileReducer';
import postReducer from './postReducer';
import messagingReducer from './messagingReducer';
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profile: profileReducer,
  post: postReducer,
  messaging: messagingReducer
});
