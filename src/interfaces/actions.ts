import * as snackbar from '../store/actions/snackbar.action';
import * as auth from '../store/actions/auth.action';
import * as user from '../store/actions/user.action';
import * as course from '../store/actions/course.action';
import * as spinner from '../store/actions/spinnerRequest.action';

export type ActionTypes =
  | snackbar.SnackbarAction
  | auth.AuthorizationAction
  | auth.RegistrationAction
  | auth.setTokenAction
  | auth.clearTokenAction;

export type UserActionTypes =
  | user.saveUserFullNameAction
  | ReturnType<typeof user.clearUser>
  | auth.clearTokenAction;

export type CourseActionTypes =
  | course.saveCourseAction
  | course.saveCoursesAction
  | ReturnType<typeof course.clearCourseInStore>
  | ReturnType<typeof course.clearFetchedCourses>
  | course.setLessonAction
  | ReturnType<typeof course.clearLesson>;

export type RequestSpinnerActionTypes =
  | ReturnType<typeof spinner.startFetching>
  | ReturnType<typeof spinner.stopFetching>
  | ReturnType<typeof spinner.fillFetched>
  | ReturnType<typeof spinner.setFetchingError>
  | ReturnType<typeof spinner.resetRequestSpinner>
  | auth.clearTokenAction;
