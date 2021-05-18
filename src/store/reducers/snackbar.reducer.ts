import { Reducer } from 'redux';
import { SET_SNACKBAR, CLEAR_TOKEN } from '../types';
import { ActionTypes } from '../../interfaces/actions';
import { ISnackbar } from '../../interfaces/snackbar';

const initialState: ISnackbar = {
  snackbarOpen: false,
  snackbarType: 'success',
  snackbarMessage: '',
  snackbarTime: 3000,
};

export const snackbarReducer: Reducer<ISnackbar, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SNACKBAR:
      const { snackbarOpen, snackbarType, snackbarMessage, snackbarTime } = action;
      return {
        ...state,
        snackbarOpen,
        snackbarType,
        snackbarMessage,
        snackbarTime,
      };
    case CLEAR_TOKEN:
      return { ...initialState };
    default:
      return state;
  }
};
