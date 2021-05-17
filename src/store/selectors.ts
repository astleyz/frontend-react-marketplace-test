import { RootState } from './store';

export const getSnackbarOpen = (state: RootState) => state.snackbar.snackbarOpen;
export const getSnackbarType = (state: RootState) => state.snackbar.snackbarType;
export const getSnackbarMessage = (state: RootState) => state.snackbar.snackbarMessage;
export const getSnackbarTime = (state: RootState) => state.snackbar.snackbarTime;
export const getToken = (state: RootState) => state.auth.token;
export const getAuthStatus = (state: RootState) => state.auth.isAuthenticated;
export const getUserAccountData = (state: RootState) => state.user;
