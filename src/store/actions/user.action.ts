import { SET_FULL_NAME, CLEAR_USER } from '../types';
import { IUserData } from '../reducers/user.reducer';
import { Action } from 'redux';

// Types

export type saveUserFullNameAction = {
  type: typeof SET_FULL_NAME;
  data: Pick<IUserData, 'name' | 'img'>;
};

export const saveUserFullName = (
  data: Pick<IUserData, 'name' | 'img'>
): saveUserFullNameAction => ({
  type: SET_FULL_NAME,
  data,
});

export const clearUser = (): Action<typeof CLEAR_USER> => ({
  type: CLEAR_USER,
});
