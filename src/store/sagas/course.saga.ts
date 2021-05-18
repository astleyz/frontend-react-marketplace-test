import { put } from 'redux-saga/effects';
import { api } from '../../api';
import { addCourseAction, saveAllCourses, setSnackbar } from '../actions';
import { ICourse } from '../../interfaces/course';
import { makeRequestWithSpinner } from './spinnerRequest.saga';
import {
  startFetching,
  stopFetching,
  fillFetched,
  resetRequestSpinner,
} from '../actions/spinnerRequest.action';

export function* addCourseWorker({ link }: addCourseAction): Generator {
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
    yield put(setSnackbar(true, 'success', 'Курс добавлен', 3000));
  } catch (e) {}
}

export function* getAllCoursesWorker(): Generator {
  const options = {
    reset: resetRequestSpinner,
    fetcher: api.courses.getAllCourses,
    startFetching,
    stopFetching,
    fillFetched: saveAllCourses,
  };

  try {
    yield makeRequestWithSpinner<ICourse[]>(options);
  } catch (e) {}
}
