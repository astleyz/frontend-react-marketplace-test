/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import cx from 'classnames';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import Authorization from '../Auth/Authorization';
import Registration from '../Auth/Registration';
import { useDispatch } from 'react-redux';

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
  const dispatch = useDispatch();

  const [isAuthOpen, setAuthOpen] = React.useState(false);
  const [isRegisterOpen, setRegisterOpen] = React.useState(false);

  const handleAuthOpen = () => setAuthOpen(true);
  const handleAuthClose = () => setAuthOpen(false);
  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => setRegisterOpen(false);

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
              <a onClick={handleAuthOpen}>Войти</a>
            </li>
            <li>
              <a onClick={handleRegisterOpen}>Регистрация</a>
            </li>
          </ul>
          <Authorization isOpen={isAuthOpen} onClose={handleAuthClose} dispatch={dispatch} />
          <Registration isOpen={isRegisterOpen} onClose={handleRegisterClose} dispatch={dispatch} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
