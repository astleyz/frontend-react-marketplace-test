import React, { FC, useState, ChangeEvent } from 'react';
import cx from 'classnames';
import { Tooltip, InputBase, IconButton, Zoom } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Search.module.scss';
import { getAuthStatus, getIsFetchingSpinner } from '../../store/selectors';
import Loader from '../Loader/Loader';
import { addCourse } from '../../store/actions';

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  tooltip: {
    fontSize: '11px',
  },
}));

const Search: FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthorized = useSelector(getAuthStatus);
  const isLoading = useSelector(getIsFetchingSpinner);
  const [inputState, setInputState] = useState('');
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  const handleAddCourse = (e: any) => {
    if ((e.type === 'keypress' && e.key === 'Enter') || e.type === 'click') {
      const cb = () => {
        setInputState('');
        e.target.blur();
        history.push('/');
      };
      dispatch(addCourse(inputState, cb));
    }
  };

  return (
    <div className={styles.searchBox}>
      {isAuthorized ? (
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          arrow
          TransitionComponent={Zoom}
          title="Вставьте ссылку на любой курс с Udemy"
        >
          <InputBase
            className={cx(classes.input, styles.input)}
            spellCheck="false"
            value={inputState}
            onChange={handleInputChange}
            onKeyPress={handleAddCourse}
          />
        </Tooltip>
      ) : (
        <InputBase className={cx(classes.input, styles.input)} spellCheck="false" />
      )}

      {isAuthorized ? (
        <IconButton classes={{ root: styles.searchButton }} onClick={handleAddCourse}>
          <CheckCircleOutlineIcon fontSize="large" color="primary" />
        </IconButton>
      ) : (
        <IconButton classes={{ root: styles.searchButton }}>
          <SearchIcon />
        </IconButton>
      )}
      {isLoading ? <Loader /> : null}
    </div>
  );
};

export default Search;
