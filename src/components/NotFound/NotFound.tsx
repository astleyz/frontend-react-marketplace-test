import React, { FC } from 'react';
import styles from './NotFound.module.scss';

const NotFound: FC<{ code?: number; text?: string }> = ({ code = 404, text = 'Not Found' }) => {
  return (
    <div className={styles.box}>
      <div className={styles.messageBox}>
        <h1>{code}</h1>
        <p>{text}</p>
      </div>
      {code === 404 ? (
        <img src="https://pm2.io/assets/travolta.gif" className={styles.travolta} alt="" />
      ) : null}
    </div>
  );
};

export default NotFound;
