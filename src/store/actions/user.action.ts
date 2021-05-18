import { SET_FULL_NAME } from '../types';
import { IUserData } from '../reducers/user.reducer';

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
