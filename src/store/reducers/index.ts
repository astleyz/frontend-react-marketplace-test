import { combineReducers } from 'redux';
import { snackbarReducer as snackbar } from './snackbar.reducer';
import { authReducer as auth } from './auth.reducer';
import { userReducer as user } from './user.reducer';
import { courseReducer as course } from './course.reducer';
import { requestReducer as spinnerRequest } from './spinnerRequest.reducer';

export const rootReducer = combineReducers({
  snackbar,
  auth,
  user,
  course,
  spinnerRequest,
});
