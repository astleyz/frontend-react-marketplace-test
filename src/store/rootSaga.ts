import { all, fork, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import * as type from './types';
import * as auth from './sagas/auth.saga';
import * as course from './sagas/course.saga';

export function* authWatcher(): SagaIterator {
  yield takeEvery(type.REQUEST_LOGIN, auth.authorizationWorker);
  yield takeEvery(type.REQUEST_REGISTRATION, auth.registrationWorker);
}

export function* courseWatcher(): SagaIterator {
  yield takeEvery(type.ADD_COURSE, course.addCourseWorker);
  yield takeEvery(type.FETCH_COURSES, course.fetchAllCoursesWorker);
  yield takeEvery(type.FETCH_ONE_COURSE, course.fetchCourseWorker);
  yield takeEvery(type.EDIT_ONE_COURSE, course.editCourseWorker);
}

export default function* rootSaga(): SagaIterator {
  yield all([fork(authWatcher), fork(courseWatcher)]);
}
