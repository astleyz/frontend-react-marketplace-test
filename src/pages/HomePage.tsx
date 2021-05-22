import React, { FC, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';
import Card from '../components/Card/Card';
import { getFetchedCourses, getFullCoursesCount } from '../store/selectors';
import { ILightCourse } from '../interfaces/course';
import { fetchAllCourses, clearFetchedCourses } from '../store/actions';
import { Skeleton, Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    minHeight: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
  },
  pagination: {
    'marginTop': '4rem',
    'display': 'flex',
    'justifyContent': 'center',
    'backgroundColor': 'white',
    'boxShadow': 'none',
    '& button': {
      fontSize: '16px',
    },
    '& button:focus': {
      backgroundColor: 'white',
    },
    '& button:selected': {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  },
}));

const HomePage: FC<RouteComponentProps> = ({ history, location }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const lightCourses = useSelector(getFetchedCourses);
  const fullCount = useSelector(getFullCoursesCount);

  const offset = new URLSearchParams(location.search).get('offset');
  const handlePagination = (_: React.ChangeEvent<any>, page: number) => {
    history.push(`/courses?offset=${(page - 1) * 10}`);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    dispatch(fetchAllCourses(location.search));
    return () => {
      dispatch(clearFetchedCourses());
    };
  }, [dispatch, location]);

  return (
    <div className={classes.root}>
      <Header />
      <div className="container" style={{ marginTop: '2rem' }}>
        <Breadcrumbs />
        {!lightCourses
          ? new Array(3)
              .fill('')
              .map((_, i) => (
                <Skeleton
                  key={i}
                  variant="rect"
                  width="100%"
                  height={175}
                  style={{ marginBottom: '35px' }}
                  animation="wave"
                />
              ))
          : null}
        {lightCourses && !lightCourses.length ? (
          <Container
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '20px',
              marginTop: '55px',
            }}
          >
            Курсов пока нет
          </Container>
        ) : null}
        {lightCourses && lightCourses.length ? (
          <>
            {lightCourses.map((course: ILightCourse) => (
              <Card key={course.title} course={course} />
            ))}
            <Pagination
              className={classes.pagination}
              count={Math.ceil(fullCount / 10)}
              shape="rounded"
              onChange={handlePagination}
              page={offset ? Number(offset) / 10 + 1 : 1}
            />
          </>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
