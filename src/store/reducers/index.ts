import { combineReducers } from 'redux';
import { snackbarReducer as snackbar } from './snackbar.reducer';

export const rootReducer = combineReducers({
  snackbar,
});
