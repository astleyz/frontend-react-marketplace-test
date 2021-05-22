import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AddAPhoto, ExitToApp } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import styles from './Header.module.scss';
import Authorization from '../Auth/Authorization';
import Registration from '../Auth/Registration';
import Search from '../Search/Search';
import EditName from './EditName';
import useHttp from '../../hooks/useHttp';
import { api } from '../../api';
import { getAuthStatus, getUserAccountData } from '../../store/selectors';
import { IUserData } from '../../store/reducers/user.reducer';
import { saveUserFullName, clearUser, clearToken, setSnackbar } from '../../store/actions';

const useStyles = makeStyles(() => ({
  tooltip: {
    fontSize: '11px',
    marginTop: '5px',
  },
}));

const Header: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthorized: boolean = useSelector(getAuthStatus);
  const user: IUserData | null = useSelector(getUserAccountData);
  const { request, loading, data } = useHttp<Pick<IUserData, 'name' | 'img'>>();

  useEffect(() => {
    if (isAuthorized && !loading && !user) {
      request(api.user.getFullName);
    }
  }, [request, isAuthorized, user, loading]);

  useEffect(() => {
    if (data) {
      dispatch(saveUserFullName(data));
    }
  }, [dispatch, data]);

  const [isNameEditing, setNameEditing] = useState(false);
  const [isAuthOpen, setAuthOpen] = useState(false);
  const [isRegisterOpen, setRegisterOpen] = useState(false);
  const [isImgLoaded, setImgLoaded] = useState(false);
  const [isAvatarHovered, setAvatarHovered] = useState(false);

  const handleChangeName = () => setNameEditing(prev => !prev);
  const handleAuthOpen = () => setAuthOpen(true);
  const handleAuthClose = () => setAuthOpen(false);
  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => setRegisterOpen(false);
  const handleLogout = async () => {
    try {
      await api.auth.logout();
      await new Promise(r => setTimeout(() => r(null), 200));
      dispatch(clearToken());
      setImgLoaded(false);
    } catch (e) {
      if (e && e.response && e.response.status && e.response.status === 401) {
        await new Promise(r => setTimeout(() => r(null), 200));
        dispatch(clearToken());
      }
    }
  };
  const handleAvatar = async (evt: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const data = new FormData();
      data.append('avatar', evt.target.files![0]);
      await api.user.changeAvatar(data);
      dispatch(clearUser());
    } catch (e) {
      const errText = e.response?.data?.message || e.message || 'Ошибка. Попробуйте еще раз';
      dispatch(setSnackbar(true, 'error', errText));
    }
  };

  return (
    <header className="header">
      <nav className="teal lighten-2">
        <div className={cx('nav-wrapper', styles.navWrapper)}>
          <div className={styles.logo}>
            <Link to="/">DeMovie</Link>
          </div>
          <Search />
          {isAuthorized && user ? (
            <ul className="right" style={{ display: 'flex' }}>
              <li className={styles.userBlock}>
                <div
                  className={styles.imgBox}
                  onMouseEnter={() => setAvatarHovered(true)}
                  onMouseLeave={() => setAvatarHovered(false)}
                >
                  {!isImgLoaded && !isAvatarHovered ? user?.name?.charAt(0).toUpperCase() : ''}
                  <img
                    src={user.img}
                    onError={(e: any) => (e.target.style.display = 'none')}
                    onLoad={() => setImgLoaded(true)}
                  />
                  <label htmlFor="avatar" className={styles.upload}>
                    <AddAPhoto fontSize="large" />
                  </label>
                  <input type="file" id="avatar" name="avatar" onChange={handleAvatar} />
                </div>
                <Tooltip
                  title="Нажми чтобы изменить имя"
                  TransitionComponent={Zoom}
                  arrow
                  classes={{ tooltip: classes.tooltip }}
                >
                  <div className={styles.name} onClick={handleChangeName}>
                    {user.name}
                  </div>
                </Tooltip>
                <EditName user={user} isOpen={isNameEditing} onClose={handleChangeName} />
              </li>
              <li className={styles.exit}>
                <a onClick={handleLogout}>
                  <ExitToApp /> <span className={styles.exitText}>Выйти</span>
                </a>
              </li>
            </ul>
          ) : (
            <>
              <ul className="right">
                <li>
                  <a onClick={handleAuthOpen}>Войти</a>
                </li>
                <li>
                  <a onClick={handleRegisterOpen}>Регистрация</a>
                </li>
              </ul>
            </>
          )}
          <Authorization isOpen={isAuthOpen} onClose={handleAuthClose} dispatch={dispatch} />
          <Registration isOpen={isRegisterOpen} onClose={handleRegisterClose} dispatch={dispatch} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
