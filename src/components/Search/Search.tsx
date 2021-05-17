import React, { FC, useState, ChangeEvent } from 'react';
import cx from 'classnames';
import { Tooltip, InputBase, IconButton, Zoom } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Search.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getAuthStatus } from '../../store/selectors';
import Loader from '../Loader/Loader';
import { addCourse } from '../../store/actions';

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const Search: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthorized = useSelector(getAuthStatus);
  const isLoading = useSelector(() => true);
  const [inputState, setInputState] = useState('');
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };
  const handleAddCourse = () => {
    dispatch(addCourse(inputState));
    setInputState('');
  };

  return (
    <div className={styles.searchBox}>
      {isAuthorized ? (
        <Tooltip
          classes={{ tooltip: styles.tooltip }}
          arrow
          TransitionComponent={Zoom}
          title="Вставьте ссылку на любой курс с Udemy"
        >
          <InputBase
            className={cx(classes.input, styles.input)}
            value={inputState}
            onChange={handleInputChange}
          />
        </Tooltip>
      ) : (
        <InputBase className={cx(classes.input, styles.input)} />
      )}

      <IconButton classes={{ root: styles.searchButton }}>
        {isAuthorized ? (
          <CheckCircleOutlineIcon fontSize="large" color="primary" onClick={handleAddCourse} />
        ) : (
          <SearchIcon />
        )}
      </IconButton>
      {isLoading ? <Loader /> : null}
    </div>
  );
};

export default Search;
