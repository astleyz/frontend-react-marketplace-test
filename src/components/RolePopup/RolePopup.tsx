import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
import { Form, Formik, Field } from 'formik';
import styles from './RolePopup.module.scss';
import { editCourse, setSnackbar } from '../../store/actions';

type RolePopupProps = {
  isOpen: boolean;
  onClose: () => void;
  courseId: string;
};

const RolePopup: FC<RolePopupProps> = ({ isOpen, onClose, courseId }) => {
  const [isChecked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const toggleCheck = () => {
    setChecked(prev => !prev);
  };

  const handleSubmit = (values: { role: string }) => {
    if (!isChecked) return onClose();
    dispatch(editCourse({ id: courseId, private: isChecked, accessedUser: values.role }));
    dispatch(setSnackbar(true, 'success', 'Теперь уроки стали приватными!'));
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Formik initialValues={{ role: '' }} onSubmit={handleSubmit}>
        <Form>
          <DialogContent className={styles.box}>
            <input
              type="checkbox"
              id="checkbox"
              className={styles.checkbox}
              checked={isChecked}
              onChange={toggleCheck}
            />
            <label htmlFor="checkbox" className={styles.toggle}>
              <span></span>
            </label>
          </DialogContent>

          <DialogContent>
            <DialogContentText>
              Делая приватными уроки курса, сам курс будет публичным, но доступ к урокам приватным.
              <br />
              <br />
              Вы можете указать ниже логин другого пользователя, если хотите кому-то дать доступ к
              урокам этого курса. В противном случае доступ будет только у вас.
            </DialogContentText>
            <Field name="role" spellCheck="false" />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Отмена
            </Button>
            <Button type="submit" color="primary">
              Применить
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default RolePopup;
