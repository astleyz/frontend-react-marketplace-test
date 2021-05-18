import { Reducer } from 'redux';
import { REMOVE_COURSE, EDIT_COURSE, RESET_COURSE, SAVE_COURSES } from '../types';
import { CourseActionTypes } from '../../interfaces/actions';
import { ICourse } from '../../interfaces/course';

type CourseState = {
  id: string;
  course: Partial<ICourse>;
  fetchedCourses: ICourse[];
};

const initialState: CourseState = {
  id: '',
  course: {},
  fetchedCourses: [],
};

export const courseReducer: Reducer<CourseState, CourseActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case REMOVE_COURSE:
      return { ...state, id: action.id };
    case EDIT_COURSE:
      return { ...state, course: action.course };
    case SAVE_COURSES:
      return { ...state, fetchedCourses: action.payload };
    case RESET_COURSE:
      return { ...initialState };

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
