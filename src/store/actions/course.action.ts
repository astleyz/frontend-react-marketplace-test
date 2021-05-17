import { ADD_COURSE, REMOVE_COURSE, EDIT_COURSE, RESET_COURSE, SAVE_COURSES } from '../types';
import { ICourse } from '../../interfaces/course';
import { Action } from 'redux';

// Types
export type addCourseAction = {
  type: typeof ADD_COURSE;
  link: string;
};

export type removeCourseAction = {
  type: typeof REMOVE_COURSE;
  id: string;
};

export type editCourseAction = {
  type: typeof EDIT_COURSE;
  course: Partial<ICourse>;
};

export type saveCoursesAction = {
  type: typeof SAVE_COURSES;
  payload: ICourse[];
};

// Actions
export const addCourse = (link: string): addCourseAction => ({
  type: ADD_COURSE,
  link,
});

export const removeCourse = (id: string): removeCourseAction => ({
  type: REMOVE_COURSE,
  id,
});

export const editCourse = (course: Partial<ICourse>): editCourseAction => ({
  type: EDIT_COURSE,
  course,
});

export const saveAllCourses = (payload: ICourse[]): saveCoursesAction => ({
  type: SAVE_COURSES,
  payload,
});

export const resetCourse = (): Action<typeof RESET_COURSE> => ({ type: RESET_COURSE });
