import { Reducer } from 'redux';
import { SET_TOKEN, CLEAR_TOKEN } from '../types';
import { ActionTypes } from '../../interfaces/actions';

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
};

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
};

export const authReducer: Reducer<AuthState, ActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return { ...state, token: action.payload, isAuthenticated: true };
    case CLEAR_TOKEN:
      return { ...state, token: null, isAuthenticated: false };
    default:
      return state;
  }
};
