import React, { FC } from 'react';
import style from './Card.module.scss';
import cx from 'classnames';
import { Link } from 'react-router-dom';

const Card: FC = () => {
  return (
    <div className="row">
      <div className="col s12" style={{ padding: 0 }}>
        <div className={cx('card', style.card)}>
          <div className={style.cardBox}>
            <img
              className={style.img}
              src="https://www.dreamhost.com/blog/wp-content/uploads/2017/10/online_course-750x375.jpg"
              alt=""
            />
          </div>
          <div className={style.content}>
            <h2 className={style.title}>Golang для начинающих. Подробные уроки</h2>
            <p className={style.description}>
              Простыми словами, разберем как работать на языке программирования Go. Его особенности
              и тонкости.
            </p>
            <span className={style.author}>Alex Marshal</span>
            <span className={style.length}>Всего 5,5 ч. 24 уроков</span>
          </div>
          <div className={cx('card-action', style.cardAction)}>
            <Link to="/goland">Открыть</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
