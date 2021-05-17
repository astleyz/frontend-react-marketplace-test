import { FC, useState } from 'react';
import { Dialog, Typography, Container, CssBaseline, FormControlLabel } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import TealCheckbox from '../../hocs/Checkbox';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import styles from '../../styles/vars.module.scss';
import teal from '@material-ui/core/colors/teal';
import { Form, Field, ErrorMessage, withFormik, FormikProps, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { IRegisterProps as IRegister } from '../../interfaces/auth';
import { Dispatch } from 'redux';
import { registration } from '../../store/actions';

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
    marginTop: theme.spacing(3),
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
  error: {
    color: 'red',
  },
}));

type RegistrationProps = {
  isOpen: boolean;
  onClose: () => void;
  dispatch: Dispatch;
};

export interface IFormik extends FormikHelpers<IRegister> {
  props: RegistrationProps;
}

const Registration: FC<RegistrationProps & FormikProps<IRegister>> = props => {
  const { dirty, isValid, isSubmitting, touched, errors, values, isOpen, onClose } = props;
  const [isChecked, setChecked] = useState(false);
  const handleCheckbox = () => setChecked(prev => !prev);
  const classes = useStyles(isChecked);

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Регистрация
          </Typography>
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  className={classes.input}
                  style={{ boxSizing: 'border-box' }}
                  placeholder="Придумайте логин"
                  name="login"
                  id="login"
                  spellCheck="false"
                />
                {touched['login'] && errors['login'] && values['login'] && (
                  <ErrorMessage name="login" component="div" className={classes.error} />
                )}
              </Grid>
              <Grid item xs={12}>
                <Field
                  className={classes.input}
                  style={{ boxSizing: 'border-box' }}
                  placeholder="Email"
                  name="email"
                  id="email"
                  spellCheck="false"
                />
                {touched['email'] && errors['email'] && values['email'] && (
                  <ErrorMessage name="email" component="div" className={classes.error} />
                )}
              </Grid>
              <Grid item xs={12}>
                <Field
                  className={classes.input}
                  style={{ boxSizing: 'border-box' }}
                  placeholder="Пароль"
                  name="password"
                  id="password"
                  type="password"
                  spellCheck="false"
                />
                {touched['password'] && errors['password'] && values['password'] && (
                  <ErrorMessage name="password" component="div" className={classes.error} />
                )}
              </Grid>
              <Grid item xs={12}>
                <Field
                  className={classes.input}
                  style={{ boxSizing: 'border-box' }}
                  placeholder="Повторите пароль"
                  name="repeatPassword"
                  id="repeatPassword"
                  type="password"
                  spellCheck="false"
                />
                {touched['repeatPassword'] &&
                  errors['repeatPassword'] &&
                  values['repeatPassword'] && (
                    <ErrorMessage name="repeatPassword" component="div" className={classes.error} />
                  )}
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  checked={isChecked}
                  onChange={handleCheckbox}
                  classes={{ label: classes.selectableLabel }}
                  control={<TealCheckbox />}
                  label="Согласиться со всем чем можно"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isSubmitting || !(dirty && isValid && isChecked)}
            >
              Зарегистрироваться
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
    login: '',
    email: '',
    password: '',
    repeatPassword: '',
  }),
  validationSchema: () =>
    Yup.object({
      login: Yup.string().min(3, 'Минимум 3 символа').required('Введите логин'),
      email: Yup.string().email('Введите валидный email').required('Это обязательное поле'),
      password: Yup.string().min(5, 'Минимум 5 символов').required('Это обязательное поле'),
      repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Пароли не совпадают')
        .required(),
    }),
  handleSubmit: (values: IRegister, formik: IFormik) => {
    formik.props.dispatch(registration(values, formik));
  },
};

export default withFormik<RegistrationProps, IRegister>(formikHocProps)(Registration);
