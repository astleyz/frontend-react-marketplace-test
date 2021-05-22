import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import VideocamIcon from '@material-ui/icons/Videocam';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import styles from './LessonPage.module.scss';
import CommentCard from '../components/Comments/CommentCard';
import CommentInput from '../components/Comments/CommentInput';
import { fetchLesson, clearLesson, resetRequestSpinner } from '../store/actions';
import { getLesson, getSpinneredError } from '../store/selectors';
import { Skeleton } from '@material-ui/lab';

const LessonPage: FC<RouteComponentProps> = ({ location }) => {
  const sectionNum = location.search.match(/(?<=section=)\d+/g);
  const lessonNum = location.search.match(/(?<=lesson=)\d+/g);

  const dispatch = useDispatch();
  const lesson = useSelector(getLesson);
  const spinneredError = useSelector(getSpinneredError);

  useEffect(() => {
    const path = `${location.pathname.split(/^\/courses\//g)[1]}${location.search}`;
    dispatch(fetchLesson(path));
    return () => {
      dispatch(clearLesson());
    };
  }, [location.pathname, location.search, dispatch]);

  useEffect(() => {
    if (spinneredError) throw spinneredError;
    return () => {
      dispatch(resetRequestSpinner());
    };
  }, [dispatch, spinneredError]);

  if (!lesson)
    return (
      <>
        <Header />
        <div className="container" style={{ marginTop: '1.2rem' }}>
          <Breadcrumbs />
        </div>
        <div className={styles.main}>
          <div className={cx('container', styles.container)}>
            <Skeleton className={styles.label} animation="wave" width="30%" />
            <Skeleton className={styles.title} animation="wave" width="80%" />
            <Skeleton className={styles.section} animation="wave" width="50%" />
            <Skeleton className={styles.lesson} animation="wave" width="40%" />
          </div>
          <Skeleton
            className={styles.videozone}
            animation="wave"
            variant="rect"
            width={560}
            height={315}
          />
        </div>
      </>
    );

  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: '1.2rem' }}>
        <Breadcrumbs />
      </div>
      <div className={styles.main}>
        <div className={cx('container', styles.container)}>
          <span className={styles.label}>Предпросмотр курса</span>
          <h2 className={styles.title}>{lesson.courseName}</h2>
          <p className={styles.section}>
            Раздел #{sectionNum && sectionNum[0]} {lesson.sectionName}
          </p>
          <p className={styles.lesson}>
            Урок {lessonNum && lessonNum[0]}. {lesson.lessonName}
          </p>
        </div>

        <div className={styles.videozone}>
          <div className={styles.img}>
            <VideocamIcon />
            <h1>
              <span>Now video is not available</span>
            </h1>
          </div>
        </div>
        <div className="container" style={{ marginTop: '3rem' }}>
          <h1 style={{ fontSize: '19px', marginBottom: '30px' }}>
            Комментарии {lesson.comments.length}
          </h1>
          <CommentInput />
          {lesson.comments
            .concat()
            .reverse()
            .map((comment, i) => (
              <CommentCard key={`${comment.ownerId.login}${i}`} comment={comment} />
            ))}
        </div>
      </div>
    </>
  );
};

export default LessonPage;
