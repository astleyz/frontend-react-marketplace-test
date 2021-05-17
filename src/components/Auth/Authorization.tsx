import { FC, useState } from 'react';
import { Dialog, Typography, Container, CssBaseline, FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import PersonIcon from '@material-ui/icons/Person';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/vars.module.scss';
import { Form, Field, withFormik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import teal from '@material-ui/core/colors/teal';
import { ILoginProps } from '../../interfaces/auth';
import TealCheckbox from '../../hocs/Checkbox';
import { Dispatch } from 'redux';
import { authorization } from '../../store/actions';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(6),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: styles.mainColor,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  input: {
    paddingLeft: '10px !important',
  },

  submit: {
    'margin': theme.spacing(3, 0, 2),
    'backgroundColor': styles.mainColor,
    '&:hover': {
      backgroundColor: teal['600'],
    },
  },
  selectableLabel: {
    userSelect: 'none',
    color: isChecked => (isChecked ? teal['300'] : ''),
  },
}));

type AuthorizationProps = {
  isOpen: boolean;
  onClose: () => void;
  dispatch: Dispatch;
};

export interface IFormik extends FormikHelpers<ILoginProps> {
  props: AuthorizationProps;
}

const Authorization: FC<AuthorizationProps & FormikProps<ILoginProps>> = props => {
  const { dirty, isValid, isSubmitting, isOpen, onClose, setFieldValue } = props;
  const [isChecked, setChecked] = useState(false);
  const handleCheckbox = () => {
    setChecked(prev => {
      setFieldValue('rememberme', !prev);
      return !prev;
    });
  };
  const classes = useStyles(isChecked);

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Авторизация
          </Typography>
          <Form className={classes.form}>
            <Field
              className={classes.input}
              style={{ boxSizing: 'border-box', margin: '10px 0 0' }}
              placeholder="Email"
              name="email"
              id="email"
              autoFocus
              spellCheck="false"
            />
            <Field
              className={classes.input}
              style={{ boxSizing: 'border-box', margin: '10px 0 20px 0' }}
              placeholder="Пароль"
              name="password"
              id="password"
              type="password"
              spellCheck="false"
            />
            <Grid item xs={12}>
              <FormControlLabel
                name="checkbox"
                checked={isChecked}
                onChange={handleCheckbox}
                classes={{ label: classes.selectableLabel }}
                control={<TealCheckbox />}
                label="Запомнить меня"
              />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting || !(dirty && isValid)}
            >
              Войти
            </Button>
          </Form>
        </div>
        <Box mt={5}></Box>
      </Container>
    </Dialog>
  );
};

const formikHocProps = {
  mapPropsToValues: () => ({
    rememberme: false,
    email: '',
    password: '',
  }),
  validationSchema: () =>
    Yup.object({
      email: Yup.string().email('Введите валидный email').required('Это обязательное поле'),
      password: Yup.string().required('Это обязательное поле'),
    }),
  handleSubmit: (values: ILoginProps, formik: IFormik) => {
    formik.props.dispatch(authorization(values, formik));
  },
};

export default withFormik<AuthorizationProps, ILoginProps>(formikHocProps)(Authorization);
