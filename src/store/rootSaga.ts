import { all, fork, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { REQUEST_LOGIN, REQUEST_REGISTRATION } from './types';
import { authorizationWorker, registrationWorker } from './sagas/auth.saga';

export function* authWatcher(): SagaIterator {
  yield takeEvery<typeof REQUEST_LOGIN, (arg: any) => void>(REQUEST_LOGIN, authorizationWorker);
  yield takeEvery<typeof REQUEST_REGISTRATION, (arg: any) => void>(
    REQUEST_REGISTRATION,
    registrationWorker
  );
}

export default function* rootSaga(): SagaIterator {
  yield all([fork(authWatcher)]);
}
