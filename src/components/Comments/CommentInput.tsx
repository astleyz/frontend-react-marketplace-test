import { FC, useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Grid, Paper, TextareaAutosize, Button } from '@material-ui/core';
import styles from './CommentCard.module.scss';
import { getUserAccountData } from '../../store/selectors';
import { api } from '../../api';
import { fetchLesson, setSnackbar } from '../../store/actions';

const CommentInput: FC = () => {
  const user = useSelector(getUserAccountData);
  const dispatch = useDispatch();
  const location = useLocation();
  const [value, setValue] = useState('');
  const handleWriteComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSend = async () => {
    if (!value.length) return;
    try {
      const path = `${location.pathname.split(/^\/courses\//g)[1]}${location.search}`;
      await api.lesson.sendComment(path, value);
      setValue('');
      dispatch(fetchLesson(path));
    } catch (e) {
      dispatch(setSnackbar(true, 'error', 'Не удалось отправить комментарий'));
    }
  };

  if (!user) throw new Error('Unauthorized');

  return (
    <Paper className={styles.paper} style={{ padding: '0 20px' }}>
      <Grid container wrap="nowrap" spacing={3} style={{ marginTop: '5px' }}>
        <Grid item>
          <Avatar className={styles.avatarInput} variant="rounded" src={user.img}>
            {user.name.charAt(0).toUpperCase()}
          </Avatar>
        </Grid>
        <Grid item xs zeroMinWidth className={styles.grid}>
          <TextareaAutosize
            className={styles.textarea}
            rowsMin={4}
            placeholder="Напишите комментарий..."
            value={value}
            onChange={handleWriteComment}
          />
        </Grid>
      </Grid>
      <Button className={styles.button} variant="contained" onClick={handleSend}>
        Отправить
      </Button>
    </Paper>
  );
};

export default CommentInput;
