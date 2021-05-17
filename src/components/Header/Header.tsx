import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styles from './Header.module.scss';
import Authorization from '../Auth/Authorization';
import Registration from '../Auth/Registration';
import useAuth from '../../hooks/useAuth';
import useHttp from '../../hooks/useHttp';
import { api } from '../../api';
import { getUserAccountData } from '../../store/selectors';
import { IUserData } from '../../store/reducers/user.reducer';
import { saveUserFullName, clearToken } from '../../store/actions';
import Search from '../Search/Search';

const Header: FC = () => {
  const { isAuthenticated, dispatch } = useAuth();
  const { request, loading, data } = useHttp<Pick<IUserData, 'name' | 'img'>>();
  const user: Partial<IUserData> | null = useSelector(getUserAccountData);

  useEffect(() => {
    if (isAuthenticated && !loading && !user) {
      request(api.user.getFullName);
    }
  }, [request, isAuthenticated, user, loading]);

  useEffect(() => {
    if (data) dispatch(saveUserFullName(data));
  }, [dispatch, data]);

  const [isAuthOpen, setAuthOpen] = React.useState(false);
  const [isRegisterOpen, setRegisterOpen] = React.useState(false);
  const [isImgLoaded, setImgLoaded] = React.useState(false);

  const handleAuthOpen = () => setAuthOpen(true);
  const handleAuthClose = () => setAuthOpen(false);
  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => setRegisterOpen(false);
  const handleLogout = async () => {
    try {
      await api.auth.logout();
      await new Promise(r => setTimeout(() => r(null), 200));
      dispatch(clearToken());
    } catch (e) {
      if (e && e.response && e.response.status && e.response.status === 401) {
        await new Promise(r => setTimeout(() => r(null), 200));
        dispatch(clearToken());
      }
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
          {isAuthenticated && user ? (
            <ul className="right" style={{ display: 'flex' }}>
              <li className={styles.userBlock}>
                <div className={styles.imgBox}>
                  {!isImgLoaded ? user?.name?.charAt(0) : ''}
                  <img
                    src={user.img}
                    onError={(e: any) => (e.target.style.display = 'none')}
                    onLoad={() => setImgLoaded(true)}
                  />
                </div>
                <div className={styles.name}>{user.name}</div>
              </li>
              <li className={styles.exit}>
                <a onClick={handleLogout}>
                  <ExitToAppIcon /> <span className={styles.exitText}>Выйти</span>
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
