import { ActionCreator, AnyAction } from 'redux';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { FetchDataType } from '../../api';
import { setSnackbar } from '../actions';

export type fillActionType<T> = (payload: T) => { type: string; payload: T };

type OptionsType<T> = {
  reset: ActionCreator<AnyAction>;
  fetcher: (data?: any) => FetchDataType<T>;
  data?: any;
  startFetching: ActionCreator<AnyAction>;
  stopFetching: ActionCreator<AnyAction>;
  fillFetched: fillActionType<T>;
};

export function* makeRequestWithSpinner<T>(options: OptionsType<T>): SagaIterator {
  try {
    yield put(options.reset());
    yield put(options.startFetching());
    const response = yield call(options.fetcher, options.data);
    yield put(options.fillFetched(response.data));
  } catch (e) {
    const errText = e.response?.data?.message || e.message || 'Client Error';
    yield put(setSnackbar(true, 'error', errText, 5000));
  } finally {
    yield put(options.stopFetching());
    // yield put(options.reset());
  }
}
