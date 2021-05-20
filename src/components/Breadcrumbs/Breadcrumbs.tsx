import { FC } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Breadcrumbs, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styles from './Breadcrumbs.module.scss';
import { getFullCourse } from '../../store/selectors';

const BreadcrumbsComponent: FC = () => {
  const course = useSelector(getFullCourse);
  const match = useRouteMatch();
  const path = match.url.split('/');

  const OneItem = () => {
    if (path.length === 2) document.title = 'Demovie | Курсы';
    return (
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className={styles.breadcrumbs}>
        <Typography color="textPrimary">Курсы</Typography>
      </Breadcrumbs>
    );
  };

  const TwoItems = () => {
    const name = course ? course.title.split(' ') : null;
    if (path.length > 2 && name) document.title = `Demovie | ${name.join(' ')}`;
    if (!name) return null;
    return (
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} className={styles.breadcrumbs}>
        <Link to="/">Курсы</Link>
        <Typography color="textPrimary">{name.slice(0, 3).join(' ')} ...</Typography>
      </Breadcrumbs>
    );
  };
  return (
    <div className={styles.root}>
      {path.length === 2 ? <OneItem /> : null}
      {path.length === 3 ? <TwoItems /> : null}
    </div>
  );
};

export default BreadcrumbsComponent;
