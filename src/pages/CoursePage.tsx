import { FC, useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Icon, Button } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import LockIcon from '@material-ui/icons/Lock';
import { Form, Formik, Field } from 'formik';
import cx from 'classnames';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import styles from './CoursePage.module.scss';
import Exercises from '../components/Exercises/Exercises';
import * as action from '../store/actions';
import {
  getFullCourse,
  getAuthStatus,
  getUserAccountData,
  getSpinneredError,
} from '../store/selectors';
import Footer from '../components/Footer/Footer';
import RolePopup from '../components/RolePopup/RolePopup';

interface CoursePageProps extends RouteComponentProps {
  match: RouteComponentProps['match'] & {
    params: { id: string };
  };
}

type InstructorInputs = {
  names: string;
  jobs: string;
};

const CoursePage: FC<CoursePageProps> = ({ match, history }) => {
  const dispatch = useDispatch();
  const { id } = match.params;

  const course = useSelector(getFullCourse);
  const spinneredError = useSelector(getSpinneredError);
  const isAuthorized = useSelector(getAuthStatus);
  const user = useSelector(getUserAccountData);
  const [isEditing, setEditing] = useState(false);
  const [makingPrivate, setPrivate] = useState(false);

  const handleSetPrivate = () => {
    setPrivate(prev => !prev);
  };

  const instructorHandleSumbit = (values: InstructorInputs) => {
    const instructor = { names: values.names.split(','), jobs: values.jobs.split(',') };
    if (course) dispatch(action.editCourse({ id: course.id, instructor }));
    setEditing(false);
  };

  const handleDeleteCourse = () => {
    dispatch(action.removeCourse(id, () => history.push('/')));
  };

  useEffect(() => {
    dispatch(action.fetchCourse(id));
    return () => {
      dispatch(action.clearCourseInStore());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (spinneredError) throw spinneredError;
    return () => {
      dispatch(action.resetRequestSpinner());
    };
  }, [spinneredError, dispatch]);

  if (!course)
    return (
      <>
        <Header />
        <div className="container" style={{ marginTop: '1.2rem' }}>
          <Breadcrumbs />
        </div>
        <Skeleton variant="rect" height={200} style={{ marginTop: '50px' }} />;
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <Skeleton variant="rect" width={700} height={257} />
        </div>
      </>
    );
  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: '1.2rem' }}>
        <Breadcrumbs />
      </div>
      <div className={styles.topCard}>
        <div className={styles.content}>
          <h2 className={styles.title}>{course.title}</h2>
          <p className={styles.subTitle}>{course.subTitle}</p>
          <span className={styles.author}>{course.authorNames.join(', ')}</span>
          <span className={styles.length}>
            {`Всего ${course.materials.info.match(/(?<=ость\s).+/g)}` +
              `, ${course.materials.info.match(/(?<=•\s).+(?=\s•)/g)}`}
          </span>
        </div>
        <div className={styles.cardBox}>
          <img className={styles.img} src={course.img} alt="" />
        </div>
      </div>
      <Container classes={{ root: styles.whatWillYouLearn }}>
        <h2>{course.whatWillYouLearn.title}</h2>
        <ul>
          {course.whatWillYouLearn.items.map(item => (
            <li key={item}>
              <Icon className="fa fa-check" fontSize="small" />
              <div>{item}</div>
            </li>
          ))}
        </ul>
      </Container>
      <Container classes={{ root: styles.requirements }}>
        <h2>{course.requirements.title}</h2>
        <ul>
          {course.requirements.items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
      <Container classes={{ root: styles.description }}>
        <h2>{course.description.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: course.description.html }} />
      </Container>
      <Container classes={{ root: styles.forWho }}>
        <h2>{course.forWho.title}</h2>
        <ul>
          {course.forWho.items.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>
      <div className="container" style={{ marginTop: '3rem' }}>
        <Exercises materials={course.materials} />
      </div>
      <Container classes={{ root: styles.instructor }}>
        <Formik
          initialValues={{
            names: course.instructor.names.join(', '),
            jobs: course.instructor.jobs.join(', '),
          }}
          onSubmit={instructorHandleSumbit}
        >
          <Form>
            <h2>{course.instructor.title}</h2>
            {isAuthorized && user?.name === course.ownerId.login ? (
              <>
                {!isEditing ? (
                  <span
                    className={cx('fas fa-edit', styles.edit)}
                    onClick={() => setEditing(true)}
                  />
                ) : (
                  <div className={styles.buttons}>
                    <Button variant="contained" color="primary" size="small" type="submit">
                      Сохранить
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => setEditing(false)}
                    >
                      Отмена
                    </Button>
                  </div>
                )}
              </>
            ) : null}

            {isEditing && isAuthorized && user?.name === course.ownerId.login ? (
              <>
                <Field name="names" className="materialize-textarea" autoFocus />
                <Field name="jobs" className="materialize-textarea" />
              </>
            ) : (
              <>
                <h3>{course.instructor.names.join(', ')}</h3>
                <div className={styles.jobs}>{course.instructor.jobs.join(', ')}</div>
              </>
            )}
          </Form>
        </Formik>
        <div className={styles.profile}>
          <div className={styles.imgBlock}>
            <p>{course.instructor.coursesQuantity}</p>
            <img src="https://img-a.udemycdn.com/user/75x75/35101150_6f0c_4.jpg" alt="" />
          </div>
          <div
            className={styles.aboutme}
            dangerouslySetInnerHTML={{ __html: course.instructor.aboutme }}
          />
        </div>
      </Container>
      {isAuthorized && user?.name === course.ownerId.login ? (
        <Container className={styles.controlButtons}>
          <Button
            variant="outlined"
            startIcon={<LockIcon />}
            size="large"
            onClick={handleSetPrivate}
          >
            Сделать уроки приватными
          </Button>
          <Button variant="outlined" color="secondary" size="large" onClick={handleDeleteCourse}>
            Удалить курс
          </Button>
        </Container>
      ) : null}
      <RolePopup isOpen={makingPrivate} onClose={handleSetPrivate} courseId={course.id} />

      <Footer />
    </>
  );
};

export default CoursePage;
