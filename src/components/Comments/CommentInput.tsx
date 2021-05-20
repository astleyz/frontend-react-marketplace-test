import React, { FC, useState, useEffect, ChangeEvent } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { Avatar, Grid, Paper, TextareaAutosize, Button } from '@material-ui/core';
import styles from './CommentCard.module.scss';
import { getUserAccountData } from '../../store/selectors';
import useHttp from '../../hooks/useHttp';
import { api } from '../../api';
import { setLesson, clearLesson } from '../../store/actions';
import { ILesson } from '../../interfaces/course';

const CommentInput: FC = () => {
  const user = useSelector(getUserAccountData)!;
  const location = useLocation();
  const [value, setValue] = useState('');
  const { request, data, dispatch } = useHttp<ILesson>();
  const handleWriteComment = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    if (data) {
      dispatch(setLesson(data));
    }

    return () => {
      dispatch(clearLesson());
    };
  }, [dispatch, data]);

  const handleSend = async () => {
    if (!value.length) return;
    try {
      const path = `${location.pathname.split(/^\/courses\//g)[1]}${location.search}`;
      await api.lesson.sendComment(path, value);
      setValue('');
      request(() => api.lesson.getLesson(path));
    } catch (e) {}
  };

  return (
    <Paper className={styles.paper} style={{ padding: '0 20px' }}>
      <Grid container wrap="nowrap" spacing={3} style={{ marginTop: '5px' }}>
        <Grid item>
          <Avatar className={styles.avatarInput} variant="rounded" src={user.img}>
            {user.name!.charAt(0).toUpperCase()}
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
