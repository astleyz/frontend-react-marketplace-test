import { RecursivePartial } from './universal';

export type ILightCourse = {
  fullLength: string;
} & Pick<IFullCourse, 'id' | 'title' | 'subTitle' | 'img' | 'authorNames'>;

export type PageType = {
  courses: ILightCourse[];
  count: number;
};

export interface IFullCourse {
  readonly id: string;
  readonly ownerId: {
    readonly login: string;
  };
  title: string;
  subTitle: string;
  img: string;
  authors: string;
  authorNames: string[];
  whatWillYouLearn: {
    title: string;
    items: string[];
  };
  requirements: {
    title: string;
    items: string[];
  };
  description: {
    title: string;
    html: string;
  };
  forWho: {
    title: string;
    items: string[];
  };
  materials: {
    title: string;
    info: string;
    sections: [
      {
        title: string;
        fullLength: string;
        lessons: [
          {
            name: string;
            length: string;
          }
        ];
      }
    ];
  };
  instructor: {
    title: string;
    names: string[];
    jobs: string[];
    coursesQuantity: string;
    aboutme: string;
  };
}

export interface ILesson {
  courseName: string;
  sectionName: string;
  lessonName: string;
  comments: IComment[];
}

export type IComment = {
  ownerId: {
    login: string;
    img: string;
  };
  date: string;
  content: string;
};

export type PartialFullCourse = { id: string } & RecursivePartial<IFullCourse>;
export type EditValues =
  | PartialFullCourse
  | ({ id: string } & { private: boolean; accessedUser: string });
