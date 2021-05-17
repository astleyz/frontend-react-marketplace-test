import * as snackbar from '../store/actions/snackbar.action';
import * as auth from '../store/actions/auth.action';
import * as user from '../store/actions/user.action';

export type ActionTypes =
  | snackbar.SnackbarAction
  | auth.AuthorizationAction
  | auth.RegistrationAction
  | auth.setTokenAction
  | auth.clearTokenAction;

export type UserActionTypes =
  | user.saveUserFetchedDataAction
  | user.saveUserFullNameAction
  | auth.clearTokenAction;
