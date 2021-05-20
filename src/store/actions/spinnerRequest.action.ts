import { Action } from 'redux';
import { AxiosError } from 'axios';
import {
  START_FETCHING,
  STOP_FETCHING,
  FILL_FETCHED,
  SET_FETCHING_ERROR,
  RESET_SPINNER,
} from '../types';

export const startFetching = (): Action<typeof START_FETCHING> => ({
  type: START_FETCHING,
});

export const stopFetching = (): Action<typeof STOP_FETCHING> => ({
  type: STOP_FETCHING,
});

export const fillFetched = <T>(payload: T): Action<typeof FILL_FETCHED> & { payload: T } => ({
  type: FILL_FETCHED,
  payload,
});

type ErrorFetchedType = { type: typeof SET_FETCHING_ERROR; error: AxiosError };
export const setFetchingError = (error: AxiosError): ErrorFetchedType => ({
  type: SET_FETCHING_ERROR,
  error,
});

export const resetRequestSpinner = (): Action<typeof RESET_SPINNER> => ({
  type: RESET_SPINNER,
});
