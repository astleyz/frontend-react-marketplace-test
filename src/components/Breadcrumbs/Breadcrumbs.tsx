import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import styles from './Breadcrumbs.module.scss';
import cx from 'classnames';

const BreadcrumbsComponent = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    console.info('You clicked a breadcrumb.');
  };

  return (
    <div className={styles.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        className={cx(styles.breadcrumbs)}
      >
        <Link color="inherit" href="/" onClick={handleClick}>
          Material-UI
        </Link>
        <Link color="inherit" href="/getting-started/installation/" onClick={handleClick}>
          Core
        </Link>
        <Typography color="textPrimary">Breadcrumb</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadcrumbsComponent;
