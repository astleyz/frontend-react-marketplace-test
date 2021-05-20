import React, { FC } from 'react';
import { Avatar, Grid, Paper } from '@material-ui/core';
import styles from './CommentCard.module.scss';
import { IComment } from '../../interfaces/course';

const CommentCard: FC<{ comment: IComment }> = ({ comment }) => {
  return (
    <Paper className={styles.paper}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          <Avatar src={comment.ownerId.img} />
        </Grid>
        <Grid item xs zeroMinWidth className={styles.grid}>
          <h4>{comment.ownerId.login}</h4>
          <p>{comment.content}</p>
          <p>
            posted {new Date(comment.date).toLocaleDateString()}{' '}
            {new Date(comment.date).toLocaleTimeString()}
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CommentCard;
