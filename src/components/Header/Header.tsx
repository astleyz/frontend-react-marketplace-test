import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tooltip, Zoom, Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Form, Formik, Field } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import styles from './Header.module.scss';
import Authorization from '../Auth/Authorization';
import Registration from '../Auth/Registration';
import useHttp from '../../hooks/useHttp';
import { api } from '../../api';
import { getAuthStatus, getUserAccountData } from '../../store/selectors';
import { IUserData } from '../../store/reducers/user.reducer';
import { saveUserFullName, clearToken, setSnackbar } from '../../store/actions';
import Search from '../Search/Search';

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
          {isAuthorized && user ? (
            <ul className="right" style={{ display: 'flex' }}>
              <li className={styles.userBlock}>
                <div className={styles.imgBox}>
                  {!isImgLoaded ? user?.name?.charAt(0).toUpperCase() : ''}
                  <img
                    src={user.img}
                    onError={(e: any) => (e.target.style.display = 'none')}
                    onLoad={() => setImgLoaded(true)}
                  />
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

type EditNameProps = {
  user: IUserData;
  isOpen: boolean;
  onClose: () => void;
};

const EditName: FC<EditNameProps> = ({ user, isOpen, onClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { request, data, dispatch, error } = useHttp<Pick<IUserData, 'name' | 'img'>>();

  const handleChangeName = (values: Pick<IUserData, 'name'>) => {
    request(() => api.user.changeFullName(values));
    onClose();
  };

  useEffect(() => {
    if (data) dispatch(saveUserFullName(data));
    if (error) dispatch(setSnackbar(true, 'error', 'Не удалось изменить имя'));
  }, [dispatch, data, error]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullScreen={fullScreen}>
      <Formik initialValues={{ name: user.name }} onSubmit={handleChangeName}>
        <Form>
          <DialogContent>
            <Field name="name" className="materialize-textarea" spellCheck="false" autoFocus />
          </DialogContent>
          <DialogActions className={styles.buttons}>
            <Button onClick={onClose} color="primary">
              Отмена
            </Button>
            <Button color="primary" type="submit">
              Сохранить
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default Header;
