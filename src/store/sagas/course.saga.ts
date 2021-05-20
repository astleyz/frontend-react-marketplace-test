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
  };

  try {
    yield makeRequestWithSpinner<IFullCourse>(options);
  } catch (e) {}
}

export function* editCourseWorker({ course }: editCourseAction): Generator {
  const options = {
    fetcher: api.course.patchCourse,
    data: course,
    fillFetched: saveCourse,
  };

  try {
    yield makeRequestWithSpinner<IFullCourse>(options);
  } catch (e) {}
}

export function* removeCourseWorker({ id, history }: removeCourseAction): Generator {
  const options = {
    fetcher: api.course.removeCourse,
    data: id,
  };

  try {
    yield makeRequestWithSpinner<null>(options);
    yield put(clearCourseInStore());
    history.push('/');
  } catch (e) {}
}
