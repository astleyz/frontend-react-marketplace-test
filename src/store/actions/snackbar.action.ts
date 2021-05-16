import { SET_SNACKBAR } from '../types';
import { ISnackbar, snackbarValue } from '../../interfaces/snackbar';

export type SnackbarAction = ISnackbar & {
  type: typeof SET_SNACKBAR;
};

type SnackbarActionProps = (
  isOpen: snackbarValue<'snackbarOpen'>,
  type: snackbarValue<'snackbarType'>,
  msg: snackbarValue<'snackbarMessage'>,
  time?: snackbarValue<'snackbarTime'>
) => SnackbarAction;

export const setSnackbar: SnackbarActionProps = (isOpen, type, msg, time = 3000) => ({
  type: SET_SNACKBAR,
  snackbarOpen: isOpen,
  snackbarType: type,
  snackbarMessage: msg,
  snackbarTime: time,
});
