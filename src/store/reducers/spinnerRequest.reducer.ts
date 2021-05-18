import { Reducer } from 'redux';
import { RequestSpinnerActionTypes as ActionTypes } from '../../interfaces/actions';
import {
  START_FETCHING,
  STOP_FETCHING,
  FILL_FETCHED,
  SET_FETCHING_ERROR,
  RESET_SPINNER,
  CLEAR_TOKEN,
} from '../types';

export type RequestState = {
  data: unknown;
  isFetching: boolean;
  error: false | { message: string };
};

const initialState: RequestState = {
  data: null,
  isFetching: false,
  error: false,
};

export const requestReducer: Reducer<RequestState, ActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case START_FETCHING:
      return { ...state, isFetching: true, error: false };
    case STOP_FETCHING:
      return { ...state, isFetching: false, error: false };
    case FILL_FETCHED:
      return { ...state, data: action.payload, error: false };
    case SET_FETCHING_ERROR:
      return { ...state, error: { message: action.message } };
    case RESET_SPINNER:
      return { ...initialState };
    case CLEAR_TOKEN:
      return { ...initialState };

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const x: never = action;
  }

  return state;
};
