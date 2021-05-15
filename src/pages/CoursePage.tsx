import React, { FC } from 'react';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import styles from './CoursePage.module.scss';
import Exercises from '../components/Exercises/Exercises';

const CoursePage: FC = () => {
  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: '1.2rem' }}>
        <Breadcrumbs />
      </div>
      <div className={styles.topCard}>
        <div className={styles.content}>
          <h2 className={styles.title}>Golang для начинающих. Подробные уроки</h2>
          <p className={styles.description}>
            Простыми словами, разберем как работать на языке программирования Go. Его особенности и
            тонкости.
          </p>
          <span className={styles.author}>Alex Marshal</span>
          <span className={styles.length}>Всего 5,5 ч. 24 уроков</span>
        </div>
        <div className={styles.cardBox}>
          <img
            className={styles.img}
            src="https://www.dreamhost.com/blog/wp-content/uploads/2017/10/online_course-750x375.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="container" style={{ marginTop: '5rem' }}>
        <Exercises />
      </div>
    </>
  );
};

export default CoursePage;
