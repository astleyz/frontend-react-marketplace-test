import {
  ADD_COURSE,
  REMOVE_ONE_COURSE,
  EDIT_ONE_COURSE,
  RESET_FETCHED_COURSES,
  SAVE_COURSES,
  FETCH_COURSES,
  FETCH_ONE_COURSE,
  SAVE_ONE_COURSE,
} from '../types';
import { ILightCourse, IFullCourse, PartialFullCourse } from '../../interfaces/course';
import { Action } from 'redux';

// Types
export type addCourseAction = {
  type: typeof ADD_COURSE;
  link: string;
  callback?: () => void;
};

export type saveCourseAction = {
  type: typeof SAVE_ONE_COURSE;
  payload: IFullCourse;
};

export type fetchCourseAction = {
  type: typeof FETCH_ONE_COURSE;
  id: string;
};

export type editCourseAction = {
  type: typeof EDIT_ONE_COURSE;
  course: PartialFullCourse;
};

export type saveCoursesAction = {
  type: typeof SAVE_COURSES;
  payload: ILightCourse[];
};

// Actions
export const addCourse = (link: string, callback?: () => void): addCourseAction => ({
  type: ADD_COURSE,
  link,
  callback,
});

export const fetchAllCourses = (): Action<typeof FETCH_COURSES> => ({
  type: FETCH_COURSES,
});

export const fetchCourse = (id: string): Action<typeof FETCH_ONE_COURSE> & { id: string } => ({
  type: FETCH_ONE_COURSE,
  id,
});

export const saveCourse = (payload: IFullCourse): saveCourseAction => ({
  type: SAVE_ONE_COURSE,
  payload,
});

export const editCourse = (course: PartialFullCourse): editCourseAction => ({
  type: EDIT_ONE_COURSE,
  course,
});

export const removeCourse = (): Action<typeof REMOVE_ONE_COURSE> => ({
  type: REMOVE_ONE_COURSE,
});

export const saveAllCourses = (payload: ILightCourse[]): saveCoursesAction => ({
  type: SAVE_COURSES,
  payload,
});

export const resetFetchedCourses = (): Action<typeof RESET_FETCHED_COURSES> => ({
  type: RESET_FETCHED_COURSES,
});
