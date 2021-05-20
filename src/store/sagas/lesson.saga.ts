import { put } from 'redux-saga/effects';
import { api } from '../../api';
import { ILesson } from '../../interfaces/course';
import { makeRequestWithSpinner } from './spinnerRequest.saga';
import { fetchLessonAction, setLesson, setFetchingError } from '../actions';

export function* fetchLessonWorker({ path }: fetchLessonAction): Generator {
  const options = {
    fetcher: api.lesson.getLesson,
    data: path,
    fillFetched: setLesson,
    snackbarOnError: false,
  };

  try {
    yield makeRequestWithSpinner<ILesson>(options);
  } catch (e) {
    yield put(setFetchingError(e));
  }
}
