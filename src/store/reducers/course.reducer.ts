import { Reducer } from 'redux';
import { ADD_COURSE, REMOVE_COURSE, EDIT_COURSE, RESET_COURSE, SAVE_COURSES } from '../types';
import { CourseActionTypes } from '../../interfaces/actions';
import { ICourse } from '../../interfaces/course';

type CourseState = {
  link: string;
  id: string;
  course: Partial<ICourse>;
  courses: ICourse[];
};

const initialState: CourseState = {
  link: '',
  id: '',
  course: {},
  courses: [],
};

export const courseReducer: Reducer<CourseState, CourseActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_COURSE:
      return { ...state, link: action.link };
    case REMOVE_COURSE:
      return { ...state, id: action.id };
    case EDIT_COURSE:
      return { ...state, course: action.course };
    case SAVE_COURSES:
      return { ...state, courses: action.payload };
    case RESET_COURSE:
      return { ...initialState };

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
