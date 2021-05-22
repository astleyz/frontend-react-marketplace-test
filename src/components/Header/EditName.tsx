import React, { FC, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { Form, Formik, Field } from 'formik';
import styles from './Header.module.scss';
import useHttp from '../../hooks/useHttp';
import { api } from '../../api';
import { IUserData } from '../../store/reducers/user.reducer';
import { saveUserFullName, setSnackbar } from '../../store/actions';

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

export default EditName;
