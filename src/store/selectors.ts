import { RootState } from './store';

export const getSnackbarOpen = (state: RootState) => state.snackbar.snackbarOpen;
export const getSnackbarType = (state: RootState) => state.snackbar.snackbarType;
export const getSnackbarMessage = (state: RootState) => state.snackbar.snackbarMessage;
export const getSnackbarTime = (state: RootState) => state.snackbar.snackbarTime;

export const getToken = (state: RootState) => state.auth.token;
export const getAuthStatus = (state: RootState) => state.auth.isAuthenticated;

export const getUserAccountData = (state: RootState) => state.user;

export const getCourseId = (state: RootState) => state.course.id;
export const getCourseForEdit = (state: RootState) => state.course.course;
export const getFetchedCourses = (state: RootState) => state.course.fetchedCourses;

export const getIsFetchingSpinner = (state: RootState) => state.spinnerRequest.isFetching;
export const getSpinneredData = (state: RootState) => state.spinnerRequest.data;
export const getSpinneredError = (state: RootState) => state.spinnerRequest.error;
