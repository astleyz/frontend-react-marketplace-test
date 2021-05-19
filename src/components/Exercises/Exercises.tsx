import React, { FC, useState } from 'react';
import { Dispatch } from 'redux';
import { useSelector } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import { Container, Typography } from '@material-ui/core';
import { Link, useParams } from 'react-router-dom';
import { IFullCourse } from '../../interfaces/course';
import styles from './Exercises.module.scss';
import { getAuthStatus } from '../../store/selectors';
import Authorization from '../Auth/Authorization';

const Accordion = withStyles({
  root: {
    'border': '1px solid rgba(0, 0, 0, .125)',
    'boxShadow': 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    'backgroundColor': 'rgba(0, 0, 0, .03)',
    'borderBottom': '1px solid rgba(0, 0, 0, .125)',
    'marginBottom': -1,
    'minHeight': 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

type ExercisesProps = Pick<IFullCourse, 'materials'> & { dispatch: Dispatch };

const Exercises: FC<ExercisesProps> = ({ materials, dispatch }) => {
  const { id } = useParams<{ id: string }>();
  const isAuthorized = useSelector(getAuthStatus);

  const [isAuthOpen, setAuthOpen] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(
    `${materials.sections[0].title}0` || ''
  );

  const handleAuthOpen = () => setAuthOpen(true);
  const handleAuthClose = () => setAuthOpen(false);
  const handleChange = (panel: string) => (e: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Container className={styles.container}>
      <h2>{materials.title}</h2>
      <h3>{materials.info}</h3>
      {materials.sections.map((section, sIdx) => (
        <Accordion
          key={`${section.title}${sIdx}`}
          square
          expanded={expanded === `${section.title}${sIdx}`}
          onChange={handleChange(`${section.title}${sIdx}`)}
        >
          <AccordionSummary>
            <Typography># {section.title}</Typography>
          </AccordionSummary>
          <AccordionDetails className={styles.details}>
            {section.lessons.map((lesson, lIdx) => (
              <Typography className={styles.lesson} key={`${lesson.name}${lIdx}`}>
                <span>{`${lIdx + 1}. ${lesson.name}`}</span>
                <span>
                  {isAuthorized ? (
                    <Link to={`/courses/${id}/showtopic?section=${sIdx + 1}&lesson=${lIdx + 1}`}>
                      [ подробнее ]
                    </Link>
                  ) : (
                    <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleAuthOpen}>
                      [ подробнее ]
                    </span>
                  )}
                </span>
                <span>{lesson.length}</span>
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
      <Authorization isOpen={isAuthOpen} onClose={handleAuthClose} dispatch={dispatch} />
    </Container>
  );
};

export default Exercises;
