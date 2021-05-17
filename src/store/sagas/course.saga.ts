import { api } from '../../api';
import { addCourseAction, saveAllCourses } from '../actions';
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
    data: link,
    startFetching,
    stopFetching,
    fillFetched,
  };

  yield makeRequestWithSpinner<null>(options);
}

export function* getAllCoursesWorker(): Generator {
  const options = {
    reset: resetRequestSpinner,
    fetcher: api.courses.getAllCourses,
    startFetching,
    stopFetching,
    fillFetched: saveAllCourses,
  };

  yield makeRequestWithSpinner<ICourse[]>(options);
}
