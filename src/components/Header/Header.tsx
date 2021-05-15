import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import cx from 'classnames';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Header: FC = () => {
  const classes = useStyles();

  return (
    <header className="header">
      <nav className="teal lighten-2">
        <div className={cx('nav-wrapper', styles.navWrapper)}>
          <div className={styles.logo}>
            <Link to="/">DeMovie</Link>
          </div>
          <div className={styles.searchBox}>
            <InputBase className={cx(classes.input, styles.input)} />
            <IconButton className={classes.iconButton} classes={{ root: styles.searchButton }}>
              <SearchIcon />
            </IconButton>
          </div>
          <ul className="right">
            <li>
              <a href="badges.html">Войти</a>
            </li>
            <li>
              <a href="collapsible.html">Регистрация</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
