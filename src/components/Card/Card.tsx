import React, { FC } from 'react';
import style from './Card.module.scss';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { ILightCourse } from '../../interfaces/course';

interface CardProps {
  course: ILightCourse;
}

const Card: FC<CardProps> = ({ course }) => {
  return (
    <div className="row">
      <div className="col s12" style={{ padding: 0 }}>
        <div className={cx('card', style.card)}>
          <div className={style.cardBox}>
            <img className={style.img} src={course.img} alt="" />
          </div>
          <div className={style.content}>
            <h2 className={style.title}>{course.title}</h2>
            <p className={style.subTitle}>{course.subTitle}</p>
            <span className={style.author}>{course.authorNames.join(', ')}</span>
            <span className={style.length}>
              {`Всего ${course.fullLength.match(/(?<=ость\s).+/g)}` +
                `, ${course.fullLength.match(/(?<=•\s).+(?=\s•)/g)}`}
            </span>
          </div>
          <div className={cx('card-action', style.cardAction)}>
            <Link to={`/courses/${course.id}`}>Открыть</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
