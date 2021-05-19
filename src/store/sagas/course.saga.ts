import { put } from 'redux-saga/effects';
import { api } from '../../api';
import { addCourseAction, saveAllCourses, saveCourse, setSnackbar } from '../actions';
import { ILightCourse, IFullCourse } from '../../interfaces/course';
import { makeRequestWithSpinner } from './spinnerRequest.saga';
import { editCourseAction, fetchCourse } from '../actions/course.action';
import {
  startFetching,
  stopFetching,
  fillFetched,
  resetRequestSpinner,
} from '../actions/spinnerRequest.action';

export function* addCourseWorker({ link, callback }: addCourseAction): Generator {
  const options = {
    reset: resetRequestSpinner,
    fetcher: api.courses.addCourseToUser,
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
    fetcher: api.courses.getAllCourses,
    fillFetched: saveAllCourses,
  };

  try {
    yield makeRequestWithSpinner<ILightCourse[]>(options);
  } catch (e) {}
}

export function* fetchCourseWorker({ id }: ReturnType<typeof fetchCourse>): Generator {
  const options = {
    fetcher: api.courses.getCourse,
    data: id,
    fillFetched: saveCourse,
  };

  try {
    yield makeRequestWithSpinner<IFullCourse>(options);
  } catch (e) {}
}

export function* editCourseWorker({ course }: editCourseAction): Generator {
  const options = {
    fetcher: api.courses.patchCourse,
    data: course,
    fillFetched: saveCourse,
  };

  try {
    yield makeRequestWithSpinner<IFullCourse>(options);
  } catch (e) {}
}
