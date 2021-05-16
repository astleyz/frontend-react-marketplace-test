import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

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

const titles = [
  { title: 'Урок #1', description: 'Переменные среды. Редактор кода' },
  { title: 'Урок #2', description: 'Получение данных от пользователя' },
  { title: 'Урок #3', description: 'Преобразование строки в число' },
];

const Exercises = () => {
  const [expanded, setExpanded] = React.useState<string | false>(
    (titles[0] && `${titles[0]}0`) || ''
  );

  const handleChange = (panel: string) => (e: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {titles.map((it, idx) => (
        <Accordion
          key={`${it.title}${idx}`}
          square
          expanded={expanded === `${it.title}${idx}`}
          onChange={handleChange(`${it.title}${idx}`)}
        >
          <AccordionSummary>
            <Typography>{it.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {it.description}
              &nbsp;&nbsp;&nbsp;
              <span>
                <Link to={`/courses/:id/lesson${idx}`}>[подробнее]</Link>
              </span>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default Exercises;
