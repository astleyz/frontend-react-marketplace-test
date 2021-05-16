import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { Snackbar, Slide } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { setSnackbar } from '../../store/actions';
import * as selectors from '../../store/selectors';
import { snackbarValue } from '../../interfaces/snackbar';

const useStyles = makeStyles(theme => ({
  root: {
    'width': '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomizedSnackbar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const snackbarOpen: boolean = useSelector(selectors.getSnackbarOpen);
  const snackbarType: snackbarValue<'snackbarType'> = useSelector(selectors.getSnackbarType);
  const snackbarMessage: string = useSelector(selectors.getSnackbarMessage);
  const snackbarTime: number = useSelector(selectors.getSnackbarTime);

  const handleClose = (_: React.SyntheticEvent<Element, Event>, reason?: string): void => {
    if (reason === 'clickaway') return;
    dispatch(setSnackbar(false, snackbarType, snackbarMessage));
  };

  const SlideTransition = (props: any) => <Slide {...props} direction="up" />;

  return (
    <div className={classes.root}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={snackbarTime}
        onClose={handleClose}
        TransitionComponent={SlideTransition}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} color={snackbarType}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default CustomizedSnackbar;
