import React, { FC } from 'react';
import { CircularProgress, Backdrop } from '@material-ui/core';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: 'pink',
  },
  loader: {
    color: 'gold',
  },
}));

const Loader: FC = () => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress classes={{ root: classes.loader }} />
    </Backdrop>
  );
};

export default Loader;
