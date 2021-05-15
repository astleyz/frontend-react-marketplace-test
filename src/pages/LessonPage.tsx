import React, { FC } from 'react';
import Header from '../components/Header/Header';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';
import styles from './LessonPage.module.scss';
import Comments from '../components/Comments/Comments';

const LessonPage: FC = () => {
  return (
    <>
      <Header />
      <div className="container" style={{ marginTop: '1.2rem' }}>
        <Breadcrumbs />
      </div>
      <div className={styles.main}>
        <div className="container" style={{ marginTop: '3rem' }}>
          <div className={styles.description}>
            Этот курс позволит вам разобраться с языком Golang. Вы узнаете как он работает. Чем
            отличается от других языков программирования. Курс особенно полезен, если вы уже знаете
            какой-то язык, хотя бы на теоритическом уровне. Многие уроки подкреплены примерами. Я
            рекомендую повторять эти примеры. А если вы хотите лучше разобраться с языком, то
            попробовать делать тоже самое, но придумать свой пример для практики. На основании
            полученных знаний.
          </div>
        </div>

        <div className={styles.videozone}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/p2b2Vb-cYCs"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className={styles.links}>
          <p>Чтение данных из файла</p>
          <p>Высчитываем среднее значение</p>
        </div>
        <div className="container" style={{ marginTop: '3rem' }}>
          <Comments />
        </div>
      </div>
    </>
  );
};

export default LessonPage;
