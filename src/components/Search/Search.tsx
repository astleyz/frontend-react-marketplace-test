import React, { FC } from 'react';
import cx from 'classnames';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import styles from './Search.module.scss';

const useStyles = makeStyles(theme => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

const Search: FC = () => {
  const classes = useStyles();
  return (
    <div className={styles.searchBox}>
      <InputBase className={cx(classes.input, styles.input)} />
      <IconButton className={classes.iconButton} classes={{ root: styles.searchButton }}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default Search;
