import {
  ADD_COURSE,
  CLEAR_ONE_COURSE,
  EDIT_ONE_COURSE,
  CLEAR_FETCHED_COURSES,
  SAVE_COURSES,
  FETCH_COURSES,
  FETCH_ONE_COURSE,
  SAVE_ONE_COURSE,
  REMOVE_ONE_COURSE,
  SET_LESSON,
  CLEAR_LESSON,
} from '../types';
import { ILightCourse, IFullCourse, PartialFullCourse, ILesson } from '../../interfaces/course';
import { Action } from 'redux';
import { History } from 'history';

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

export type removeCourseAction = {
  type: typeof REMOVE_ONE_COURSE;
  id: string;
  history: History;
};

export type saveCoursesAction = {
  type: typeof SAVE_COURSES;
  payload: ILightCourse[];
};

export type setLessonAction = {
  type: typeof SET_LESSON;
  lesson: ILesson;
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

export const clearCourseInStore = (): Action<typeof CLEAR_ONE_COURSE> => ({
  type: CLEAR_ONE_COURSE,
});

export const removeCourse = (id: string, history: History): removeCourseAction => ({
  type: REMOVE_ONE_COURSE,
  id,
  history,
});

export const saveAllCourses = (payload: ILightCourse[]): saveCoursesAction => ({
  type: SAVE_COURSES,
  payload,
});

export const clearFetchedCourses = (): Action<typeof CLEAR_FETCHED_COURSES> => ({
  type: CLEAR_FETCHED_COURSES,
});

export const setLesson = (lesson: ILesson): setLessonAction => ({
  type: SET_LESSON,
  lesson,
});

export const clearLesson = (): Action<typeof CLEAR_LESSON> => ({
  type: CLEAR_LESSON,
});
