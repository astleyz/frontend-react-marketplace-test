import { put } from 'redux-saga/effects';
import { api } from '../../api';
import { ILightCourse, IFullCourse } from '../../interfaces/course';
import { makeRequestWithSpinner } from './spinnerRequest.saga';
import {
  addCourseAction,
  editCourseAction,
  removeCourseAction,
  saveAllCourses,
  saveCourse,
  setSnackbar,
  fetchCourse,
  clearCourseInStore,
  setFetchingError,
} from '../actions';
import {
  startFetching,
  stopFetching,
  fillFetched,
  resetRequestSpinner,
} from '../actions/spinnerRequest.action';

export function* addCourseWorker({ link, callback }: addCourseAction): Generator {
  const options = {
    reset: resetRequestSpinner,
    fetcher: api.course.addCourseToUser,
    data: { link },
    startFetching,
    stopFetching,
    fillFetched,
  };

  try {
    yield makeRequestWithSpinner<null>(options);
    if (callback) callback();
    yield put(setSnackbar(true, 'success', 'Курс добавлен', 3000));
  } catch (e) {}
}

export function* fetchAllCoursesWorker(): Generator {
  const options = {
    fetcher: api.course.getAllCourses,
    fillFetched: saveAllCourses,
  };

  try {
    yield makeRequestWithSpinner<ILightCourse[]>(options);
  } catch (e) {}
}

export function* fetchCourseWorker({ id }: ReturnType<typeof fetchCourse>): Generator {
  const options = {
    fetcher: api.course.getCourse,
    data: id,
    fillFetched: saveCourse,
    snackbarOnError: false,
  };

  try {
    yield makeRequestWithSpinner<IFullCourse>(options);
  } catch (e) {
    yield put(setFetchingError(e));
  }
}

export function* editCourseWorker({ editOptions }: editCourseAction): Generator {
  const options = {
    fetcher: api.course.patchCourse,
    data: editOptions,
    fillFetched: saveCourse,
  };

  try {
    yield makeRequestWithSpinner<IFullCourse>(options);
  } catch (e) {}
}

export function* removeCourseWorker({ id, cb }: removeCourseAction): Generator {
  const options = {
    fetcher: api.course.removeCourse,
    data: id,
  };

  try {
    yield makeRequestWithSpinner<null>(options);
    yield put(clearCourseInStore());
    cb();
  } catch (e) {}
}
