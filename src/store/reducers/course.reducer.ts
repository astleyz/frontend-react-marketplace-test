import { Reducer } from 'redux';
import { REMOVE_ONE_COURSE, RESET_FETCHED_COURSES, SAVE_COURSES, SAVE_ONE_COURSE } from '../types';
import { CourseActionTypes } from '../../interfaces/actions';
import { ILightCourse, IFullCourse } from '../../interfaces/course';

type CourseState = {
  course: IFullCourse | null;
  fetchedCourses: ILightCourse[];
};

const initialState: CourseState = {
  course: null,
  fetchedCourses: [],
};

export const courseReducer: Reducer<CourseState, CourseActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SAVE_ONE_COURSE:
      return { ...state, course: action.payload };
    case REMOVE_ONE_COURSE:
      return { ...state, course: null };
    case SAVE_COURSES:
      return { ...state, fetchedCourses: action.payload };
    case RESET_FETCHED_COURSES:
      return { ...state, fetchedCourses: [] };

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
