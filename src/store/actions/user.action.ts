import { SET_USER_DATA, SET_FULL_NAME } from '../types';
import { IUserData } from '../reducers/user.reducer';

// Types
export type saveUserFetchedDataAction = {
  type: typeof SET_USER_DATA;
  user: IUserData;
};

export type saveUserFullNameAction = {
  type: typeof SET_FULL_NAME;
  data: Pick<IUserData, 'name' | 'img'>;
};

// Actions
export const saveUserFetchedData = (user: IUserData): saveUserFetchedDataAction => ({
  type: SET_USER_DATA,
  user,
});

export const saveUserFullName = (
  data: Pick<IUserData, 'name' | 'img'>
): saveUserFullNameAction => ({
  type: SET_FULL_NAME,
  data,
});
