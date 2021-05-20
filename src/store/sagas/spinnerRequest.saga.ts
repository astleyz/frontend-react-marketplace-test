import { ActionCreator, AnyAction } from 'redux';
import { SagaIterator } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { FetchDataType } from '../../api';
import { setSnackbar } from '../actions';

export type fillActionType<T> = (payload: T) => { type: string; payload: T };

/**
 *  @param reset
 *  @param startFetching
 *  @param stopFetching
 *  this is a group, they are all required or all optional
 */

type OptionsType<T> = {
  reset?: ActionCreator<AnyAction>;
  fetcher: (data?: any) => FetchDataType<T>;
  data?: any;
  startFetching?: ActionCreator<AnyAction>;
  stopFetching?: ActionCreator<AnyAction>;
  fillFetched?: fillActionType<T>;
  snackbarOnError?: boolean;
};

export function* makeRequestWithSpinner<T>(options: OptionsType<T>): SagaIterator {
  if (options.snackbarOnError === undefined) options.snackbarOnError = true;

  try {
    if (options.reset) yield put(options.reset());
    if (options.startFetching) yield put(options.startFetching());
    const response = yield call(options.fetcher, options.data);
    if (options.fillFetched) yield put(options.fillFetched(response.data));
  } catch (e) {
    const errText = e.response?.data?.message || e.message || 'Client Error';
    if (options.snackbarOnError) yield put(setSnackbar(true, 'error', errText, 5000));
    throw e;
  } finally {
    if (options.stopFetching) yield put(options.stopFetching());
  }
}
