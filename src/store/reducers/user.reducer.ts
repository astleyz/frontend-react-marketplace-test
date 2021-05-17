import { Reducer } from 'redux';
import { SET_USER_DATA, SET_FULL_NAME, CLEAR_TOKEN } from '../types';
import { UserActionTypes } from '../../interfaces/actions';
import { isNotNull } from '../../interfaces/guard';

export interface IUserData {
  name: string;
  img: string;
  courses: any[];
}

const initialState: IUserData | null = null;

export const userReducer: Reducer<Partial<IUserData> | null, UserActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SET_USER_DATA:
      if (isNotNull(state)) return { ...state, ...action.user };
      return { ...action.user };
    case SET_FULL_NAME:
      if (isNotNull(state)) return { ...state, name: action.data.name, img: action.data.img };
      return { name: action.data.name, img: action.data.img };
    case CLEAR_TOKEN:
      return null;
    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const x: never = action;
  }

  return state;
};
