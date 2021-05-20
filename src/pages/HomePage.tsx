import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import Footer from '../components/Footer/Footer';
import Card from '../components/Card/Card';
import { getFetchedCourses } from '../store/selectors';
import { ILightCourse } from '../interfaces/course';
import { fetchAllCourses, clearFetchedCourses } from '../store/actions';
import { Skeleton } from '@material-ui/lab';

const HomePage: FC = () => {
  const dispatch = useDispatch();
  const lightCourses = useSelector(getFetchedCourses);

  useEffect(() => {
    dispatch(fetchAllCourses());
    return () => {
      dispatch(clearFetchedCourses());
    };
  }, [dispatch]);

  return (
    <div style={{ minHeight: '100%', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
      <Header />
      <div className="container" style={{ marginTop: '2rem' }}>
        <Breadcrumbs />
        {!lightCourses.length
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
          : lightCourses.map((course: ILightCourse) => <Card key={course.title} course={course} />)}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
