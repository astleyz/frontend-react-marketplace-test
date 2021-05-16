import * as snackbar from '../store/actions/snackbar.action';
import * as auth from '../store/actions/auth.action';

export type ActionTypes =
  | snackbar.SnackbarAction
  | auth.AuthorizationAction
  | auth.RegistrationAction;
