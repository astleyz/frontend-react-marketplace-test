import { Reducer } from 'redux';
import {
  CLEAR_ONE_COURSE,
  CLEAR_FETCHED_COURSES,
  SAVE_COURSES,
  SAVE_ONE_COURSE,
  SET_LESSON,
  CLEAR_LESSON,
} from '../types';
import { CourseActionTypes } from '../../interfaces/actions';
import { ILightCourse, IFullCourse, ILesson } from '../../interfaces/course';

type CourseState = {
  course: IFullCourse | null;
  lesson: ILesson | null;
  fetchedCourses: ILightCourse[];
};

const initialState: CourseState = {
  course: null,
  lesson: null,
  fetchedCourses: [],
};

export const courseReducer: Reducer<CourseState, CourseActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SAVE_ONE_COURSE:
      return { ...state, course: action.payload };
    case CLEAR_ONE_COURSE:
      return { ...state, course: null };
    case SAVE_COURSES:
      return { ...state, fetchedCourses: action.payload };
    case CLEAR_FETCHED_COURSES:
      return { ...state, fetchedCourses: [] };
    case SET_LESSON:
      return { ...state, lesson: action.lesson };
    case CLEAR_LESSON:
      return { ...state, lesson: null };

    default:
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const x: never = action;
  }
  return state;
};
